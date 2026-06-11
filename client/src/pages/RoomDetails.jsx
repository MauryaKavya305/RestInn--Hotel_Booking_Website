import React, { useState, useEffect } from 'react'; // Added useState
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Star, MapPin, Users, Calendar, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { axios, getToken } = useAppContext();

  // --- 1. NEW STATE FOR FORM & AVAILABILITY ---
  const [dates, setDates] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const [isAvailable, setIsAvailable] = useState(false);

  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(`/api/rooms/${id}`);

      if (data.success) {
        setRoom(data.room);
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  if (!room) {
    return (
      <div className="pt-40 text-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  // --- 2. LOGIC FUNCTIONS ---
  const handleCheckAvailability = () => {
    if (!dates.checkIn || !dates.checkOut) {
      alert("Please select both Check-In and Check-Out dates!");
      return;
    }

    // SIMULATED LOGIC: In a real app, you'd check a database here.
    // Let's assume the room is available if it's NOT a holiday (e.g., Dec 25)
    const isRoomFree = !dates.checkIn.includes("12-25");

    if (isRoomFree) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
      alert("We are fully booked for these dates! Please try another time.");
    }
  };

  const handleBookNow = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: room._id,
          checkInDate: dates.checkIn,
          checkOutDate: dates.checkOut,
          guests: dates.guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("BOOKING RESPONSE:", data);

      if (data.success) {
        alert("Booking Created Successfully");
        navigate("/my-bookings");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">

        {/* HEADING & DISCOUNT */}
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-bold text-gray-900"> {room.hotel.name}</h1>

          {/* <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
            {room.roomType}% OFF
          </span> */}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-600 font-medium">
            Room Type: {room.roomType}
          </span>
        </div>

        {/* LOCATION */}
        <div className="flex items-center text-gray-600 mb-8">
          <MapPin size={18} className="mr-2 text-blue-600" />
          <span className="font-medium">{room.hotel.city}, {room.hotel.country}</span>
        </div>

        {/* IMAGE GALLERY */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          <div className="h-[500px] overflow-hidden rounded-3xl shadow-lg">
            <img src={
              room.images?.length > 0
                ? room.images[0]
                : "https://via.placeholder.com/800x500?text=Room+Image"
            } className="w-full h-full object-cover" alt="Main" />
          </div>

          {room.images?.slice(1).map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src={img}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                alt="Room"
              />
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">

  {/* Main Hotel Image */}
  <div className="h-[500px] overflow-hidden rounded-3xl shadow-lg">
    <img
      src={
        room.hotel?.image ||
        "https://via.placeholder.com/800x500?text=Hotel"
      }
      className="w-full h-full object-cover hover:scale-110 transition duration-500"
      alt={room.hotel?.name}
    />
  </div>

  {/* Gallery Images */}
  {room.hotel?.gallery?.map((img, idx) => (
    <div
      key={idx}
      className="overflow-hidden rounded-2xl shadow-sm h-[500px] w-[600px]"
    >
      <img
        src={img}
        className="w-full h-full object-cover hover:scale-110 transition duration-500"
        alt={`Gallery ${idx + 1}`}
      />
    </div>
  ))}
</div>

        {/* FACILITIES & PRICE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-gray-100 mb-12">
          <div className="flex flex-wrap gap-3">
            {room.amenities.map((tag, i) => (
              <div key={i} className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-blue-700 font-bold text-xs uppercase tracking-wider">
                <Zap size={14} /> {tag}
              </div>
            ))}
          </div>
          <div className="text-right mt-6 md:mt-0">
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Pricing Starts At</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-blue-600">₹{room.pricePerNight}</span>
              <span className="text-gray-500 font-bold">/night</span>
            </div>
          </div>
        </div>

        {/* BOOKING FORM & FEATURES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-gray-50 p-10 rounded-[2rem] border border-gray-100 shadow-inner">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Plan Your Stay</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              {/* Check In */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Check In</label>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3 focus-within:ring-2 ring-blue-500/20 transition-all shadow-sm">
                  <Calendar className="text-blue-600" size={22} />
                  <input
                    type="date"
                    onChange={(e) => { setDates({ ...dates, checkIn: e.target.value }); setIsAvailable(false); }}
                    className="bg-transparent focus:outline-none text-sm font-bold text-gray-700 w-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Check Out */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Check Out</label>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3 focus-within:ring-2 ring-blue-500/20 transition-all shadow-sm">
                  <Calendar className="text-blue-600" size={22} />
                  <input
                    type="date"
                    onChange={(e) => { setDates({ ...dates, checkOut: e.target.value }); setIsAvailable(false); }}
                    className="bg-transparent focus:outline-none text-sm font-bold text-gray-700 w-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Guests Number Input */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Guests</label>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3 focus-within:ring-2 ring-blue-500/20 transition-all shadow-sm">
                  <Users className="text-blue-600" size={22} />
                  <input
                    type="number" min="1" max="10"
                    value={dates.guests}
                    onChange={(e) => setDates({ ...dates, guests: e.target.value })}
                    className="bg-transparent focus:outline-none text-sm font-bold text-gray-700 w-full"
                  />
                </div>
              </div>
            </div>

            {/* --- BUTTONS SECTION --- */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleCheckAvailability}
                className={`${isAvailable ? 'w-1/2 bg-gray-200 text-gray-600' : 'w-full bg-blue-600 text-white'} py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-lg active:scale-95`}
              >
                {isAvailable ? "Dates Verified" : "Check Availability"}
              </button>

              {isAvailable && (
                <button
                  onClick={handleBookNow}
                  className="w-full md:w-1/2 bg-green-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition-all shadow-xl animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="p-2">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" /> Top Features
            </h3>
            <ul className="space-y-6">
              {room.amenities.map((feature, i) => (
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