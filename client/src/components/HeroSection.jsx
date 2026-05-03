// import React, { useState, useEffect, useRef } from 'react';
// import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
// import { cityNames } from '../assets/assets.js';

// const Hero = () => {
//   const [destination, setDestination] = useState("");
//   const [filteredCities, setFilteredCities] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setDestination(value);
//     if (value.length > 0) {
//       const filtered = cityNames.filter(city => city.toLowerCase().includes(value.toLowerCase()));
//       setFilteredCities(filtered);
//       setShowDropdown(true);
//     } else {
//         setFilteredCities([]);
//         setShowDropdown(false);
//     }
//   };

//   const selectCity = (city) => {
//     setDestination(city);
//     setShowDropdown(false);
//   };

//   return (
//     <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80')" }}>
//       <div className="absolute inset-0 bg-black/40"></div>
//       <div className="relative z-10 text-center px-4 mt-20">
//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Find Your Sanctuary</h1>
//         <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">Discover handpicked hotels that redefine luxury and comfort. 
//             RestInn connects you to the world’s most exquisite stays with ease.</p>

//         <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 w-full max-w-5xl mx-auto items-end relative">
//           <div className="flex-1 w-full text-left relative" ref={dropdownRef}>
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Destination</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
//               <MapPin className="text-blue-600 mr-2 w-5 h-5" />
//               <input type="text" placeholder="Where are you going?" className="w-full outline-none" value={destination} onChange={handleInputChange} />
//               <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
//             </div>
//             {showDropdown && (
//               <div className="absolute z-50 w-full bg-white mt-1 border rounded-lg shadow-xl max-h-60 overflow-y-auto text-left">
//                 {filteredCities.map((city, i) => (
//                   <div key={i} className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm" onClick={() => { setDestination(city); setShowDropdown(false); }}>{city}</div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="w-full md:w-44 text-left">
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check In</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1"><Calendar className="text-blue-600 mr-2 w-5 h-5" /><input type="date" className="w-full outline-none text-sm" /></div>
//           </div>
//           <div className="w-full md:w-44 text-left">
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check Out</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1"><Calendar className="text-blue-600 mr-2 w-5 h-5" /><input type="date" className="w-full outline-none text-sm" /></div>
//           </div>
//           <div className="w-full md:w-32 text-left">
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Guests</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1"><Users className="text-blue-600 mr-2 w-5 h-5" /><input type="number" min="1" placeholder="1" className="w-full outline-none" /></div>
//           </div>
//           <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Search</button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


// import React, { useState, useEffect, useRef } from 'react'; // Importing React hooks for state, side-effects, and DOM references
// import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react'; // Importing icons from the Lucide library
// import { cityNames } from '../assets/assets.js'; // Importing the array of 20 cities from your separate assets file

// const Hero = () => {
//   // --- CITY PART: STATE DEFINITIONS ---
//   const [destination, setDestination] = useState(""); // Stores the text currently typed in the input field
//   const [filteredCities, setFilteredCities] = useState([]); // Stores the list of cities that match the user's typing
//   const [showDropdown, setShowDropdown] = useState(false); // Controls whether the city suggestion box is visible
//   const dropdownRef = useRef(null); // Creates a "hook" to the dropdown element to detect clicks outside of it

//   // Logic to close the city dropdown if the user clicks anywhere else on the screen
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // If the click is NOT inside the dropdown area, hide the dropdown
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside); // Listens for mouse clicks
//     return () => document.removeEventListener("mousedown", handleClickOutside); // Cleans up the listener when component unmounts
//   }, []);

//   // --- CITY PART: FILTERING LOGIC ---
//   const handleInputChange = (e) => {
//     const value = e.target.value; // Get the current text from the input
//     setDestination(value); // Update the input field display
//     if (value.length > 0) {
//       // Filter the assets array: check if city name includes the typed text (ignoring case)
//       const filtered = cityNames.filter(city => city.toLowerCase().includes(value.toLowerCase()));
//       setFilteredCities(filtered); // Update the list of matches
//       setShowDropdown(true); // Show the results box
//     } else {
//       setFilteredCities([]); // Clear matches if input is empty
//       setShowDropdown(false); // Hide the results box
//     }
//   };

//   // Function to handle when a user clicks a city from the list
//   const selectCity = (city) => {
//     setDestination(city); // Set the input text to the chosen city
//     setShowDropdown(false); // Close the dropdown
//   };

//   return (
//     // Full-screen section with a background image from Unsplash
//     <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80')" }}>
      
//       {/* Dark overlay to make the white text and form stand out */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Main content container */}
//       <div className="relative z-10 text-center px-4 mt-20">
//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Find Your Sanctuary</h1>
//         <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">Discover handpicked hotels that redefine luxury and comfort.</p>

