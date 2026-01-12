import { useTasks, useCompleteTask } from "@/hooks/use-tasks";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, PlayCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TaskFlow() {
  const { data: tasks } = useTasks();
  const [, setLocation] = useLocation();
  const completeTask = useCompleteTask();
  
  const [step, setStep] = useState<"instruction" | "progress">("instruction");
  const [progress, setProgress] = useState(0);

  // Get task from URL params (simulated)
  const params = new URLSearchParams(window.location.search);
  const taskId = Number(params.get("id"));
  const task = tasks?.find(t => t.id === taskId);

  if (!task) return null;

  const startTask = () => {
    setStep("progress");
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          completeTask.mutate(task.id, {
            onSuccess: () => {
              setLocation("/home");
            }
          });
        }, 500);
      }
    }, 1000);
  };

  return (
    <div className="mobile-container min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-50">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/home")}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold text-lg">Task Details</h1>
      </div>

      <div className="p-6">
        {step === "instruction" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center mb-6">
                   <PlayCircle className="text-primary" size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-800 mb-2">{task.title}</h2>
                <div className="px-4 py-1.5 bg-primary/10 rounded-full text-primary font-bold text-sm">
                  Reward: {task.reward} Coins
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <ShieldCheck className="text-green-500" size={18} />
                Instructions
              </h3>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {task.description}
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-gray-500">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                    Click the "Start Task" button below.
                  </li>
                  <li className="flex gap-3 text-sm text-gray-500">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                    Complete the activity as per instructions.
                  </li>
                  <li className="flex gap-3 text-sm text-gray-500">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                    Do not close the app during progress.
                  </li>
                </ul>
              </div>
            </div>

            <Button 
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/25"
              onClick={startTask}
            >
              Start Task
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center pt-12 text-center"
          >
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={502.6}
                  strokeDashoffset={502.6 - (502.6 * progress) / 100}
                  className="text-primary transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-gray-800">{progress}%</span>
              </div>
            </div>

            <h2 className="text-2xl font-black text-gray-800 mb-2">
              {progress < 100 ? "Completing Task..." : "Task Completed!"}
            </h2>
            <p className="text-gray-500">Please wait while we verify your activity.</p>
            
            {progress < 100 && (
              <Loader2 className="animate-spin text-primary mt-8" size={32} />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
