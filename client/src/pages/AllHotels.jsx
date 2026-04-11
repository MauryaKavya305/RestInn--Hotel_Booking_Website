// import React, { useState, useEffect } from 'react';
// import { Star, MapPin, Filter, ChevronDown } from 'lucide-react';
// import { allHotels } from '../assets/assets';

// const AllHotels = () => {
//   const [filteredHotels, setFilteredHotels] = useState(allHotels);
//   const [priceRange, setPriceRange] = useState(1000);
//   const [selectedRoom, setSelectedRoom] = useState("All");

//   return (
//     <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-6">
        
//         {/* HEADING SECTION */}
//         <div className="text-left mb-10">
//           <h1 className="text-4xl font-bold text-gray-900 mb-3">All Hotels</h1>
//           <p className="text-gray-600 max-w-2xl">
//             Explore our curated selection of stays, from cozy single rooms to expansive luxury suites. 
//             Your perfect sanctuary in the heart of India is just a click away.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-10">
          
//           {/* LEFT: HOTEL LIST (75%) */}
//           <div className="flex-1 space-y-6">
//             {filteredHotels.map((hotel) => (
//               <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col md:flex-row p-4 gap-6">
                
//                 {/* Hotel Photo */}
//                 <div className="w-full md:w-72 h-48 md:h-auto shrink-0">
//                   <img src={hotel.image} className="w-full h-full object-cover rounded-xl" alt={hotel.name} />
//                 </div>

//                 {/* Hotel Details */}
//                 <div className="flex-1 flex flex-col justify-between py-2">
//                   <div>
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-2xl font-bold text-gray-900">{hotel.name}</h3>
//                       <div className="flex items-center text-yellow-500 font-bold bg-yellow-50 px-2 py-1 rounded-lg">
//                         <Star className="w-4 h-4 fill-current mr-1" /> {hotel.rating}
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-500 flex items-center mt-1 text-sm">
//                       <MapPin className="w-4 h-4 mr-1 text-blue-600" /> 
//                       {hotel.city}, {hotel.country}
//                     </p>

//                     {/* Facility Tags */}
//                     <div className="flex flex-wrap gap-2 mt-4">
//                       {hotel.tags.map((tag, index) => (
//                         <span key={index} className="text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Price & Action */}
//                   <div className="flex items-end justify-between mt-6">
//                     <div>
//                       <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Starting from</p>
//                       <span className="text-3xl font-black text-blue-600">${hotel.price}</span>
//                       <span className="text-gray-500 font-medium">/night</span>
//                     </div>
//                     <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT: FILTER SECTION (25%) */}
//           <aside className="w-full lg:w-80 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
//             <div className="flex items-center gap-2 mb-6 pb-4 border-b">
//               <Filter className="w-5 h-5 text-blue-600" />
//               <h2 className="text-xl font-bold">Filters</h2>
//             </div>

//             {/* Filter 1: Room Size */}
//             <div className="mb-8">
//               <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Room Category</h3>
//               <div className="space-y-3">
//                 {["Single Bed", "Double Bed", "Family Suites", "Luxury Rooms"].map((type) => (
//                   <label key={type} className="flex items-center gap-3 cursor-pointer group">
//                     <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                     <span className="text-gray-600 group-hover:text-blue-600 transition text-sm">{type}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Filter 2: Price Range */}
//             <div className="mb-8">
//               <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Price Range</h3>
//               <input 
//                 type="range" 
//                 min="0" 
//                 max="1000" 
//                 value={priceRange}
//                 onChange={(e) => setPriceRange(e.target.value)}
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
//               />
//               <div className="flex justify-between mt-2 text-sm font-bold text-gray-600">
//                 <span>$0</span>
//                 <span>${priceRange}</span>
//               </div>
//             </div>

//             {/* Filter 3: Sort By */}
//             <div className="mb-4">
//               <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Sort By</h3>
//               <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option>Featured</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//                 <option>Ratings: High to Low</option>
//               </select>
//             </div>

//             <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition">
//               Apply Filters
//             </button>
//           </aside>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllHotels;


import React, { useState, useEffect } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight, Wifi, Coffee, Wind } from 'lucide-react';
import { allHotels } from '../assets/assets';

const AllHotels = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;

  // Calculate the range of hotels to show
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = allHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Total pages logic
  const totalPages = Math.ceil(allHotels.length / hotelsPerPage);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* HEADING */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Hotels</h1>
          <p className="text-gray-500 text-lg">Showing {indexOfFirstHotel + 1}-{Math.min(indexOfLastHotel, allHotels.length)} of {allHotels.length} luxury stays.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: HOTEL LIST (Spacious Cards) */}
          <div className="flex-1 space-y-10"> {/* Increased gap between cards */}
            {currentHotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row p-6 gap-8 hover:shadow-xl transition-all duration-300"
              >
                {/* Larger Image Section */}
                <div className="w-full md:w-80 h-64 md:h-72 shrink-0 overflow-hidden rounded-2xl">
                  <img 
                    src={hotel.image} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                    alt={hotel.name} 
                  />
                </div>

                {/* Details Section with more "Breathing Room" */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                        <p className="text-gray-500 flex items-center text-base">
                          <MapPin className="w-4 h-4 mr-2 text-blue-600" /> 
                          {hotel.city}, {hotel.country}
                        </p>
                      </div>
                      <div className="flex items-center text-yellow-500 font-bold bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100">
                        <Star className="w-4 h-4 fill-current mr-1" /> {hotel.rating}
                      </div>
                    </div>

                    {/* Spacing out the tags */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {hotel.tags.map((tag, index) => (
                        <span key={index} className="text-xs font-semibold bg-blue-50 text-blue-700 px-4 py-1.5 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="flex items-end justify-between mt-8 pt-6 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm font-medium mb-1">Per Night</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-blue-600">${hotel.price}</span>
                        <span className="text-gray-400 font-medium">/night</span>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                      Book This Room
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* PAGINATION CONTROLS */}
            <div className="flex justify-center items-center gap-4 mt-16 py-8">
              {/* Previous Button - Hidden on Page 1 */}
              {currentPage > 1 && (
                <button 
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
              )}

              {/* Page Number Indicators (Optional but helpful) */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border hover:border-blue-600'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Next Button - Hidden on Last Page */}
              {currentPage < totalPages && (
                <button 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Next <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: FILTERS (Sticky) */}
          {/* <aside className="hidden lg:block w-80 h-fit bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
             {/* Filter code remains same as previous */}
             {/* <h2 className="text-xl font-bold mb-6">Refine Search</h2> */}
             {/* ... */}
          {/* </aside> */}

          //           {/* RIGHT: FILTER SECTION (25%) */}
           <aside className="w-full lg:w-80 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
             <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                
               <h2 className="text-xl font-bold">Filters</h2>
             </div>

             {/* Filter 1: Room Size */}
             <div className="mb-8">
               <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Room Category</h3>
               <div className="space-y-3">
                 {["Single Bed", "Double Bed", "Family Suites", "Luxury Rooms"].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-600 group-hover:text-blue-600 transition text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter 2: Price Range */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
              />
              <div className="flex justify-between mt-2 text-sm font-bold text-gray-600">
                <span>$0</span>
                <span>${priceRange}</span>
              </div>
            </div>

            {/* Filter 3: Sort By */}
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Sort By</h3>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Ratings: High to Low</option>
              </select>
            </div>

            <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition">
              Apply Filters
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AllHotels;