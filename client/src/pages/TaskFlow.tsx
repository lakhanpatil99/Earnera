import { useTasks, useCompleteTask } from "@/hooks/use-tasks";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PlayCircle, Sparkles, TrendingUp, Zap, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function TaskFlow() {
  const { data: tasks } = useTasks();
  const [, setLocation] = useLocation();
  const completeTask = useCompleteTask();
  
  const [step, setStep] = useState<"instruction" | "progress" | "completed">("instruction");
  const [progress, setProgress] = useState(0);

  // Get task from URL params (simulated)
  const params = new URLSearchParams(window.location.search);
  const taskId = Number(params.get("id"));
  const task = tasks?.find(t => t.id === taskId);

  useEffect(() => {
    if (step === "progress") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep("completed");
              confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#34d399", "#fbbf24", "#3b82f6"]
              });
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!task) return null;

  const handleComplete = () => {
    completeTask.mutate(task.id, {
      onSuccess: () => {
        setLocation("/home");
      }
    });
  };

  const startTask = () => {
    if (task.description.toLowerCase().includes("video") || task.description.toLowerCase().includes("ad")) {
      setLocation(`/ad?id=${task.id}`);
    } else {
      setStep("progress");
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-neutral-950 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {step === "instruction" && (
          <motion.div
            key="instruction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col min-h-screen p-6 relative z-10"
          >
            {/* Animated background highlights */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            </div>

            <header className="flex items-center gap-4 mb-8">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10"
                onClick={() => setLocation("/home")}
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="font-bold text-lg text-white">Earn Rewards</h1>
            </header>

            <div className="flex-1 flex flex-col justify-center">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="text-emerald-400 animate-pulse" size={24} />
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-400 p-[2px] mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                  >
                    <div className="w-full h-full bg-neutral-900 rounded-[22px] flex items-center justify-center">
                      <Zap className="text-emerald-400 fill-emerald-400" size={40} />
                    </div>
                  </motion.div>

                  <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
                    {task.title}
                  </h2>
                  
                  <div className="flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 px-4 py-2 rounded-2xl">
                    <TrendingUp size={16} className="text-emerald-400" />
                    <span className="font-black text-emerald-400 text-lg">
                      +{task.reward} <span className="text-sm font-bold uppercase tracking-widest ml-1">Coins</span>
                    </span>
                  </div>
                </div>

                <div className="mt-10 space-y-4 text-left">
                  <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-4">Instructions</h3>
                  <div className="space-y-3">
                    {[
                      "Click the start earning button below",
                      "Complete the assigned task fully",
                      "Keep the app open during progress",
                      "Collect your rewards instantly"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black">
                          {i + 1}
                        </div>
                        <p className="text-white/80 text-sm font-medium">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={startTask}
                className="w-full h-16 rounded-2xl text-xl font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] border-none"
              >
                <PlayCircle className="mr-2 fill-current" />
                START EARNING
              </Button>
            </div>
          </motion.div>
        )}

        {step === "progress" && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-blue-500/30 rounded-full blur-[120px]" />
              <div className="absolute bottom-[20%] left-[-10%] w-80 h-80 bg-purple-500/30 rounded-full blur-[120px]" />
            </div>

            <div className="relative w-64 h-64 mb-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray={691}
                  initial={{ strokeDashoffset: 691 }}
                  animate={{ strokeDashoffset: 691 - (691 * progress) / 100 }}
                  className="drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] mb-2"
                >
                  <Sparkles className="text-yellow-900" size={32} />
                </motion.div>
                <span className="text-4xl font-black text-white tracking-tighter">{progress}%</span>
              </div>
            </div>

            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
              Completing your task...
            </h2>
          </motion.div>
        )}

        {step === "completed" && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
          >
             <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(16,185,129,0.5)]"
            >
              <CheckCircle2 size={64} className="text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-5xl font-black text-white mb-2 tracking-tighter">
                Coins Added!
              </h2>
              <div className="flex items-center justify-center gap-3 text-emerald-400 text-3xl font-black mb-12">
                <Sparkles size={32} fill="currentColor" />
                +{task.reward}
              </div>

              <Button 
                onClick={handleComplete}
                className="w-64 h-16 rounded-3xl text-xl font-black bg-white text-neutral-900 hover:bg-neutral-100 shadow-2xl active:scale-95 transition-all"
              >
                CLAIM REWARD
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
