import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InsertUser } from "@shared/schema";
import { Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema for Login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for Register
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = (data: z.infer<typeof loginSchema>) => {
    login.mutate(data, {
      onError: (err) => {
        toast({
          title: "Login Failed",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  const onRegister = (data: z.infer<typeof registerSchema>) => {
    register.mutate(data, {
      onError: (err) => {
        toast({
          title: "Registration Failed",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mobile-container bg-neutral-50 flex flex-col">
      {/* Header with decorative curve */}
      <div className="h-[35vh] bg-primary relative rounded-b-[40px] overflow-hidden shrink-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        
        <div className="h-full flex flex-col justify-center px-8 relative z-10 text-white pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold mb-2">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h1>
            <p className="text-primary-foreground/80 font-medium">
              {isLogin 
                ? "Sign in to continue earning" 
                : "Join us and start earning rewards today"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-12 relative z-20 pb-8 overflow-y-auto">
        <motion.div 
          className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-5"
              >
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    {...loginForm.register("email")}
                    type="email"
                    className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-gray-800 placeholder:text-gray-400"
                    placeholder="hello@example.com"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
                  <input
                    {...loginForm.register("password")}
                    type="password"
                    className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-gray-800 placeholder:text-gray-400"
                    placeholder="••••••••"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={login.isPending}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-primary/90"
                  >
                    {login.isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
                    {!login.isPending && <ArrowRight size={18} />}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={registerForm.handleSubmit(onRegister)}
                className="space-y-5"
              >
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
                  <input
                    {...registerForm.register("name")}
                    type="text"
                    className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-gray-800 placeholder:text-gray-400"
                    placeholder="John Doe"
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    {...registerForm.register("email")}
                    type="email"
                    className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-gray-800 placeholder:text-gray-400"
                    placeholder="hello@example.com"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
                  <input
                    {...registerForm.register("password")}
                    type="password"
                    className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-gray-800 placeholder:text-gray-400"
                    placeholder="••••••••"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={register.isPending}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-primary/90"
                  >
                    {register.isPending ? <Loader2 className="animate-spin" /> : "Create Account"}
                    {!register.isPending && <ArrowRight size={18} />}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-500 text-sm font-medium hover:text-primary transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
