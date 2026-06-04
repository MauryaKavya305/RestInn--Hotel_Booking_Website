import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import { v2 as cloudinary } from "cloudinary";

// POST /api/rooms
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;

        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) return res.json({ success: false, message: "Hotel not found. Register a hotel first." });

        let images = [];

if (req.files && req.files.length > 0) {
    const uploadImages = req.files.map(async (file) => {
        const response = await cloudinary.uploader.upload(file.path);
        return response.secure_url;
    });

    images = await Promise.all(uploadImages);
}

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        });

        res.json({ success: true, message: "Room created successfully" });
    } catch (error) {
        // console.error("CREATE ROOM ERROR:");
        // console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// GET /api/rooms
export const getRooms = async (req, res) => {
    // console.log("GET ROOMS API HIT");
    try {
        // const rooms = await Room.find({ isAvailable: true })
         const rooms = await Room.find({})
            .populate({
                path: 'hotel',
                populate: { path: 'owner', select: 'image' }
            })
            .sort({ createdAt: -1 });

        // console.log("ROOMS FOUND IN DB:", rooms.length);
        console.log("ROOMS FOUND IN DB:", rooms.length);

if (rooms.length > 0) {
    console.log("FIRST ROOM:", JSON.stringify(rooms[0], null, 2));
}

        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
            .populate({
                path: "hotel",
                populate: {
                    path: "owner",
                    select: "image"
                }
            });

        if (!room) {
            return res.json({
                success: false,
                message: "Room not found"
            });
        }

        res.json({
            success: true,
            room
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
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
        if (room.hotel.owner.toString() !== req.user._id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        
        await Room.findByIdAndDelete(roomId);
        res.json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};