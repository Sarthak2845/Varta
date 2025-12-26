import React, { useState } from 'react';
import { LuBotMessageSquare, LuMail, LuLock, LuArrowRight, LuEyeClosed, LuEye } from "react-icons/lu";
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/authContext';
import { useError } from '../context/ErrorContext';
import { authAPI } from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useError();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    // Fixed typo: e.target.value instead of e.target.vale
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      if (response.status === 200 || response.status === 201) {
        // Store user data and token
        login(response.data.user, response.data.token);
        navigate('/chat');
      }
    } catch (error) {
      console.error("Login Error:", error);
      showError(error.response?.data?.message || error.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='relative flex justify-center items-center min-h-screen w-full bg-[#0a0a0c] overflow-hidden font-sans px-4'>

      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[150px]" />

      {/* Login Glass Card */}
      <div className="relative z-10 w-full max-w-md p-8 md:p-12 rounded-[3rem] bg-white/3 border border-white/10 backdrop-blur-2xl shadow-2xl">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-white/10 mb-4 group transition-all duration-500 hover:border-pink-500/40">
            <LuBotMessageSquare size={40} className="text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
          </div>
          <h2 className='text-4xl font-black tracking-tighter text-white'>Welcome Back</h2>
          <p className='text-white/40 text-sm mt-2 font-light tracking-wide italic'>Ready to talk?</p>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative group">
            <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-pink-500 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/50 transition-all"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-pink-500 transition-colors" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/50 transition-all"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            {/* Show/Hide Password Toggle */}
            {
              formData.password && (
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-pink-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
                </button>
              )
            } 
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end px-1">
            <button type="button" className="text-xs text-white/30 hover:text-white transition-colors">
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit"
            className='w-full group relative flex justify-center items-center gap-3 py-4 rounded-2xl bg-white text-black font-bold text-lg transition-all hover:bg-[#f5e1b4] active:scale-[0.98] shadow-lg mt-4'
          >
            Sign In
            <LuArrowRight className='transition-transform group-hover:translate-x-1' size={20} />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-10 text-white/40 text-sm">
          New to Varta?{' '}
          <Link to="/register" className="text-white font-bold hover:underline decoration-orange-500 underline-offset-4 transition-all">
            Create Account
          </Link>
        </p>
      </div>

      {/* Background Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
};

export default Login;