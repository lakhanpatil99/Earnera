import { motion } from "framer-motion";
import { PlayCircle, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCompleteTask } from "@/hooks/use-tasks";

export default function FakeAd() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const completeTask = useCompleteTask();

  const params = new URLSearchParams(window.location.search);
  const taskId = Number(params.get("id"));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            completeTask.mutate(taskId, {
              onSuccess: () => setLocation("/home")
            });
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <div className="mobile-container min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Fake Video Frame */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="text-white/20"
        >
          <PlayCircle size={120} />
        </motion.div>
        
        <div className="absolute bottom-10 left-0 w-full px-8 z-20">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-white font-black text-xl tracking-tight">Watching Ad...</h2>
              <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Reward processing</p>
            </div>
            <span className="text-emerald-400 font-black text-2xl">{Math.ceil((100 - progress) / 10)}s</span>
          </div>
          
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {progress === 100 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
            <Sparkles size={48} className="text-white fill-current" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Ad Completed!</h2>
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xl mb-8">
            <Loader2 className="animate-spin" size={20} />
            Syncing Coins...
          </div>
        </motion.div>
      )}
    </div>
  );
}
