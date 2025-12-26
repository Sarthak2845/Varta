import React, { useState } from 'react';
import { LuX, LuBug, LuSend } from 'react-icons/lu';

const ErrorModal = ({ isOpen, onClose, error }) => {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle error report submission
    console.log('Error Report:', { error, description, email });
    alert('Error report submitted successfully!');
    onClose();
    setDescription('');
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <LuX size={20} className="text-white" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/30">
            <LuBug size={24} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Report Error</h2>
            <p className="text-white/60 text-sm">Help us fix this issue</p>
          </div>
        </div>

        {/* Error Details */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-300 text-sm font-mono">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Describe what happened</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/30 resize-none"
              rows="4"
              placeholder="What were you doing when this error occurred?"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:from-pink-600 hover:to-red-600 transition-colors"
            >
              <LuSend size={16} />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ErrorModal;