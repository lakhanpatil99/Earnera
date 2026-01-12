import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Simple session simulation
  // In a real app, use express-session or JWT
  // Here we'll just trust the client to send user ID for simplicity in this demo,
  // or store it in a simple map. For now, let's just assume single user or use headers if we were strict.
  // BUT, to keep it simple for the "no backend" feel, we will implement standard routes
  // and maybe use a simple session cookie if needed, OR just return the user object and frontend stores ID.

  // NOTE: For this "dummy" app, we will use a simple in-memory session map
  const sessions = new Map<string, number>(); // sessionId -> userId

  app.post(api.auth.login.path, async (req, res) => {
    const { email, password } = req.body;
    const user = await storage.getUserByEmail(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Create "session"
    req.session.userId = user.id; // Using the express-session from boilerplate
    res.json(user);
  });

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      
      const existing = await storage.getUserByEmail(input.email);
      if (existing) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const user = await storage.createUser(input);
      req.session.userId = user.id;
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    if (!req.session.userId) return res.status(401).send();
    const user = await storage.getUser(req.session.userId);
    if (!user) return res.status(401).send();
    res.json(user);
  });

  // Tasks
  app.get(api.tasks.list.path, async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post(api.tasks.complete.path, async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });
    
    const taskId = Number(req.params.id);
    const task = await storage.getTask(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Update balance
    const user = await storage.updateUserCoins(req.session.userId, task.reward);
    
    // Log transaction
    await storage.createTransaction({
      userId: user.id,
      amount: task.reward,
      type: 'earn',
      description: `Completed: ${task.title}`,
      date: new Date().toISOString()
    });

    res.json({ 
      newBalance: user.coins, 
      message: `Earned ${task.reward} coins!` 
    });
  });

  // Wallet
  app.get(api.wallet.get.path, async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });
    
    const user = await storage.getUser(req.session.userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    
    const transactions = await storage.getTransactions(req.session.userId);
    res.json({ balance: user.coins, transactions });
  });

  app.post(api.wallet.withdraw.path, async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });
    
    const { amount } = req.body;
    const user = await storage.getUser(req.session.userId);
    
    if (!user || user.coins < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const updatedUser = await storage.updateUserCoins(req.session.userId, -amount);
    
    await storage.createTransaction({
      userId: user.id,
      amount: -amount,
      type: 'withdraw',
      description: `Withdrew ${amount} coins`,
      date: new Date().toISOString()
    });

    res.json({ 
      newBalance: updatedUser.coins, 
      message: "Withdrawal successful!" 
    });
  });

  // Seed Data
  if ((await storage.getTasks()).length === 0) {
    await storage.createTask({
      title: "Daily Check-in",
      description: "Login daily to claim your reward",
      reward: 50,
      type: "daily",
      icon: "calendar"
    });
    await storage.createTask({
      title: "Watch Video Ad",
      description: "Watch a short video to earn coins",
      reward: 20,
      type: "ad",
      icon: "video"
    });
    await storage.createTask({
      title: "Complete Survey",
      description: "Take a 5-minute survey about tech",
      reward: 150,
      type: "survey",
      icon: "clipboard"
    });
    await storage.createTask({
      title: "Install 'GameZone'",
      description: "Download and play for 2 minutes",
      reward: 300,
      type: "app",
      icon: "gamepad"
    });
    await storage.createTask({
      title: "Invite Friend",
      description: "Get coins when your friend joins",
      reward: 500,
      type: "invite",
      icon: "users"
    });
  }

  return httpServer;
}
