import React from 'react';
import { LuBotMessageSquare, LuArrowRight, LuMessageCircle, LuUsers, LuZap } from "react-icons/lu";
import { Link } from 'react-router';
const Home = () => {
  return (
    <div className='relative flex justify-center items-center flex-col h-screen w-full bg-[#0a0a0c] overflow-hidden font-sans px-4'>

      {/* Dynamic Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[150px] animate-bounce [animation-duration:10s]" />

      {/* Main Glass Card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl p-12 md:p-16 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">

        {/* Logo Container - Now properly inside the box */}
        <div className="mb-8 p-6 rounded-3xl bg-linear-to-br from-pink-500/10 to-orange-500/10 border border-white/10 shadow-inner group transition-all duration-500 hover:border-pink-500/30">
          <LuBotMessageSquare
            size={70}
            className="text-white drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Text Section */}
        <div className='text-center'>
          <h1 className='text-7xl md:text-9xl font-black tracking-tighter text-white mb-2 leading-none'>
            Varta
          </h1>
          <p className='text-sm md:text-base text-white/40 font-light tracking-[0.5em] uppercase mb-12'>
            Connect & Converse
          </p>
        </div>

        {/* Action Button */}
        <Link to="/register">
          <button className='group relative flex items-center gap-4 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 active:scale-95 mb-12'>
            <span className='text-xl font-bold text-white tracking-wide'>Get Started</span>
            <LuArrowRight className='text-white transition-transform group-hover:translate-x-2' size={24} />
            <div className="absolute inset-0 rounded-2xl bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </Link>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: <LuZap size={14} />, label: "Fast" },
            { icon: <LuMessageCircle size={14} />, label: "Secure" },
            { icon: <LuUsers size={14} />, label: "Global" }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm text-white/40 text-xs uppercase tracking-widest">
              {feature.icon} {feature.label}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home;