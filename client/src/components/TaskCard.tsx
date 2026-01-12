import { Task } from "@shared/schema";
import { motion } from "framer-motion";
import { Play, Coins } from "lucide-react";
import { useLocation } from "wouter";

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const [, setLocation] = useLocation();

  const handleStart = () => {
    setLocation(`/task?id=${task.id}`);
  };

  const IconWrapper = ({ type }: { type: string }) => {
    const bgColors: Record<string, string> = {
      'ad': 'bg-blue-100 text-blue-600',
      'app': 'bg-purple-100 text-purple-600',
      'survey': 'bg-green-100 text-green-600',
      'daily': 'bg-orange-100 text-orange-600'
    };

    const colorClass = bgColors[type] || 'bg-gray-100 text-gray-600';

    return (
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} shadow-sm`}>
        {/* In a real app we'd map type to specific icons */}
        <span className="text-xl font-bold">{type[0].toUpperCase()}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <IconWrapper type={task.type} />
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-base mb-1">{task.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
            <Coins size={14} className="text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-700 text-xs">+{task.reward}</span>
          </div>

          <button
            onClick={handleStart}
            className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            Start <Play size={10} className="fill-current" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
