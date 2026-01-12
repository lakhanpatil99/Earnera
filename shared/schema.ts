import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  coins: integer("coins").default(0).notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  reward: integer("reward").notNull(),
  type: text("type").notNull(), // 'ad', 'app', 'survey', 'daily'
  icon: text("icon").notNull(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // 'earn', 'withdraw'
  description: text("description").notNull(),
  date: text("date").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, coins: true });
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true });

export type User = typeof users.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type LoginRequest = { email: string; password: string };
