import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { featuredHotels } from '../assets/assets.js';
import { Link } from 'react-router-dom'; // 1. Import Link
import { Star, MapPin } from 'lucide-react';

const FeaturedHotels = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/hotels/all`
        );

        if (data.success) {
          setFeaturedHotels(data.hotels.slice(0, 8));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">Our Best Choices</h2>
        <p className="text-gray-600 mb-12">Handpicked destinations across 8 iconic cities.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredHotels.map((hotel) => (
            <div key={hotel._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">

              {/* 2. Wrap the image in a Link so it's clickable */}
              <Link to={`/room/${hotel._id}`} className="block h-48 w-full overflow-hidden">
                <img
                  //  src={hotel.image}
                  src={
                    hotel.images?.length > 0
                      ? hotel.images[0]
                      : "https://via.placeholder.com/400x300?text=Hotel"
                  }
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="p-5 text-left">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg leading-tight">{hotel.name}</h3>
                  <div className="flex items-center text-yellow-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-current mr-1" /> {hotel.rating || 4.5}
                  </div>
                </div>

                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> {hotel.city}, {hotel.country}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div>
                    <span className="text-xl font-bold text-blue-600">₹{hotel.startingPrice}</span>
                    <span className="text-gray-400 text-sm">/night</span>
                  </div>

                  {/* 3. Change 'button' to 'Link' for the Book Now action */}
                  <Link
                    to={`/room/${hotel._id}`}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Link the bottom button to your All Hotels page */}
        <Link to="/all-hotels">
          <button className="mt-12 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition">
            View All Destinations
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedHotels;