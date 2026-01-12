import { useAuth } from "@/hooks/use-auth";
import { useTasks } from "@/hooks/use-tasks";
import { BottomNav } from "@/components/BottomNav";
import { TaskCard } from "@/components/TaskCard";
import { motion } from "framer-motion";
import { Bell, Coins, Loader2, Info, Share2, Gift, PlayCircle, Calendar, Users, ClipboardList, ShieldCheck, Heart, Headphones } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

export default function Home() {
  const { user } = useAuth();
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: wallet } = useWallet();

  const banners = [
    { text: "Earn up to ₹500 per day!", color: "from-blue-600 to-indigo-600" },
    { text: "Invite friends & get bonus!", color: "from-purple-600 to-pink-600" },
    { text: "New high-reward tasks added!", color: "from-emerald-600 to-teal-600" }
  ];

  return (
    <div className="mobile-container bg-neutral-50 pb-24 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-6 rounded-b-[32px] shadow-sm border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
              <Coins size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-gray-900">Earnera</span>
          </div>
          <button className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-xs font-bold text-gray-600 border border-gray-100 active:scale-95 transition-all">
            <Share2 size={14} />
            Share App
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white shadow-sm overflow-hidden" />
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Welcome back,</p>
              <h1 className="text-xl font-black text-gray-800 leading-tight">{user?.name}</h1>
            </div>
          </div>
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 text-gray-600 hover:bg-gray-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-6 shadow-xl shadow-primary/25 text-white relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10">
            <p className="text-primary-foreground/80 font-medium text-sm mb-1">Total Balance</p>
            <div className="flex items-baseline gap-1">
              <h2 className="text-4xl font-extrabold tracking-tight">
                {wallet?.balance ?? 0}
              </h2>
              <span className="font-bold text-lg opacity-80">Coins</span>
            </div>
            
            <div className="mt-4 flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
              <Coins size={14} className="text-yellow-300 fill-yellow-300" />
              <span className="text-xs font-semibold">100 Coins = ₹1.00</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Banners */}
      <div className="mt-6 flex gap-4 overflow-x-auto px-6 no-scrollbar pb-2">
        {banners.map((banner, i) => (
          <div 
            key={i} 
            className={`min-w-[280px] p-4 rounded-2xl bg-gradient-to-r ${banner.color} text-white shadow-lg flex items-center justify-between overflow-hidden relative shrink-0`}
          >
             <div className="absolute right-0 top-0 opacity-10 -translate-y-1/4 translate-x-1/4">
               <Gift size={80} />
             </div>
             <p className="font-black text-sm relative z-10">{banner.text}</p>
             <button className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black relative z-10">CLAIM</button>
          </div>
        ))}
      </div>

      {/* Trusted Platform Badges */}
      <div className="px-6 mt-8">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center justify-around shadow-sm">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Heart size={20} />
            </div>
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">10K+ Users</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">24/7 Help</span>
          </div>
        </div>
      </div>

      {/* How to Earn */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
          <Info size={20} className="text-primary" />
          How to Earn?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Watch Ads", icon: PlayCircle, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Daily Bonus", icon: Calendar, color: "text-orange-500", bg: "bg-orange-50" },
            { label: "Invite Friends", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
            { label: "Complete Tasks", icon: ClipboardList, color: "text-emerald-500", bg: "bg-emerald-50" }
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-2xl ${item.bg} border border-white flex flex-col items-center text-center gap-2 shadow-sm`}>
               <item.icon size={24} className={item.color} />
               <span className="text-[10px] font-black text-gray-700 uppercase tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black text-gray-800">Available Tasks</h2>
          <span className="text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {tasks?.length || 0} Open
          </span>
        </div>

        {tasksLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
            <Loader2 className="animate-spin text-primary" size={32} />
            <p className="text-sm">Loading opportunities...</p>
          </div>
        ) : (
          <div className="space-y-1">
            {tasks?.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            
            {!tasks?.length && (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No tasks available right now.</p>
                <p className="text-xs text-gray-300 mt-1">Check back later!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
