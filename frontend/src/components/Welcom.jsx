import React from 'react'
import { LuBotMessageSquare } from "react-icons/lu";
const Welcom = () => {
    return (
        <main className='flex-1 flex flex-col items-center justify-center'>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative p-12 rounded-[2.5rem] bg-white/3 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
                    <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-pink-500/10 to-orange-500/10" />
                    <LuBotMessageSquare
                        size={80}
                        className="text-white drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] relative z-10 animate-pulse"
                    />
                </div>
                <div className="mt-8 text-center">
                    <h2 className="text-4xl font-black tracking-tighter text-white mb-4">
                        Welcome to Varta
                    </h2>
                    <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6">
                        Select a chat to get started
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Welcom
