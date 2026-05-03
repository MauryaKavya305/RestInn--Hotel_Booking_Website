// import Booking from "../models/Booking.js";
// import Room from "../models/Room.js";
// import Hotel from "../models/Hotel.js";

// // function to check availability of room
// const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
//     try {
//         const bookings = await Booking.find({
//             room,
//             checkInDate: {$lte: checkOutDate},
//             checkOutDate: {$lte: checkInDate},
//         });

//         const isAvailable = bookings.length === 0;
//         return isAvailable;
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// // api to check availability of room
// // POST/api/bookings/check-availabiliy
// export const checkAvailabilityAPI = async (req, res) => {
//     try {
//         const { room, checkInDate, checkOutDate } = req.body;
//         const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
//         res.json({ success: true, isAvailable })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }


// // api to create a new booking
// // POST/api/booking/book

// export const createBooking = async (req, res) => {
//     try {
//         const { room, checkInDate, checkOutDate, guests } = req.body;
//         const user = req.user._id;

//         // before booking, check avaialability
//         const isAvailable = await checkAvailability({
//             checkInDate, 
//             checkOutDate,
//             room
//         });

//         if(!isAvailable) {
//             return res.json({success: false, message: "Room is not available"})
//         }

//         // get totalprice from room
//         const roomData = await Room.findById(room).populate("hotel");
//         let totalPrice = roomData.pricePerNight;

//         // calculate total price based on nights
//         const checkIn = new Date(checkInDate)
//         const checkOut = new Date(checkOutDate)
//         const timeDiff = checkOut.getTime() - checkIn.getTime();
//         const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

//         totalPrice *= nights;

//         const booking  = await Booking.create({
//             user, 
//             room,
//             hotel: roomData.hotel._id,
//             guests: +guests,
//             checkInDate,
//             checkOutDate,
//             totalPrice,
//         })
//         res.json({ success: true, message: "Booking created successfully "})
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Failed to create Booking"})
//     }
// };

// // api to get all bookings for a user
// // GET/api/bookings/user

// export const getUserBookings = async (req, res) => {
//     try {
//         const user = req.user._id;
//         const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt: -1});
//         res.json({success: true, bookings})
//     } catch (error) {
//         res.json({success: false, message: "Failed to fetch bookings"});
//     }
// }


// export const getHotelBookings = async (req, res) => {
//     try {
//         const hotel = await Hotel.findOne({owner: req.auth.userId});
//         if(!hotel) {
//             return res.json({success : false, message: "No Hotel Found"});
//         }

//         const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt: -1});

//         // totalBookings
//         const totalBookings = bookings.length;
        
//         // totalRevenue
//         const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
//         res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}});
//     } catch (error) {
//         res.json({success: false, message: "Failed to fetch bookings"});
//     }
// }



import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// Helper: check if a room is available for the given date range
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        // FIX: Corrected overlap query — finds bookings that overlap with requested dates
        // A booking overlaps if: existing checkIn < requested checkOut AND existing checkOut > requested checkIn
        const bookings = await Booking.find({
            room,
            checkInDate: { $lt: checkOutDate },
            checkOutDate: { $gt: checkInDate },
        });

        return bookings.length === 0;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// POST /api/bookings/book
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available for selected dates" });
        }

        const roomData = await Room.findById(room).populate("hotel");
        if (!roomData) return res.json({ success: false, message: "Room not found" });

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
        const totalPrice = roomData.pricePerNight * nights;

        await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        res.json({ success: true, message: "Booking created successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to create booking" });
    }
};

// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user })
            .populate("room hotel")
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
};

// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
    try {
        // FIX: Use req.user._id consistently (protect middleware sets req.user)
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.json({ success: false, message: "No hotel found for this user" });
        }

        const bookings = await Booking.find({ hotel: hotel._id })
            .populate("room hotel user")
            .sort({ createdAt: -1 });

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } });
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch hotel bookings" });
    }
};