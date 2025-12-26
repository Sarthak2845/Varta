import React from 'react'
import { LuSend } from 'react-icons/lu'
const Chat = ({ Auser }) => {
    return (
        <main className='relative z-10 flex flex-col flex-1 h-full bg-transparent'>
            <header className='flex items-center justify-between px-8 h-20 bg-white/2 border-b border-white/5 backdrop-blur-xl'>
                <div className='flex items-center gap-4 group cursor-pointer'>
                    <div className="relative">
                        <img
                            src={Auser?.avatarUrl || "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=RandomAss"}
                            alt="avatar"
                            className="w-11 h-11 rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3">
                            <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping"></span>
                            <span className="relative block w-3 h-3 bg-green-500 border-2 border-[#0a0a0c] rounded-full"></span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h2 className='text-md font-bold text-white tracking-tight leading-none'>
                            {Auser?.name || "Aidan Smith"}
                        </h2>
                        <span className='text-[11px] text-white/30 uppercase tracking-widest mt-1'>
                            Active Now
                        </span>
                    </div>
                </div>
            </header>

            {/* Chat messages would go here */}
            <div className="flex-1 overflow-y-auto">
                {/* Content */}
            </div>
            <footer className='p-8'>
                <div className='relative max-w-4xl mx-auto'>
                    <input
                        type="text"
                        placeholder='Type your message...'
                        className='w-full bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl py-5 pl-6 pr-16 text-white placeholder:text-white/20 focus:outline-none  transition-all'
                    />
                    <button className='absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white text-black hover:bg-[#f5e1b4] transition-all active:scale-95 shadow-lg'>
                        <LuSend size={20} />
                    </button>
                </div>
            </footer>
        </main>
    )
}

export default Chat
