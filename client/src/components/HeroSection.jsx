import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
//import { cityNames } from '../assets/assets.js';

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value.length > 0) {
      const filtered = cityNames.filter(city => city.toLowerCase().includes(value.toLowerCase()));
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
        setFilteredCities([]);
        setShowDropdown(false);
    }
  };

  const selectCity = (city) => {
    setDestination(city);
    setShowDropdown(false);
  };

  return (
    <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80')" }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center px-4 mt-20">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Find Your Sanctuary</h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">Discover handpicked hotels that redefine luxury and comfort. 
            RestInn connects you to the world’s most exquisite stays with ease.</p>

        <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 w-full max-w-5xl mx-auto items-end relative">
          <div className="flex-1 w-full text-left relative" ref={dropdownRef}>
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Destination</label>
            <div className="flex items-center border rounded-lg p-2 mt-1 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <MapPin className="text-blue-600 mr-2 w-5 h-5" />
              <input type="text" placeholder="Where are you going?" className="w-full outline-none" value={destination} onChange={handleInputChange} />
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>
            {showDropdown && (
              <div className="absolute z-50 w-full bg-white mt-1 border rounded-lg shadow-xl max-h-60 overflow-y-auto text-left">
                {filteredCities.map((city, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm" onClick={() => { setDestination(city); setShowDropdown(false); }}>{city}</div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full md:w-44 text-left">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check In</label>
            <div className="flex items-center border rounded-lg p-2 mt-1"><Calendar className="text-blue-600 mr-2 w-5 h-5" /><input type="date" className="w-full outline-none text-sm" /></div>
          </div>
          <div className="w-full md:w-44 text-left">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check Out</label>
            <div className="flex items-center border rounded-lg p-2 mt-1"><Calendar className="text-blue-600 mr-2 w-5 h-5" /><input type="date" className="w-full outline-none text-sm" /></div>
          </div>
          <div className="w-full md:w-32 text-left">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Guests</label>
            <div className="flex items-center border rounded-lg p-2 mt-1"><Users className="text-blue-600 mr-2 w-5 h-5" /><input type="number" min="1" placeholder="1" className="w-full outline-none" /></div>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;