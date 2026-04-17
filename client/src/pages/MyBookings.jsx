// import React from 'react';
// import { allHotels, myBookings } from '../assets/assets';
// import { MapPin, Users, CreditCard, Calendar, Info } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useBookings } from '../context/BookingContext';

// const MyBookings = () => {
  
//   // Logic to check if we have any bookings
//   const hasBookings = myBookings.length > 0;

//   return (
//     <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-6">
        
//         {/* HEADING & DESCRIPTION */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h1>
//           <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
//             Welcome to your personal travel hub. Here, you can keep track of your upcoming stays, 
//             verify check-in details, and monitor your payment status to ensure a stress-free trip.
//           </p>
//         </div>

//         {/* CONDITIONAL RENDERING */}
//         {!hasBookings ? (
//           /* EMPTY STATE */
//           <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-300 shadow-sm">
//             <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Info className="text-blue-600" size={32} />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h2>
//             <p className="text-gray-500 mb-8">It looks like you haven't planned any trips yet. Ready to explore?</p>
//             <Link to="/all-hotels">
//               <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
//                 Browse All Hotels
//               </button>
//             </Link>
//           </div>
//         ) : (
//           /* BOOKINGS LIST */
//           <div className="space-y-6">
//             {/* Header Row for the "Table" Look */}
//             <div className="hidden lg:grid grid-cols-6 gap-4 px-8 py-4 text-gray-400 text-xs font-black uppercase tracking-widest">
//               <div className="col-span-3">Hotels</div>
//               <div className="col-span-2">Date & Time</div>
//               <div className="col-span-1">Payment</div>
//             </div>

//             {myBookings.map((booking) => {
//               // Find the original hotel details from allHotels using the ID
//               const hotel = allHotels.find(h => h.id === booking.hotelId);
              
//               return (
//                 <div key={booking.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col lg:grid lg:grid-cols-6 gap-8 items-center">
                  
//                   {/* SECTION 1: HOTELS */}
//                   <div className="col-span-3 flex flex-col md:flex-row gap-6 w-full">
//                     <img 
//                       src={hotel.image} 
//                       className="w-full md:w-40 h-32 object-cover rounded-2xl shrink-0" 
//                       alt={hotel.name} 
//                     />
//                     <div className="flex flex-col justify-center">
//                       <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
//                       <p className="text-gray-500 flex items-center text-sm mb-3">
//                         <MapPin size={14} className="mr-1 text-blue-600" /> {hotel.city}, {hotel.country}
//                       </p>
//                       <div className="flex gap-4">
//                         <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
//                           <Users size={14} /> {booking.guests} Guests
//                         </span>
//                         <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
//                           <CreditCard size={14} /> Total: ${booking.totalPayment}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* SECTION 2: DATE & TIME */}
//                   <div className="col-span-2 grid grid-cols-2 gap-4 w-full border-t border-b lg:border-none py-6 lg:py-0">
//                     <div className="flex flex-col">
//                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter mb-1">Check In</span>
//                       <p className="font-bold text-gray-700 flex items-center gap-2">
//                          <Calendar size={16} className="text-gray-300" /> {booking.checkIn}
//                       </p>
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="text-[10px] font-black text-red-400 uppercase tracking-tighter mb-1">Check Out</span>
//                       <p className="font-bold text-gray-700 flex items-center gap-2">
//                          <Calendar size={16} className="text-gray-300" /> {booking.checkOut}
//                       </p>
//                     </div>
//                   </div>

//                   {/* SECTION 3: PAYMENT STATUS */}
//                   <div className="col-span-1 flex flex-col items-center lg:items-start w-full gap-3">
                    
//                     {/* The Status Indicator */}
//                     <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
//                       booking.paymentStatus === "Paid" 
//                       ? "bg-green-50 text-green-600" 
//                       : "bg-red-50 text-red-600"
//                     }`}>
//                       {/* Dynamic Dot */}
//                       <span className={`w-2.5 h-2.5 rounded-full ${
//                         booking.paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500"
//                       }`}></span>
//                       {booking.paymentStatus}
//                     </div>

