import React, { useEffect, useState } from 'react';
import { LuBotMessageSquare, LuSettings } from "react-icons/lu";
import { userAPI } from '../api/api';
import { ChatProvider } from '../context/chatContext';
import ChatInterface from '../components/ChatInterface';
import { useAuth } from '../context/authContext';

const MainUI = () => {
  const { user } = useAuth();
  const [me, setMe] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  
  useEffect(() => {
    const fetchUsersDetails = async () => {
      try {
        const res1 = await userAPI.me();
        setMe(res1.data.user);
        const res2 = await userAPI.getAllUsers();
        setAllUsers(res2.data.users);
      } catch (error) {
        console.error("Fetch User Error:", error.response || error);
      }
    };

    fetchUsersDetails();
  }, []);

  return (
    <div className='relative flex h-screen w-full bg-[#0a0a0c] text-white overflow-hidden font-sans'>
      {/* Background Blobs */}
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
              key={user._id}
              className='bg-white/8 flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'
              onClick={() => setSelectedChat(user)}
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
        <div className='p-4 bg-white/2 border-t border-white/5 flex items-center gap-3'>
          <img
            src={me?.avatarUrl || "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Aidan"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-bold truncate'>{me?.name || "Loading..."}</p>
            <p className='text-[10px] text-green-400 uppercase tracking-tighter'>Online</p>
          </div>
          <button className='text-white/30 hover:text-white transition-colors'>
            <LuSettings size={18} />
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <ChatProvider>
        {selectedChat ? (
          <ChatInterface selectedUser={selectedChat} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white/60">
              <LuBotMessageSquare size={64} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Welcome to Varta</h3>
              <p>Select a user to start chatting</p>
            </div>
          </div>
        )}
      </ChatProvider>
    </div>
  );
};

export default MainUI;