import React, { useState } from 'react';
import { LuBotMessageSquare, LuUser, LuMail, LuLock, LuArrowRight } from "react-icons/lu";
import { Link, useNavigate } from 'react-router';
import { authAPI } from '../api/api';

const Register = () => {
  const navigate = useNavigate();
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handelChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.register(fromData);
      if(response){
        navigate('/login');
        console.log("Registration success:", response);
        alert("Account created successfully!");
      }

    } catch (error) {
      console.error("Registration failed:", error);
      
      // Handle specific error messages from backend
      if (error.response?.status === 409) {
        alert("Email already exists. Please use a different email or try logging in.");
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error creating account. Please try again.");
      }
    }
  };

  return (
    <div className='relative flex justify-center items-center min-h-screen w-full bg-[#0a0a0c] overflow-hidden font-sans px-4'>
      <div className="relative z-10 w-full max-w-md p-8 md:p-12 rounded-[3rem] bg-white/3 border border-white/10 backdrop-blur-2xl shadow-2xl">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 rounded-2xl bg-linear-to-br from-pink-500/10 to-orange-500/10 border border-white/10 mb-4">
            <LuBotMessageSquare size={40} className="text-white" />
          </div>
          <h2 className='text-4xl font-black tracking-tighter text-white'>Join Varta</h2>
        </div>

        {/* FIX 2: Add onSubmit to the form tag */}
        <form className="space-y-6" onSubmit={handelSubmit}>
          
          <div className="relative group">
            <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-pink-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white"
              name="name"
              // FIX 3: Changed 'FormData' to 'fromData' (case sensitivity)
              value={fromData.name}
              onChange={handelChange}
            />
          </div>

          <div className="relative group">
            <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-pink-500 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white"
              name="email"
              value={fromData.email}
              onChange={handelChange}   
            />
          </div>

          <div className="relative group">
            <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-pink-500 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white"
              name="password"
              value={fromData.password}
              onChange={handelChange}
            />
          </div>

          {/* Type must be "submit" */}
          <button type="submit" className='w-full group relative flex justify-center items-center gap-3 py-4 rounded-2xl bg-white text-black font-bold text-lg'>
            Register
            <LuArrowRight className='transition-transform group-hover:translate-x-1' size={20} />
          </button>
        </form>

        <p className="text-center mt-8 text-white/40 text-sm">
          Already registered? <Link to='/login' className="text-white font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;