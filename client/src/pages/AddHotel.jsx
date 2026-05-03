import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, Image, Percent, ListChecks, FileText, Camera } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth, useClerk } from '@clerk/react';
import toast from 'react-hot-toast';

const RegisterHotel = ({ onHotelAdded }) => {
  const [formData, setFormData] = useState({
    hotelName: '',
    contact: '',
    city: '',
    country: '',
    description: '',
    basePrice: '',
    discount: '',
    mainImageUrl: '',
    galleryUrls: '',
    amenities: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const { openSignIn } = useClerk();
  const authReady = isLoaded;
  const authValid = authReady && isSignedIn;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const amenityOptions = [
    'Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Fitness Center',
    'Restaurant', 'Room Service', 'Free Parking', 'Pet Friendly'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authReady) {
      toast.error('Checking authentication state. Please wait a moment.');
      return;
    }

    if (!authValid) {
      toast.error('Please sign in before registering a hotel');
      openSignIn();
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken();
      console.log('RegisterHotel auth', { authValid, tokenExists: Boolean(token) });
      if (!token) {
        throw new Error('Unable to get Clerk session token. Please sign in first.');
      }

      const response = await axios.post(
        `${backendUrl}/api/hotels`,
        {
          name: formData.hotelName,
          country: formData.country,
          contact: formData.contact,
          city: formData.city
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Hotel registered successfully');
        if (onHotelAdded) {
          onHotelAdded();
        } else {
          navigate('/owner-dashboard');
        }
      } else {
        toast.error(response.data.message || 'Failed to register hotel');
      }
    } catch (error) {
      console.error('Hotel registration error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to register hotel');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="container mx-auto px-6 py-10">
        <div className="bg-blue-600 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
          {/* Left Side: Dummy Photo */}
          <div className="w-full md:w-1/2 h-64 md:h-87.5">
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
        <div className="max-w-4xl mx-auto bg-white rounded-4xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="mb-6 rounded-3xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            {authReady ? (
              authValid ? (
                <span className="font-bold text-green-700">Signed in via Clerk — you can register a hotel.</span>
              ) : (
                <span className="font-bold text-yellow-700">Not signed in — please sign in before registering a hotel.</span>
              )
            ) : (
              <span>Checking Clerk authentication status...</span>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Hotel Name</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <Building2 className="text-blue-600" size={20} />
                  <input
                    name="hotelName"
                    type="text"
                    value={formData.hotelName}
                    onChange={handleChange}
                    placeholder="e.g. Grand Plaza"
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Country</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <MapPin className="text-blue-600" size={20} />
                  <input
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. USA"
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <MapPin className="text-blue-600" size={20} />
                  <input
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. New York"
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <DollarSign className="text-blue-600" size={20} />
                  <input
                    name="contact"
                    type="text"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="e.g. +1 234 567 890"
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
              <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                <FileText className="text-blue-600 mt-1" size={20} />
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell guests about your hotel..."
                  className="bg-transparent outline-none w-full font-bold text-gray-700 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Current discount percentage</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <Percent className="text-blue-600" size={20} />
                  <input
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Main image URL</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <Image className="text-blue-600" size={20} />
                  <input
                    name="mainImageUrl"
                    type="text"
                    value={formData.mainImageUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Gallery image URLs</label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                <Camera className="text-blue-600" size={20} />
                <input
                  name="galleryUrls"
                  type="text"
                  value={formData.galleryUrls}
                  onChange={handleChange}
                  placeholder="Paste multiple URLs separated by commas"
                  className="bg-transparent outline-none w-full font-bold text-gray-700"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ListChecks size={18} className="text-blue-600" /> Checklist of amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenityOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(option)}
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

            {!authValid && (
              <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-950 mb-4">
                <p className="font-bold">Sign in required</p>
                <p className="text-sm mt-1">You must sign in with Clerk before registering a hotel.</p>
                <button
                  type="button"
                  onClick={() => openSignIn()}
                  className="mt-4 inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-white hover:bg-yellow-500 transition"
                >
                  Sign in now
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !authValid}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-6 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {isSubmitting ? 'Registering...' : !authValid ? 'Sign in to register' : 'Register Hotel Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterHotel;