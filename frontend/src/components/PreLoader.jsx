import { LuBotMessageSquare } from "react-icons/lu";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#0a0a0c] overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Glass Icon Container */}
        <div className="relative p-12 rounded-[2.5rem] bg-white/3 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
          
          {/* Inner Glow Effect */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-pink-500/10 to-orange-500/10" />
          
          {/* The Icon */}
          <LuBotMessageSquare 
            size={80} 
            className="text-white drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] relative z-10 animate-pulse" 
          />
        </div>

        {/* Loading Text / Brand */}
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-white mb-4">
            Varta
          </h2>
          <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6">
            Loading...
          </p>
          
          {/* Minimalist Progress Bar */}
          <div className="w-48 h-[3px] bg-white/5 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 animate-[loading_2s_infinite_ease-in-out] rounded-full" />
          </div>
        </div>
      </div>

      {/* Decorative Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Custom Keyframe for the loading bar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default PreLoader;