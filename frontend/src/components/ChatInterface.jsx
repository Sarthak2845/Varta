import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/chatContext';
import { useAuth } from '../context/authContext';
import { LuSend, LuPhone, LuVideo, LuMessageSquare, LuShield, LuSettings } from 'react-icons/lu';

const ChatInterface = ({ selectedUser }) => {
  const { user } = useAuth();
  const { messages, startConversation, sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      startConversation(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    try {
      await sendMessage(messageText);
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!selectedUser) {
    return (
      <main className="relative flex flex-col flex-1 h-full items-center justify-center font-sans overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#0f0c29]">
          <div className="absolute inset-0 opacity-40 bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />
        </div>
        
        <div className="text-center z-10 p-10 rounded-[3rem] bg-white/2 border border-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-6 rounded-3xl bg-linear-to-br from-pink-500/10 to-orange-500/10 border border-white/10">
              <LuMessageSquare size={50} className="text-white/20" />
            </div>
          </div>
          <h2 className="text-2xl font-black tracking-tighter text-white">Your Conversations</h2>
          <p className="text-white/40 text-sm mt-2 max-w-50 mx-auto leading-relaxed">
            Select a contact from the sidebar to start a secure chat.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className='relative flex flex-col flex-1 h-full overflow-hidden font-sans'>
      <div className="absolute inset-0 -z-10 bg-[#0f0c29]">
        <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-orange-600/15 rounded-full blur-[100px] animate-bounce" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className='flex items-center justify-between px-8 h-20 bg-white/5 border-b border-white/10 backdrop-blur-3xl z-20'>
        <div className='flex items-center gap-4 group cursor-pointer'>
          <div className="relative">
            <img
              src={selectedUser?.avatarUrl || `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${selectedUser?.name}`}
              alt="avatar"
              className="w-11 h-11 rounded-full border border-white/20 object-cover shadow-2xl transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping"></span>
              <span className="relative block w-2.5 h-2.5 bg-green-400 border-2 border-[#1a1a2e] rounded-full"></span>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className='text-md font-black tracking-tight text-white leading-none'>
              {selectedUser?.name}
            </h2>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((message) => {
          const isMe = (message.senderId?._id || message.senderId) === user.id;
          
          return (
            <div key={message._id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className={`relative max-w-[75%] md:max-w-md px-5 py-3 rounded-2xl backdrop-blur-xl border transition-all ${
                isMe 
                ? 'bg-white/15 border-white/20 text-white rounded-tr-none shadow-[0_10px_40px_rgba(0,0,0,0.3)]' 
                : 'bg-black/25 border-white/5 text-white/90 rounded-tl-none shadow-lg'
              }`}>
                <p className="text-[15px] leading-relaxed font-medium">{message.text}</p>
                <div className={`flex items-center gap-2 mt-2 opacity-30 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <span className='text-[9px] uppercase font-bold tracking-widest'>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <footer className='p-6 pt-2'>
        <form onSubmit={handleSendMessage} className='relative max-w-4xl mx-auto group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-[2.2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none' />
          
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Message ${selectedUser?.name || 'Varta'}...`}
            className='relative w-full bg-white/10 border border-white/20 backdrop-blur-3xl rounded-[2rem] py-5 pl-7 pr-16 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all shadow-2xl'
          />
          <button 
            type="submit"
            disabled={!messageText.trim()}
            className='absolute right-3 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white text-black hover:bg-orange-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all active:scale-90 shadow-xl disabled:opacity-20 disabled:grayscale'
          >
            <LuSend size={20} />
          </button>
        </form>
      </footer>
    </main>
  );
};

export default ChatInterface;