import React from 'react';
import { useParams } from 'react-router-dom';
import { allHotels, hotelDetails } from '../assets/assets'; // Import both
import { Star, MapPin, Users, Calendar, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

const RoomDetails = () => {
  const { id } = useParams();
  
  // 1. Find basic info from the main list
  const basicInfo = allHotels.find(h => h.id === parseInt(id));
  
  // 2. Find deep details from the new array
  const details = hotelDetails.find(d => d.id === parseInt(id));

  // Loading safety check
  if (!basicInfo || !details) {
    return <div className="pt-40 text-center">Data is loading or not found...</div>;
  }

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* HEADING & DISCOUNT */}
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-bold text-gray-900">{basicInfo.name}</h1>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
            {details.discount}% OFF
          </span>
        </div>

        {/* RATINGS & REVIEW COUNT */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-yellow-500 font-bold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className={i < Math.floor(basicInfo.rating) ? "fill-current" : "text-gray-300"} />
            ))}
            <span className="ml-2 text-gray-900">{basicInfo.rating}</span>
          </div>
          <span className="text-gray-400 text-sm font-medium">|</span>
          <span className="text-gray-500 underline decoration-dotted underline-offset-4">
            {details.reviewCount} reviews
          </span>
        </div>

        {/* LOCATION */}
        <div className="flex items-center text-gray-600 mb-8">
          <MapPin size={18} className="mr-2 text-blue-600" />
          <span className="font-medium">{basicInfo.city}, {basicInfo.country}</span>
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          <div className="h-[500px] overflow-hidden rounded-3xl">
            <img src={basicInfo.image} className="w-full h-full object-cover" alt="Main" />
          </div>
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            {details.extraImages.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-2xl">
                <img src={img} className="w-full h-full object-cover hover:scale-110 transition duration-500" alt="Detail" />
              </div>
            ))}
          </div>
        </div>

        {/* FACILITIES & PRICE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-gray-100 mb-12">
          <div className="flex flex-wrap gap-3">
            {basicInfo.tags.map((tag, i) => (
              <div key={i} className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-blue-700 font-bold text-xs uppercase tracking-wider">
                <Zap size={14} /> {tag}
              </div>
            ))}
          </div>
          <div className="text-right mt-6 md:mt-0">
             <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Pricing Starts At</p>
             <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-blue-600">${basicInfo.price}</span>
                <span className="text-gray-500 font-bold">/night</span>
             </div>
          </div>
        </div>

        {/* BOOKING FORM & FEATURES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-gray-50 p-10 rounded-[2rem] border border-gray-100">
             <h3 className="text-2xl font-bold mb-8">Plan Your Stay</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Check In */}
                <div className="flex flex-col gap-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Check In
                    </label>
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3 focus-within:border-blue-500 transition-all shadow-sm">
                        <Calendar className="text-blue-600" size={22} />
                            <input 
                            type="date" 
                            className="bg-transparent focus:outline-none text-sm font-bold text-gray-700 w-full cursor-pointer" 
                            />
                    </div>
                </div>

                {/* Check Out */}
                <div className="flex flex-col gap-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Check Out
                    </label>
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3 focus-within:border-blue-500 transition-all shadow-sm">
                        <Calendar className="text-blue-600" size={22} />
                            <input 
                            type="date" 
                            className="bg-transparent focus:outline-none text-sm font-bold text-gray-700 w-full cursor-pointer" 
                            />
                    </div>
                </div>
                {/* Guests Number Input */}
                <div className="flex flex-col gap-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Number of Guests
                    </label>
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3 focus-within:border-blue-500 transition-all shadow-sm">
                        <Users className="text-blue-600" size={22} />
                        <input 
                        type="number" 
                        min="1" 
                        max="10" 
                        placeholder="0"
                        className="bg-transparent focus:outline-none text-sm font-bold text-gray-700 w-full cursor-pointer" 
                        />
                    </div>
                </div>
             </div>
             <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition shadow-xl shadow-blue-100">
                Check Availability
             </button>
          </div>

          {/* Features */}
          <div className="p-2">
             <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ShieldCheck className="text-blue-600" /> Top Features
             </h3>
             <ul className="space-y-6">
                {details.features.map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="shrink-0 text-green-500" size={20} />
                    <p className="text-gray-600 font-medium leading-relaxed">{feature}</p>
                  </li>
                ))}
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomDetails;