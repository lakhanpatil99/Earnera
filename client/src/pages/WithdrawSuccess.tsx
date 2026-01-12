import { motion } from "framer-motion";
import { Check, ArrowLeft, Share2, Download, Copy, ExternalLink } from "lucide-react";
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
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffffff", "#34d399", "#2dd4bf"]
    });
  }, []);

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center p-6 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <header className="w-full flex justify-between items-center z-10 mb-12">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 text-white border border-white/20"
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

      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl relative z-10"
      >
        <Check size={48} className="text-emerald-600 stroke-[4px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center z-10"
      >
        <h1 className="text-4xl font-black mb-2 tracking-tighter">₹{(Number(amount) / 100).toFixed(2)}</h1>
        <p className="text-emerald-50 font-black text-lg uppercase tracking-widest mb-1">Sent Successfully</p>
        <p className="text-white/70 text-xs font-bold px-8">Money has been sent to your UPI ID</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full mt-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 space-y-6 z-10 shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">UPI ID</p>
            <p className="font-black text-sm">{upiId}</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Copy size={16} />
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Transaction ID</p>
            <p className="font-black text-sm font-mono">{txId}</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <ExternalLink size={16} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-auto w-full z-10"
      >
        <Button 
          onClick={() => setLocation("/wallet")}
          className="w-full h-16 rounded-2xl bg-white text-emerald-600 hover:bg-emerald-50 text-lg font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all mb-4"
        >
          Back to Wallet
        </Button>
        <p className="text-center text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Payment secured by Earnera</p>
      </motion.div>
    </div>
  );
}