//                     {/* NEW: Pay Now Button for Unpaid bookings */}
//                     {booking.paymentStatus === "Unpaid" && (
//                         <button className="w-full bg-red-500 text-white text-xs py-2 rounded-lg font-bold hover:bg-red-600 transition-colors shadow-md">
//                         Pay Now
//                         </button>
//                     )}
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;


import React from 'react';
import { allHotels } from '../assets/assets'; // Removed myBookings from assets
import { MapPin, Users, CreditCard, Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext'; // Import context

const MyBookings = () => {
  // 1. Pull the dynamic bookings list from your Context Cloud
  const { bookings } = useBookings(); 
  
  // 2. Logic to check if we have any dynamic bookings
  const hasBookings = bookings.length > 0;

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* HEADING & DESCRIPTION */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            Welcome to your personal travel hub. Here, you can keep track of your upcoming stays, 
            verify check-in details, and monitor your payment status to ensure a stress-free trip.
          </p>
        </div>

        {/* CONDITIONAL RENDERING */}
        {!hasBookings ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-300 shadow-sm">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h2>
            <p className="text-gray-500 mb-8">It looks like you haven't planned any trips yet. Ready to explore?</p>
            <Link to="/all-hotels">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                Browse All Hotels
              </button>
            </Link>
          </div>
        ) : (
          /* BOOKINGS LIST */
          <div className="space-y-6">
            {/* Header Row for the "Table" Look */}
            <div className="hidden lg:grid grid-cols-6 gap-4 px-8 py-4 text-gray-400 text-xs font-black uppercase tracking-widest">
              <div className="col-span-3">Hotels</div>
              <div className="col-span-2">Date & Time</div>
              <div className="col-span-1 text-center">Payment Status</div>
            </div>

            {/* Change myBookings.map to bookings.map (the state from context) */}
            {bookings.map((booking) => {
              // Find the original hotel details from allHotels using the ID
              const hotel = allHotels.find(h => h.id === booking.hotelId);
              
              return (
                <div key={booking.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col lg:grid lg:grid-cols-6 gap-8 items-center hover:border-blue-200 transition-colors">
                  
                  {/* SECTION 1: HOTELS */}
                  <div className="col-span-3 flex flex-col md:flex-row gap-6 w-full">
                    <img 
                      src={hotel?.image || booking.image} 
                      className="w-full md:w-40 h-32 object-cover rounded-2xl shrink-0" 
                      alt={hotel?.name} 
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel?.name || booking.name}</h3>
                      <p className="text-gray-500 flex items-center text-sm mb-3">
                        <MapPin size={14} className="mr-1 text-blue-600" /> {hotel?.city}, {hotel?.country}
                      </p>
                      <div className="flex gap-4">
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                          <Users size={14} /> {booking.guests} Guests
                        </span>
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                          <CreditCard size={14} /> Total: ${booking.price || booking.totalPayment}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: DATE & TIME */}
                  <div className="col-span-2 grid grid-cols-2 gap-4 w-full border-t border-b lg:border-none py-6 lg:py-0">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter mb-1">Check In</span>
                      <p className="font-bold text-gray-700 flex items-center gap-2">
                         <Calendar size={16} className="text-gray-300" /> {booking.checkIn}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-red-400 uppercase tracking-tighter mb-1">Check Out</span>
                      <p className="font-bold text-gray-700 flex items-center gap-2">
                         <Calendar size={16} className="text-gray-300" /> {booking.checkOut}
                      </p>
                    </div>
                  </div>

                  {/* SECTION 3: PAYMENT STATUS */}
                  <div className="col-span-1 flex flex-col items-center w-full gap-3">
                    
                    {/* The Status Indicator */}
                    <div className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
                      booking.paymentStatus === "Paid" 
                      ? "bg-green-50 text-green-600" 
                      : "bg-red-50 text-red-600"
                    }`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        booking.paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500"
                      }`}></span>
                      {booking.paymentStatus}
                    </div>

                    {/* Pay Now Button - Triggers only if Unpaid */}
                    {booking.paymentStatus === "Unpaid" && (
                        <button 
                          onClick={() => alert("Redirecting to Payment Gateway...")}
                          className="w-full bg-red-500 text-white text-xs py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md active:scale-95"
                        >
                          Pay Now
                        </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;