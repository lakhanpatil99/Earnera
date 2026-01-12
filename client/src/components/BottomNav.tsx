import { Link, useLocation } from "wouter";
import { Home, Wallet, User } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Wallet", path: "/wallet", icon: Wallet },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50">
      <div className="flex justify-around items-center px-2 py-3">
        {tabs.map((tab) => {
          const isActive = location === tab.path;
          const Icon = tab.icon;
          
          return (
            <Link key={tab.name} href={tab.path}>
              <button className="relative flex flex-col items-center justify-center p-2 w-full transition-colors duration-200">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 w-12 h-1 bg-primary rounded-b-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <Icon 
                  size={24} 
                  className={`mb-1 transition-all duration-200 ${
                    isActive ? "text-primary stroke-[2.5px]" : "text-gray-400 stroke-2"
                  }`} 
                />
                
                <span className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-gray-400"
                }`}>
                  {tab.name}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for newer iPhones */}
      <div className="h-4 w-full bg-white/95 backdrop-blur-lg" />
    </div>
  );
}
