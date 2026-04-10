import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link
import { Search, Menu, X, LogOut, User, UserCircle, ChevronDown, ShieldCheck, BookOpen } from 'lucide-react';
import { useClerk, useUser, UserButton } from '@clerk/react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'Hotels', path: '#hotels' },
    { name: 'Experience', path: '#experience' },
    { name: 'About', path: '#about' },
  ];

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 md:px-10 py-6 text-white bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">R</div>
          <span className="text-2xl font-bold tracking-tight">RestInn</span>
        </div>

        <ul className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              {/* Changed to Link */}
              {/* <Link to={link.path} className="hover:text-blue-400 cursor-pointer transition-colors">
                {link.name}
              </Link> */}

              <a href={link.path} className="hover:text-blue-400 cursor-pointer transition-colors">
              {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <input type="text" placeholder="Search..." className="bg-white/20 border border-white/30 rounded-full px-4 py-1.5 focus:outline-none focus:bg-white/30 placeholder-white text-sm w-48" />
            <Search className="absolute right-3 top-2 w-4 h-4 text-white/70" />
          </div>

          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-1 hover:text-blue-400 transition-colors focus:outline-none">
              <UserCircle size={28} />
              <ChevronDown size={14} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 z-50 text-gray-800 border border-gray-100 overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Switch Account</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm font-medium transition-colors">
                  <User size={18} className="text-blue-600" /> User Dashboard
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm font-medium transition-colors">
                  <ShieldCheck size={18} className="text-purple-600" /> Admin Panel
                </button>
              </div>
            )}
          </div>
          
          {/* {user ? 
            (<UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label='My Bookings' onClick={() => navigate('/my-bookings')}></UserButton.Action>
              </UserButton.MenuItems>
            </UserButton>)
             :
            (<button onClick={openSignIn} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition shadow-md">Login</button>)
            } */}

          {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              {/* 1. Use self-closing tags for Actions 
                  2. Adding a labelIcon helps Clerk validate the layout 
              */}
              <UserButton.Action 
                label="My Bookings" 
                labelIcon={<BookOpen size={16} />} 
                onClick={() => navigate('/my-bookings')} 
              />
              
              {/* You can also add a link to the profile if you want */}
              {/* <UserButton.Action 
                label="Manage Account" 
                labelIcon={<User size={16} />} 
                onClick={() => navigate('/user-profile')} 
              /> */}
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button 
            onClick={() => navigate('/sign-in')} 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition shadow-md"
          >
            Login
          </button>
        )}

          
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar} className="p-2 focus:outline-none">{isSidebarOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      {/* {user && <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              {/* 1. Use self-closing tags for Actions 
                  2. Adding a labelIcon helps Clerk validate the layout 
              */}
              <UserButton.Action 
                label="My Bookings" 
                labelIcon={<BookOpen size={16} />} 
                onClick={() => navigate('/my-bookings')} 
              />
              
              {/* You can also add a link to the profile if you want */}
              {/* <UserButton.Action 
                label="Manage Account" 
                labelIcon={<User size={16} />} 
                onClick={() => navigate('/user-profile')} 
              /> */}
            {/* </UserButton.MenuItems>
          </UserButton>} */}

      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar} />
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <span className="text-2xl font-bold text-blue-600">RestInn</span>
            <button onClick={toggleSidebar}><X size={24} /></button>
          </div>
          <ul className="space-y-6 flex-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.path} 
                  onClick={toggleSidebar} 
                  className="text-lg font-semibold text-gray-700 hover:text-blue-600"
                >
                {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t pt-6 space-y-4">
            
            <button onClick={openSignIn} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold"><User size={18} /> Login</button>
            <button className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 py-3 rounded-lg font-bold"><LogOut size={18} /> Sign Out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;