//         {/* The Search Form Container */}
//         <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 w-full max-w-5xl mx-auto items-end relative">
          
//           {/* --- CITY PART: DESTINATION INPUT & DROPDOWN --- */}
//           <div className="flex-1 w-full text-left relative" ref={dropdownRef}>
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Destination</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
//               <MapPin className="text-blue-600 mr-2 w-5 h-5" />
//               {/* Input that triggers the handleInputChange logic */}
//               <input type="text" placeholder="Where are you going?" className="w-full outline-none" value={destination} onChange={handleInputChange} />
//               {/* Arrow icon that rotates when the dropdown is open */}
//               <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
//             </div>

//             {/* Rendering the filtered list of cities */}
//             {showDropdown && (
//               <div className="absolute z-50 w-full bg-white mt-1 border rounded-lg shadow-xl max-h-60 overflow-y-auto text-left">
//                 {filteredCities.map((city, i) => (
//                   // Clicking a city updates the state and closes the menu
//                   <div key={i} className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm" onClick={() => { setDestination(city); setShowDropdown(false); }}>
//                     {city}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Date Picker for Check-In */}
//           <div className="w-full md:w-44 text-left">
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check In</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1">
//               <Calendar className="text-blue-600 mr-2 w-5 h-5" />
//               <input type="date" className="w-full outline-none text-sm" />
//             </div>
//           </div>

//           {/* Date Picker for Check-Out */}
//           <div className="w-full md:w-44 text-left">
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check Out</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1">
//               <Calendar className="text-blue-600 mr-2 w-5 h-5" />
//               <input type="date" className="w-full outline-none text-sm" />
//             </div>
//           </div>

//           {/* Number input for Guests */}
//           <div className="w-full md:w-32 text-left">
//             <label className="text-xs font-bold uppercase text-gray-500 ml-2">Guests</label>
//             <div className="flex items-center border rounded-lg p-2 mt-1">
//               <Users className="text-blue-600 mr-2 w-5 h-5" />
//               <input type="number" min="1" placeholder="1" className="w-full outline-none" />
//             </div>
//           </div>

//           {/* The Search Submit Button */}
//           <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Search</button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { cityNames } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';  // FIX 1: Added navigation

const Hero = () => {
  // --- CITY PART: STATE DEFINITIONS ---
  const [destination, setDestination] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // FIX 1: Added form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- CITY PART: FILTERING LOGIC ---
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

  // FIX 1: Handle search button click
  const handleSearch = () => {
    if (!destination) {
      alert("Please select a destination");
      return;
    }
    
    // Build query params
    const params = new URLSearchParams();
    if (destination) params.append('city', destination);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);
    
    // Navigate to hotels page with filters
    navigate(`/all-hotels?${params.toString()}`);
  };

  return (
    <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80')" }}>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center px-4 mt-20">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Find Your Sanctuary</h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">Discover handpicked hotels that redefine luxury and comfort.</p>

        <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 w-full max-w-5xl mx-auto items-end relative">
          
          {/* DESTINATION INPUT & DROPDOWN */}
          <div className="flex-1 w-full text-left relative" ref={dropdownRef}>
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Destination</label>
            <div className="flex items-center border rounded-lg p-2 mt-1 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <MapPin className="text-blue-600 mr-2 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                className="w-full outline-none" 
                value={destination} 
                onChange={handleInputChange} 
              />
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showDropdown && (
              <div className="absolute z-50 w-full bg-white mt-1 border rounded-lg shadow-xl max-h-60 overflow-y-auto text-left">
                {filteredCities.map((city, i) => (
                  <div 
                    key={i} 
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm" 
                    onClick={() => selectCity(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FIX 1: Added value and onChange to date inputs */}
          <div className="w-full md:w-44 text-left">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check In</label>
            <div className="flex items-center border rounded-lg p-2 mt-1">
              <Calendar className="text-blue-600 mr-2 w-5 h-5" />
              <input 
                type="date" 
                className="w-full outline-none text-sm" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="w-full md:w-44 text-left">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Check Out</label>
            <div className="flex items-center border rounded-lg p-2 mt-1">
              <Calendar className="text-blue-600 mr-2 w-5 h-5" />
              <input 
                type="date" 
                className="w-full outline-none text-sm" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="w-full md:w-32 text-left">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">Guests</label>
            <div className="flex items-center border rounded-lg p-2 mt-1">
              <Users className="text-blue-600 mr-2 w-5 h-5" />
              <input 
                type="number" 
                min="1" 
                placeholder="1" 
                className="w-full outline-none" 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>

          {/* FIX 1: Added onClick handler to search button */}
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;