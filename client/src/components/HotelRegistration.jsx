import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, Image, Percent, ListChecks, FileText, Camera } from 'lucide-react';

const RegisterHotel = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    city: '',
    country: '',
    description: '',
    basePrice: '',
    discount: '',
    mainImageUrl: '',
    galleryUrls: '',
    amenities: []
  });

  const amenityOptions = [
    "Free WiFi", "Swimming Pool", "Spa & Wellness", "Fitness Center", 
    "Restaurant", "Room Service", "Free Parking", "Pet Friendly"
  ];

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="container mx-auto px-6 py-10">
        <div className="bg-blue-600 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
          {/* Left Side: Dummy Photo */}
          <div className="w-full md:w-1/2 h-64 md:h-[350px]">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000" 
              alt="Register Hotel" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Side: Heading */}
          <div className="w-full md:w-1/2 p-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Register Your Hotel
            </h1>
            <p className="text-blue-100 mt-4 text-lg font-medium">
              Join our network and start hosting guests from around the world.
            </p>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
          <form className="space-y-8">
            
            {/* 1. Basic Info Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Hotel-Name</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <Building2 className="text-blue-600" size={20} />
                  <input type="text" placeholder="e.g. Grand Plaza" className="bg-transparent outline-none w-full font-bold text-gray-700" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <MapPin className="text-blue-600" size={20} />
                  <input type="text" placeholder="e.g. New York" className="bg-transparent outline-none w-full font-bold text-gray-700" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Country</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <MapPin className="text-blue-600" size={20} />
                  <input type="text" placeholder="e.g. USA" className="bg-transparent outline-none w-full font-bold text-gray-700" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Base price per night</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <DollarSign className="text-blue-600" size={20} />
                  <input type="number" placeholder="0.00" className="bg-transparent outline-none w-full font-bold text-gray-700" />
                </div>
              </div>
            </div>

            {/* 2. Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
              <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                <FileText className="text-blue-600 mt-1" size={20} />
                <textarea rows="4" placeholder="Tell guests about your hotel..." className="bg-transparent outline-none w-full font-bold text-gray-700 resize-none" />
              </div>
            </div>

            {/* 3. Discount & Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">current discount percentage</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <Percent className="text-blue-600" size={20} />
                  <input type="number" placeholder="e.g. 10" className="bg-transparent outline-none w-full font-bold text-gray-700" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">url for main image</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <Image className="text-blue-600" size={20} />
                  <input type="text" placeholder="https://..." className="bg-transparent outline-none w-full font-bold text-gray-700" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">url for gallery pages</label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                <Camera className="text-blue-600" size={20} />
                <input type="text" placeholder="Paste multiple URLs separated by commas" className="bg-transparent outline-none w-full font-bold text-gray-700" />
              </div>
            </div>

            {/* 4. Checklist of Amenities */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ListChecks size={18} className="text-blue-600" /> Checklist of amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenityOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      onChange={() => handleAmenityChange(option)}
                    />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-6">
              Register Hotel Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterHotel;