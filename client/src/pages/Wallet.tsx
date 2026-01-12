import { useWallet, useWithdraw } from "@/hooks/use-wallet";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon, History, Loader2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Wallet() {
  const { data: walletData, isLoading } = useWallet();
  const withdraw = useWithdraw();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    if (!amount || isNaN(Number(amount))) return;
    withdraw.mutate(Number(amount), {
      onSuccess: () => {
        setWithdrawOpen(false);
        setAmount("");
      }
    });
  };

  const rupeeValue = walletData ? (walletData.balance / 100).toFixed(2) : "0.00";

  return (
    <div className="mobile-container bg-neutral-50 pb-24 min-h-screen">
      <div className="px-6 pt-12 pb-6 bg-white rounded-b-[32px] shadow-sm border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
          <WalletIcon className="text-primary fill-primary/20" />
          My Wallet
        </h1>

        <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl shadow-gray-200">
           {/* Card Design Elements */}
           <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/4" />

           <div className="relative z-10">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Balance</p>
                 <div className="flex items-baseline gap-1">
                   <h2 className="text-4xl font-mono font-bold tracking-tight">{walletData?.balance ?? 0}</h2>
                   <span className="text-sm font-medium text-gray-400">Coins</span>
                 </div>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                 <span className="text-sm font-bold">₹{rupeeValue}</span>
               </div>
             </div>

             <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
               <DialogTrigger asChild>
                 <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-gray-50">
                   Withdraw Funds <ArrowUpRight size={16} />
                 </button>
               </DialogTrigger>
               <DialogContent className="max-w-[320px] rounded-3xl">
                 <DialogHeader>
                   <DialogTitle>Withdraw Coins</DialogTitle>
                 </DialogHeader>
                 <div className="space-y-4 py-4">
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-800 text-xs font-medium">
                      Exchange Rate: 100 Coins = ₹1.00
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1.5 block">Amount (Coins)</label>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="Min: 100"
                      />
                    </div>
                    <button 
                      onClick={handleWithdraw}
                      disabled={withdraw.isPending || !amount}
                      className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/25 disabled:opacity-50 disabled:shadow-none"
                    >
                      {withdraw.isPending ? "Processing..." : "Confirm Withdrawal"}
                    </button>
                 </div>
               </DialogContent>
             </Dialog>
           </div>
        </div>
      </div>

      <div className="px-6 mt-8">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <History size={18} className="text-gray-400" />
          Recent Transactions
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
                    tx.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {tx.type === 'earn' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{tx.description}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${
                  tx.type === 'earn' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                </span>
              </motion.div>
            ))}
            {!walletData?.transactions.length && (
              <p className="text-center text-gray-400 text-sm py-4">No transactions yet.</p>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
