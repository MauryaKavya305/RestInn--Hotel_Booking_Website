import React, { useState, useEffect } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight, Wifi, Coffee, Wind, Filter, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const AllHotels = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchedCity = queryParams.get("city");

  // const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);

  const [priceRange, setPriceRange] = useState(20000);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const hotelsPerPage = 10;

  const searchCityOnly = searchedCity
    ? searchedCity.split(",")[0].trim()
    : "";

  // const filteredHotels = hotels.filter((hotel) => {
  //   if (!searchedCity) return true;

  //   return (
  //     hotel.city?.toLowerCase() ===
  //     searchedCity.toLowerCase()
  //   );
  // });

  let filteredHotels = hotels.filter((hotel) => {

    const cityMatch =
      !searchedCity ||
      hotel.city?.toLowerCase() === searchedCity.toLowerCase();

    const priceMatch =
      hotel.startingPrice <= priceRange;

    return cityMatch && priceMatch;
  });

  if (sortBy === "low-high") {
    filteredHotels.sort(
      (a, b) => a.startingPrice - b.startingPrice
    );
  }

  if (sortBy === "high-low") {
    filteredHotels.sort(
      (a, b) => b.startingPrice - a.startingPrice
    );
  }



  // Calculate the range of hotels to show
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Total pages logic
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // const { data } = await axios.get(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/rooms`
        // );

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/hotels/all`
        );

        console.log("API RESPONSE:", data);

        if (data.success) {
          // setRooms(data.rooms);
          setHotels(data.hotels);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">

        {/* HEADING */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Hotels</h1>
          <p className="text-gray-500 text-lg">Showing {filteredHotels.length === 0 ? 0 : indexOfFirstHotel + 1}-{Math.min(indexOfLastHotel, filteredHotels.length)} of {filteredHotels.length} luxury stays  {searchedCity ? ` in ${searchedCity}` : ""}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT: HOTEL LIST (Spacious Cards) */}
          <div className="flex-1 space-y-10"> {/* Increased gap between cards */}
            {/* <h1 className="text-red-500 text-3xl">
              Rooms Found: {filteredHotels.length}
            </h1> */}
            {currentHotels.map((hotel) => (
              <div
                // key={hotel.id} 
                key={hotel._id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row p-6 gap-8 hover:shadow-xl transition-all duration-300"
              >

                {/* 2. WRAP IMAGE IN LINK */}
                <Link to={`/hotel/${hotel._id}`} className="w-full md:w-80 h-64 md:h-72 shrink-0 overflow-hidden rounded-2xl block">
                  <img
                    src={
                      hotel.images?.length > 0
                        ? hotel.images[0]
                        : "https://via.placeholder.com/400x300?text=Room"
                    }
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    alt={hotel.name}
                  />
                </Link>

                {/* Details Section with more "Breathing Room" */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        {/* <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3> */}

                        {/* 3. OPTIONAL: WRAP NAME IN LINK TOO */}
                        <Link to={`/hotel/${hotel._id}`}>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">{hotel.name}</h3>
                        </Link>
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
                      {hotel.amenities?.map((tag, index) => (
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
                        <span className="text-3xl font-black text-blue-600">Starting from ₹{hotel.startingPrice}</span>
                        <span className="text-gray-400 font-medium">/night</span>
                      </div>
                    </div>

                    {/* 4. WRAP BUTTON IN LINK */}
                    <Link to={`/hotel/${hotel._id}`}>
                      <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                        Book This Room
                      </button>
                    </Link>
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

          {/* RIGHT: FILTER SECTION */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-28 h-fit max-h-[calc(100vh-120px)] overflow-y-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100 custom-scrollbar">

              <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Refine Search</h2>
              </div>

              {/* Filter 1: Room Size */}
              {/* <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Room Category</h3>
                <div className="space-y-3">
                  {["Single Bed", "Double Bed", "Family Suites", "Luxury Rooms"].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all" />
                      <span className="text-gray-600 group-hover:text-blue-600 transition text-sm font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div> */}

              {/* Filter 2: Price Range */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Max Price: ₹{priceRange}</h3>
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
                  <span>₹2,000</span>
                  <span>₹20,000+</span>
                </div>
              </div>

              {/* Filter 3: Sort By */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Sort Results</h3>
                <div className="relative">
                  {/* <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option>Featured Stays</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Ratings: High to Low</option>
                  </select> */}

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="featured">Featured Stays</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>

                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Apply Button */}
              <button disabled className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200">
                Apply Filters
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AllHotels;