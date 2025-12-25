import React, { useEffect, useState } from 'react';
import { LuBotMessageSquare, LuSend, LuPlus, LuHash, LuSearch, LuSettings, LuLogOut } from "react-icons/lu";
import { userAPI } from '../api/api';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [me, setme] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchUsersDeatils = async () => {
      try {
        const res1 = await userAPI.me();
        setme(res1.data.user);
        const res2 = await userAPI.getAllUsers();
        setAllUsers(res2.data.users);
      } catch (error) {
        console.error("Fetch User Error:", error.response || error);
      }
    };

    fetchUsersDeatils();
  }, []);

  const chatHistory = [
    { id: 1, text: "Hey! How's the new Varta UI coming along?", sender: "Alex", time: "10:30 AM", isMe: false },
    { id: 2, text: "It's looking amazing. The glassmorphism effect is so clean!", sender: "Me", time: "10:32 AM", isMe: true },
    { id: 3, text: "Check out the new message bubbles.", sender: "Me", time: "10:32 AM", isMe: true },
  ];

  return (
    <div className='relative flex h-screen w-full bg-[#0a0a0c] text-white overflow-hidden font-sans'>

      {/* Background Blobs (Kept for consistency) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[150px]" />

      {/* Sidebar - Frosted Glass */}
      <aside className='relative z-20 w-80 h-full bg-white/2 border-r border-white/10 backdrop-blur-3xl flex flex-col'>
        <div className='p-6 flex items-center gap-3 border-b border-white/5'>
          <div className="p-2 rounded-xl bg-linear-to-br from-pink-500/20 to-orange-500/20 border border-white/10">
            <LuBotMessageSquare size={24} className="text-white" />
          </div>
          <h1 className='text-2xl font-black tracking-tighter'>Varta</h1>
        </div>

        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          <div className='flex items-center justify-between mb-4 px-2'>
            <span className='text-xs font-bold uppercase tracking-widest text-white/40'>Chats</span>
          </div>
          {allUsers.map((user) => (
            <div
              key={user.id}
              className=' bg-white/8 flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'
            >
              <img
                src={user.avatarUrl || "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Aidan"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>{user.name}</p>
              </div>
            </div>
          ))}

        </div>

        {/* User Profile Footer */}
        <div className='p-4 bg-white/2   border-t border-white/5 flex items-center gap-3'>
          <img
            src={me?.avatarUrl || "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Aidan"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-bold truncate'>{me?.name || "Lodaing..."}</p>
            <p className='text-[10px] text-white/40 uppercase tracking-tighter'>Online</p>
          </div>
          <button className='text-white/30 hover:text-white transition-colors'><LuSettings size={18} /></button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className='relative z-10 flex flex-col flex-1 h-full'>

        {/* Chat Header */}
        <header className='flex items-center justify-between px-8 h-20 bg-white/[0.01] border-b border-white/5 backdrop-blur-md'>
          <div className='flex items-center gap-4'>
            <span className='text-2xl text-white/20 font-light'>#</span>
            <h2 className='text-lg font-bold'>general</h2>
          </div>
          <div className='flex items-center gap-6 text-white/40'>
            <LuSearch size={20} className='cursor-pointer hover:text-white transition-colors' />
          </div>
        </header>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-8 space-y-6'>
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className='flex items-center gap-2 mb-1 px-2'>
                <span className='text-xs font-bold text-white/60'>{msg.sender}</span>
                <span className='text-[10px] text-white/20'>{msg.time}</span>
              </div>
              <div className={`max-w-md p-4 rounded-2xl backdrop-blur-md border ${msg.isMe
                ? 'bg-white/10 border-white/20 text-white rounded-tr-none'
                : 'bg-white/[0.03] border-white/5 text-white/80 rounded-tl-none'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <footer className='p-8'>
          <div className='relative max-w-4xl mx-auto'>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message #general"
              className='w-full bg-white/[0.05] border border-white/10 backdrop-blur-2xl rounded-2xl py-5 pl-6 pr-16 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all'
            />
            <button className='absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white text-black hover:bg-[#f5e1b4] transition-all active:scale-95 shadow-lg'>
              <LuSend size={20} />
            </button>
          </div>
        </footer>
      </main>

    </div>
  );
};

export default Chat;