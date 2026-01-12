import { motion } from "framer-motion";
import { ArrowLeft, Camera, ShieldCheck, Upload, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function KYC() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"upload" | "pending">("upload");
  const [files, setFiles] = useState<{ id?: boolean; selfie?: boolean }>({});

  const handleSubmit = () => {
    if (files.id && files.selfie) {
      setStep("pending");
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-neutral-950 p-6">
      <header className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10"
          onClick={() => setLocation("/profile")}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-black text-lg text-white uppercase tracking-widest">Verify KYC</h1>
      </header>

      {step === "upload" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 text-center">
            <ShieldCheck className="mx-auto text-emerald-400 mb-4" size={48} />
            <h2 className="text-xl font-black text-white mb-2">Identity Verification</h2>
            <p className="text-white/60 text-xs">Verify your identity to unlock premium features and instant withdrawals.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => setFiles(prev => ({ ...prev, id: true }))}
              className={`w-full p-6 rounded-[32px] border-2 border-dashed flex flex-col items-center gap-3 transition-all ${
                files.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5'
              }`}
            >
              {files.id ? <CheckCircle2 className="text-emerald-500" /> : <Upload className="text-white/40" />}
              <span className="text-white font-bold text-sm">Upload Government ID</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">Aadhar / PAN / Voter ID</span>
            </button>

            <button 
              onClick={() => setFiles(prev => ({ ...prev, selfie: true }))}
              className={`w-full p-6 rounded-[32px] border-2 border-dashed flex flex-col items-center gap-3 transition-all ${
                files.selfie ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5'
              }`}
            >
              {files.selfie ? <CheckCircle2 className="text-emerald-500" /> : <Camera className="text-white/40" />}
              <span className="text-white font-bold text-sm">Take a Selfie</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">Ensure face is clearly visible</span>
            </button>
          </div>

          <Button 
            disabled={!files.id || !files.selfie}
            onClick={handleSubmit}
            className="w-full h-16 rounded-2xl text-lg font-black bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
          >
            SUBMIT VERIFICATION
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center pt-20 text-center"
        >
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <ShieldCheck size={48} className="text-yellow-500" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Verification Pending</h2>
          <p className="text-white/60 text-sm mb-12">Our team is reviewing your documents. This usually takes 24-48 hours.</p>
          <Button 
            onClick={() => setLocation("/profile")}
            className="w-48 h-14 rounded-2xl font-black bg-white text-black"
          >
            BACK TO PROFILE
          </Button>
        </motion.div>
      )}
    </div>
  );
}
