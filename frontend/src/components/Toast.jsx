import React, { useEffect } from 'react';
import { LuCircleCheck, LuX } from "react-icons/lu";

const Toast = ({ message, isOpen, onClose, type = "success" }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-10 right-10 z-200 animate-in slide-in-from-right-10 duration-500">
      <div className="relative overflow-hidden flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Animated Success Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-transparent opacity-50" />
        
        <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/20 relative z-10">
          <LuCircleCheck className="text-green-400" size={20} />
        </div>
        
        <div className="relative z-10">
          <p className="text-white font-bold text-sm tracking-tight">{message}</p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Redirecting you...</p>
        </div>

        <button 
          onClick={onClose}
          className="ml-4 text-white/20 hover:text-white transition-colors relative z-10"
        >
          <LuX size={16} />
        </button>

        {/* Progress Bar Timer */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-green-500/40 animate-[progress_4s_linear]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />
    </div>
  );
};

export default Toast;