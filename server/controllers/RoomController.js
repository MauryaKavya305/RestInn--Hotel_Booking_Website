// import Hotel from "../models/Hotel.js";
// import Room from "../models/Room.js";
// import { v2 as cloudinary } from "cloudinary";

// api to create a room for a hotel
// export const createRoom = async (req, res) => {
//     try {
//         const { roomType, pricePerNight, amenities } = req.body;
//         const room = await Room.findOne({owner: req.auth.userId});

//         if(!hotel) return res.json({success: false, message: "Hotel not found"});

//         // upload images to cloudinary and get urls
//         const uploadImages = req.files.map(async (file) => {
//             const response = await cloudinary.uploader.upload(file.path);
//             return response.secure_url;
//         })

//         // wait for all images to be uploaded and get urls
//         const images = await Promise.all(uploadImages);

//         await Room.create({
//             hotel: hotel._id,
//             roomType,
//             pricePerNight: +pricePerNight,
//             amenities: JSON.parse(amenities),
//             images,
//         })
//         res.json({success: true, message: "Room created successfully"});

//     } catch (error) {
//         res.json({success: false, message: error.message });
//     }
// };

// // api to get all rooms for a hotel
// export const getRooms = async (req, res) => {
//     try {
//         const rooms = await Room.find({isAvailable: true}).populate({path: 'hotel',
//              populate: {path: 'owner', select: 'image'}}).sort({createdAt: -1});
//             res.json({success: true, rooms});
//     } catch (error) {
//         res.json({success: false, message: error.message });
//     }
// };

// // api to get all rooms for a specific hotel
// export const getOwnerRooms = async (req, res) => {
//     try {
//         const hotelData = await Hotel({owner: req.auth.userId});
//         const rooms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
//         res.json({success: true, rooms});
//     } catch(error) {
//         res.json({success: false, message: error.message });
//     }
// };

// // api to toggle room availability
// export const toggleRoomAvailability = async (req, res) => {
//     try {
//         const { roomId } = req.body;
//         const roomData = await Room.findById(roomId);
//         roomData.isAvailable = !roomData.isAvailable;
//         await roomData.save();
//         res.json({success: true, message: "Room availability toggled successfully"});
//     } catch (error) {
//         res.json({success: false, message: error.message });
//     }
// };



// import Hotel from "../models/Hotel.js";   // FIX: added .js extension
// import User from "../models/User.js";    // FIX: added .js extension

// // POST /api/hotels
// export const registerHotel = async (req, res) => {
//     try {
//         const { name, address, contact, city } = req.body;
//         const owner = req.user._id;   // FIX: use req.user._id (set by protect middleware)

//         const existingHotel = await Hotel.findOne({ owner });
//         if (existingHotel) {
//             return res.json({ success: false, message: "Hotel already registered for this account" });
//         }

//         await Hotel.create({ name, address, contact, city, owner });
//         await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

//         res.json({ success: true, message: "Hotel registered successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };



import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

// POST /api/rooms
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;

        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) return res.json({ success: false, message: "Hotel not found. Register a hotel first." });

        // Upload images to Cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        });

        const images = await Promise.all(uploadImages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        });

        res.json({ success: true, message: "Room created successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// GET /api/rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true })
            .populate({
                path: 'hotel',
                populate: { path: 'owner', select: 'image' }
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// GET /api/rooms/owner
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel.findOne({ owner: req.user._id });
        if (!hotelData) return res.json({ success: false, message: "No hotel found" });

        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// POST /api/rooms/toggle-availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        if (!roomData) return res.json({ success: false, message: "Room not found" });

        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Room availability updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// DELETE /api/rooms/:roomId - Delete a room
export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        
        // Find the room and populate hotel to verify ownership
        const room = await Room.findById(roomId).populate('hotel');
        if (!room) return res.json({ success: false, message: "Room not found" });
        
        // Verify the room belongs to this user's hotel
        if (room.hotel.owner.toString() !== req.user._id) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        
        await Room.findByIdAndDelete(roomId);
        res.json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};