// import React from 'react';
// import { Star, MapPin } from 'lucide-react';

// const FeaturedHotels = () => {
//   const hotels = [1, 2, 3, 4, 5, 6, 7, 8]; // This will be your API data later

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-6 text-center">
//         <h2 className="text-3xl font-bold mb-2">Our Best Choices</h2>
//         <p className="text-gray-600 mb-12">Handpicked destinations across 8 iconic cities.</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {hotels.map((item) => (
//             <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">
//               <div className="h-48 w-full">
//                 <img src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80`} alt="hotel" className="w-full h-full object-cover" />
//               </div>
//               <div className="p-5 text-left">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-bold text-lg">Grand Plaza</h3>
//                   <div className="flex items-center text-yellow-500 font-bold text-sm"><Star className="w-4 h-4 fill-current mr-1" /> 4.9</div>
//                 </div>
//                 <p className="text-gray-500 text-sm flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" /> Mumbai, India</p>
//                 <div className="flex items-center justify-between mt-4 pt-4 border-t">
//                   <div><span className="text-xl font-bold text-blue-600">$299</span><span className="text-gray-400 text-sm">/night</span></div>
//                   <button className="text-blue-600 font-bold hover:underline">Book Now</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button className="mt-12 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition">View All Destinations</button>
//       </div>
//     </section>
//   );
// };

// export default FeaturedHotels;


import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { featuredHotels } from '../assets/assets.js'; // Import the new data array

const FeaturedHotels = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold mb-2">Our Best Choices</h2>
        <p className="text-gray-600 mb-12">Handpicked destinations across 8 iconic cities.</p>

        {/* Grid Layout: 1 col on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mapping through the 8 hotels from assets.js */}
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">
              
              {/* Hotel Image Container */}
              <div className="h-48 w-full">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>

              {/* Card Body */}
              <div className="p-5 text-left">
                <div className="flex justify-between items-start">
                  {/* Dynamic Hotel Name */}
                  <h3 className="font-bold text-lg leading-tight">{hotel.name}</h3>
                  {/* Dynamic Rating */}
                  <div className="flex items-center text-yellow-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-current mr-1" /> {hotel.rating}
                  </div>
                </div>

                {/* Dynamic Location */}
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> {hotel.location}
                </p>

                {/* Price and Action Row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div>
                    {/* Dynamic Price */}
                    <span className="text-xl font-bold text-blue-600">${hotel.price}</span>
                    <span className="text-gray-400 text-sm">/night</span>
                  </div>
                  <button className="text-blue-600 font-bold hover:underline">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <button className="mt-12 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition">
          View All Destinations
        </button>
      </div>
    </section>
  );
};

export default FeaturedHotels;