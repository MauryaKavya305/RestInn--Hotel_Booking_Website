import React from 'react';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-10 py-6 text-white bg-gradient-to-b from-black/50 to-transparent">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">R</div>
        <span className="text-2xl font-bold tracking-tight">RestInn</span>
      </div>
      
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <li className="hover:text-blue-400 cursor-pointer">Home</li>
        <li className="hover:text-blue-400 cursor-pointer">Hotels</li>
        <li className="hover:text-blue-400 cursor-pointer">Experience</li>
        <li className="hover:text-blue-400 cursor-pointer">About</li>
      </ul>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input type="text" placeholder="Search..." className="bg-white/20 border border-white/30 rounded-full px-4 py-1 focus:outline-none focus:bg-white/30 placeholder-white text-sm" />
          <Search className="absolute right-3 top-1.5 w-4 h-4" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;