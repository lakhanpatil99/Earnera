import { useAuth } from "@/hooks/use-auth";
import { BottomNav } from "@/components/BottomNav";
import { LogOut, User, Shield, HelpCircle, ChevronRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const menuItems = [
    { icon: Shield, label: "Privacy Policy", color: "text-blue-500 bg-blue-50" },
    { icon: HelpCircle, label: "Help & Support", color: "text-purple-500 bg-purple-50" },
    { icon: Mail, label: "Contact Us", color: "text-orange-500 bg-orange-50" },
  ];

  return (
    <div className="mobile-container bg-neutral-50 pb-24">
      <div className="px-6 pt-12 pb-8 bg-white shadow-sm border-b border-gray-100 rounded-b-[32px]">
        <h1 className="text-2xl font-black text-gray-800 mb-8">Profile</h1>
        
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-gradient-to-tr from-primary to-emerald-300 rounded-full p-1 shadow-lg shadow-primary/20">
             <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
               <User size={32} className="text-gray-300" />
             </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500 font-medium">{user?.email}</p>
            <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wide border border-emerald-100">
              Verified User
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-6">
        <section>
          <div className="bg-neutral-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-gray-200 mb-6">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield size={64} />
            </div>
            <div className="relative z-10">
              <h3 className="font-black text-lg mb-1">Account Verification</h3>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4">KYC Status: Not Verified</p>
              <button 
                onClick={() => setLocation("/kyc")}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
              >
                Verify KYC Now
              </button>
              <p className="text-white/40 text-[8px] font-bold uppercase tracking-tighter mt-3 text-center">Verify to unlock instant withdrawals</p>
            </div>
          </div>

          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Settings</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <button 
                  key={i}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              );
            })}
          </div>
        </section>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => logout.mutate()}
          className="w-full bg-white border-2 border-red-50 text-red-500 font-bold py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Log Out
        </motion.button>
        
        <p className="text-center text-[10px] text-gray-300 font-mono mt-8">
          Version 1.0.0 • Build 2405
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
