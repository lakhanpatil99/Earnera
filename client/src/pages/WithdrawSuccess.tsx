import { motion } from "framer-motion";
import { Check, ArrowLeft, Share2, Download, Copy, ExternalLink, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function WithdrawSuccess() {
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const amount = params.get("amount") || "0";
  const upiId = params.get("upi") || "user@upi";
  const txId = "EARN" + Math.random().toString(36).substring(2, 10).toUpperCase();

  useEffect(() => {
    // Initial burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffffff", "#34d399", "#2dd4bf", "#fbbf24"]
    });

    // Secondary burst for premium feel
    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#34d399", "#2dd4bf"]
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#34d399", "#2dd4bf"]
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center p-6 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full blur-2xl" />
      </div>

      <header className="w-full flex justify-between items-center z-10 mb-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20"
          onClick={() => setLocation("/wallet")}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-white border border-white/20">
            <Share2 size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-white border border-white/20">
            <Download size={18} />
          </Button>
        </div>
      </header>

      {/* Main Success Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            <Check size={56} className="text-emerald-600 stroke-[4px]" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -inset-4 bg-white/20 rounded-full blur-xl -z-10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-yellow-300 fill-yellow-300" size={20} />
            <h1 className="text-5xl font-black tracking-tighter">₹{(Number(amount) / 100).toFixed(2)}</h1>
            <Sparkles className="text-yellow-300 fill-yellow-300" size={20} />
          </div>
          <p className="text-emerald-50 font-black text-xl uppercase tracking-widest mb-1">Sent Successfully</p>
          <p className="text-white/70 text-xs font-bold">Money has been sent to your UPI ID</p>
        </motion.div>

        {/* Transaction Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 space-y-6 shadow-2xl"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">UPI ID</p>
              <p className="font-black text-sm">{upiId}</p>
            </div>
            <Button variant="ghost" size="icon" className="w-10 h-10 bg-white/10 rounded-xl hover:bg-white/20">
              <Copy size={16} />
            </Button>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Transaction ID</p>
              <p className="font-black text-sm font-mono">{txId}</p>
            </div>
            <Button variant="ghost" size="icon" className="w-10 h-10 bg-white/10 rounded-xl hover:bg-white/20">
              <ExternalLink size={16} />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full z-10 pt-8"
      >
        <Button 
          onClick={() => setLocation("/wallet")}
          className="w-full h-16 rounded-2xl bg-white text-emerald-600 hover:bg-emerald-50 text-lg font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all mb-4"
        >
          Back to Wallet
        </Button>
        <p className="text-center text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Payment secured by Earnera</p>
      </motion.div>
      
      {/* Coin flying animation elements (simulated with CSS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%", x: `${Math.random() * 100}%`, rotate: 0 }}
            animate={{ y: "-10%", rotate: 360 }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-[8px] font-black text-yellow-800 shadow-md opacity-20"
          >
            ₹
          </motion.div>
        ))}
      </div>
    </div>
  );
}
