import { useAuth } from "@/hooks/use-auth";
import { useTasks } from "@/hooks/use-tasks";
import { BottomNav } from "@/components/BottomNav";
import { TaskCard } from "@/components/TaskCard";
import { motion } from "framer-motion";
import { Bell, Coins, Loader2 } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

export default function Home() {
  const { user } = useAuth();
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: wallet } = useWallet();

  return (
    <div className="mobile-container bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[32px] shadow-sm border-b border-gray-100 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm font-medium">Welcome back,</p>
            <h1 className="text-2xl font-extrabold text-gray-800">{user?.name}</h1>
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

      {/* Task List */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Available Tasks</h2>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
            {tasks?.length || 0} Tasks
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
