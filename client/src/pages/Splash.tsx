import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="mobile-container flex flex-col items-center justify-center bg-gradient-to-br from-primary via-emerald-600 to-teal-800 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10"
      >
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6 mx-auto rotate-3">
          <Coins size={48} className="text-primary" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-center tracking-tight mb-2">
          Earnera
        </h1>
        <p className="text-white/80 text-center font-medium">
          Earn Real Rewards
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12"
      >
        <div className="flex gap-2">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            className="w-2 h-2 bg-white rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="w-2 h-2 bg-white rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            className="w-2 h-2 bg-white rounded-full" 
          />
        </div>
      </motion.div>
    </div>
  );
}
