import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const HotelDetails = () => {
  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/hotel/${hotelId}`
      );

      if (data.success) {
        setRooms(data.rooms);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (rooms.length === 0) {
    return (
      <div className="pt-32 text-center text-2xl">
        Loading...
      </div>
    );
  }

  const hotel = rooms[0].hotel;

  return (
    <div className="pt-28 px-6 pb-20">

      <h1 className="text-4xl font-bold">
        {hotel.name}
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        {hotel.city}, {hotel.country}
      </p>

      <div className="space-y-6">

        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-2xl p-6 shadow"
          >
            <h2 className="text-2xl font-bold">
              {room.roomType}
            </h2>

            <p className="text-blue-600 text-xl mt-2">
              ₹{room.pricePerNight}/night
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {room.amenities.map((a, index) => (
                <span
                  key={index}
                  className="bg-blue-100 px-3 py-1 rounded"
                >
                  {a}
                </span>
              ))}
            </div>

            <Link to={`/room/${room._id}`}>
              <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl">
                View Room
              </button>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default HotelDetails;