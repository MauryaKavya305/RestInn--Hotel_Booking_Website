import React, { useState } from 'react';
import {BedDouble, IndianRupee, ListChecks, ImagePlus, UploadCloud,} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth, useClerk } from '@clerk/react';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const [roomType, setRoomType] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const amenityOptions = [
    'Free WiFi',
    'Air Conditioning',
    'TV',
    'Mini Bar',
    'Room Service',
    'Balcony',
    'Swimming Pool Access',
    'Breakfast Included',
  ];

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      toast.error('Checking authentication...');
      return;
    }

    if (!isSignedIn) {
      toast.error('Please sign in first');
      openSignIn();
      return;
    }

    // if (images.length === 0) {
    //   toast.error('Please upload at least one image');
    //   return;
    // }

    try {
      setIsSubmitting(true);

      const token = await getToken();

      const formData = new FormData();

      formData.append('roomType', roomType);
      formData.append('pricePerNight', pricePerNight);
      formData.append('amenities', JSON.stringify(selectedAmenities));

      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post(
        `${backendUrl}/api/rooms`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Room added successfully');

        setRoomType('');
        setPricePerNight('');
        setSelectedAmenities([]);
        setImages([]);

        navigate('/owner-dashboard');
      } else {
        toast.error(response.data.message || 'Failed to add room');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="container mx-auto px-6 py-10">
        <div className="bg-blue-600 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
          {/* IMAGE */}
          <div className="w-full md:w-1/2 h-64 md:h-96">
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop"
              alt="Add Room"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="w-full md:w-1/2 p-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Add A New Room
            </h1>

            <p className="text-blue-100 mt-4 text-lg font-medium">
              Expand your hotel inventory and start receiving more bookings.
            </p>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ROOM TYPE + PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
                  Room Type
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <BedDouble className="text-blue-600" size={20} />

                  <input
                    type="text"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    placeholder="e.g. Deluxe Suite"
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
                  Price Per Night
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 transition-all">
                  <IndianRupee className="text-blue-600" size={20} />

                  <input
                    type="number"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    placeholder="e.g. 4500"
                    className="bg-transparent outline-none w-full font-bold text-gray-700"
                    required
                  />
                </div>
              </div>
            </div>

            {/* AMENITIES */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ListChecks size={18} className="text-blue-600" />
                Room Amenities
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenityOptions.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />

                    <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ImagePlus size={18} className="text-blue-600" />
                Upload Room Images
              </label>

              <label className="border-2 border-dashed border-blue-200 rounded-3xl p-10 bg-blue-50 hover:bg-blue-100 transition cursor-pointer flex flex-col items-center justify-center text-center gap-4">
                <UploadCloud className="text-blue-600" size={50} />

                <div>
                  <p className="font-black text-gray-700 text-lg">
                    Click to upload images
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Upload up to 4 room images
                  </p>
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-2xl p-3 text-sm font-bold text-gray-700 truncate"
                    >
                      {image.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-6 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {isSubmitting ? 'Adding Room...' : 'Add Room'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
