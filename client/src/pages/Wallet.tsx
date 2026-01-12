import { useWallet, useWithdraw } from "@/hooks/use-wallet";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon, History, Loader2, Gift, Share2, Copy, Send, Users } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

export default function Wallet() {
  const { data: walletData, isLoading } = useWallet();
  const withdraw = useWithdraw();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState([100]);
  const [upiId, setUpiId] = useState("");

  const handleWithdraw = () => {
    if (withdrawAmount[0] < 100) return;
    withdraw.mutate(withdrawAmount[0], {
      onSuccess: () => {
        setWithdrawOpen(false);
        setWithdrawAmount([100]);
        setUpiId("");
      }
    });
  };

  const withdrawHistory = [
    { id: 1, date: "2024-05-20", amount: 500, status: "Success", upi: "user@upi" },
    { id: 2, date: "2024-05-18", amount: 200, status: "Pending", upi: "user@upi" },
    { id: 3, date: "2024-05-15", amount: 1000, status: "Success", upi: "user@upi" },
  ];

  const rupeeValue = walletData ? (walletData.balance / 100).toFixed(2) : "0.00";
  const selectedRupee = (withdrawAmount[0] / 100).toFixed(2);

  return (
    <div className="mobile-container bg-neutral-50 pb-24 min-h-screen">
      <div className="px-6 pt-12 pb-6 bg-white rounded-b-[32px] shadow-sm border-b border-gray-100">
        <h1 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
          <WalletIcon className="text-primary fill-primary/20" />
          My Wallet
        </h1>

        <div className="bg-neutral-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl shadow-gray-200">
           {/* Card Design Elements */}
           <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/4" />

           <div className="relative z-10">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Available Balance</p>
                 <div className="flex items-baseline gap-1">
                   <h2 className="text-4xl font-black tracking-tight">{walletData?.balance ?? 0}</h2>
                   <span className="text-xs font-bold text-gray-400">Coins</span>
                 </div>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                 <span className="text-lg font-black tracking-tight">₹{rupeeValue}</span>
               </div>
             </div>

             <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
               <DialogTrigger asChild>
                 <button className="w-full bg-white text-neutral-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-gray-50">
                   Withdraw Funds <ArrowUpRight size={16} />
                 </button>
               </DialogTrigger>
               <DialogContent className="max-w-[320px] rounded-[32px] border-none shadow-2xl">
                 <DialogHeader>
                   <DialogTitle className="text-center font-black text-xl">Withdraw Earnings</DialogTitle>
                 </DialogHeader>
                 <div className="space-y-6 py-4">
                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-emerald-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider">Estimated Value</span>
                        <span className="text-lg font-black">₹{selectedRupee}</span>
                      </div>
                      <p className="text-[10px] opacity-80">100 Coins = ₹1.00</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-gray-400">
                        <span>Select Coins</span>
                        <span className="text-primary">{withdrawAmount[0]} Coins</span>
                      </div>
                      <Slider
                        value={withdrawAmount}
                        onValueChange={setWithdrawAmount}
                        max={walletData?.balance || 1000}
                        min={100}
                        step={50}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">UPI ID</label>
                      <input 
                        type="text" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none text-sm font-bold placeholder:text-gray-300"
                        placeholder="yourname@upi"
                      />
                    </div>

                    <button 
                      onClick={handleWithdraw}
                      disabled={withdraw.isPending || withdrawAmount[0] > (walletData?.balance || 0)}
                      className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50 active:scale-95 transition-all"
                    >
                      {withdraw.isPending ? "Processing..." : "Confirm & Withdraw"}
                    </button>
                 </div>
               </DialogContent>
             </Dialog>
           </div>
        </div>
      </div>

      {/* Invite & Earn */}
      <div className="px-6 mt-8">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
          <div className="absolute top-0 right-0 p-4 opacity-10 -translate-y-1/4 translate-x-1/4">
            <Users size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="font-black text-lg mb-1">Invite & Earn</h3>
            <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-wider mb-6">Earn 50 coins per friend</p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between mb-4">
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-indigo-200 mb-1">Referral Code</p>
                <p className="text-lg font-black tracking-widest">EARN50X</p>
              </div>
              <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                <Copy size={18} />
              </button>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-white text-indigo-700 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <Send size={14} /> WhatsApp
              </button>
              <button className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-10">
        <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
          <ArrowUpRight size={18} className="text-gray-400" />
          Withdrawal History
        </h3>
        <div className="space-y-3">
          {withdrawHistory.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <ArrowUpRight size={18} />
                </div>
                <div>
                  <p className="font-black text-sm text-gray-800 leading-none mb-1">Withdraw to UPI</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-base text-gray-800">₹{(item.amount / 100).toFixed(2)}</p>
                <span className={`text-[8px] font-black uppercase tracking-widest ${
                  item.status === 'Success' ? 'text-emerald-500' : 'text-yellow-500'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-10">
        <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
          <History size={18} className="text-gray-400" />
          Recent Activity
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gray-300" /></div>
        ) : (
          <div className="space-y-3">
            {walletData?.transactions.map((tx, i) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'earn' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {tx.type === 'earn' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="font-black text-sm text-gray-800 leading-none mb-1">{tx.description}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`font-black text-base ${
                  tx.type === 'earn' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {tx.type === 'earn' ? '+' : '-'}{Math.abs(tx.amount)}
                </span>
              </motion.div>
            ))}
            {!walletData?.transactions.length && (
              <div className="text-center py-10 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
                <p className="text-gray-300 font-black text-xs uppercase tracking-widest">No Activity Yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
