// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// const Offers = () => {
//   // const offers = [
//   //   { title: 'Honeymoon Special', discount: '30% Off', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
//   //   { title: 'Business Elite', discount: '20% Off', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05' },
//   //   { title: 'Family Fun', discount: '25% Off', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' }
//   // ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="flex justify-between items-end mb-10">
//           <div><h2 className="text-3xl font-bold">Exclusive Offers</h2><p className="text-gray-600">Unlock special deals</p></div>
//           <button className="flex items-center text-blue-600 font-bold">Show all <ChevronRight className="w-5 h-5" /></button>
//         </div>
//         <div className="flex flex-col md:flex-row gap-6">
//           {offers.map((offer, idx) => (
//             <div key={idx} className="flex-1 h-64 relative rounded-2xl overflow-hidden flex items-end p-6 group cursor-pointer">
//               <img src={offer.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
//               <div className="relative text-white">
//                 <span className="bg-yellow-500 text-black text-[10px] font-extrabold px-2 py-1 rounded mb-2 inline-block uppercase">{offer.discount}</span>
//                 <h4 className="text-2xl font-bold">{offer.title}</h4>
//                 <p className="text-sm text-gray-300">Free breakfast & spa access.</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Offers;


import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { exclusiveOffers } from '../assets/assets.js'; // Importing your new data

const Offers = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Exclusive Offers</h2>
            <p className="text-gray-600">Unlock special deals for your next stay</p>
          </div>
          <button className="flex items-center text-blue-600 font-bold hover:gap-2 transition-all">
            Show all <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Offers Grid */}
        <div className="flex flex-col md:flex-row gap-6">
          {exclusiveOffers.map((offer) => (
            <div 
              key={offer._id} 
              className="flex-1 h-80 relative rounded-3xl overflow-hidden flex items-end p-8 group cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Background Image with Zoom Effect */}
              <img 
                src={offer.image} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                alt={offer.title} 
              />
              
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              {/* Offer Content */}
              <div className="relative text-white w-full">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-yellow-500 text-black text-[12px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    {offer.priceOff}% Off
                  </span>
                  {/* Added Expiry Date Badge */}
                  <div className="flex items-center gap-1 text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-md">
                    <Clock size={12} />
                    Valid until {offer.expiryDate}
                  </div>
                </div>

                <h4 className="text-2xl font-bold mb-2">{offer.title}</h4>
                <p className="text-sm text-gray-300 line-clamp-2">{offer.description}</p>
                
                {/* Optional: "Claim Offer" text that appears on hover */}
                <div className="mt-4 overflow-hidden h-0 group-hover:h-6 transition-all duration-300">
                  <p className="text-blue-400 font-bold text-sm flex items-center">
                    Book Now <ChevronRight size={16} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;