import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Room from "../models/Room.js";

// POST /api/hotels - Register new hotel
export const registerHotel = async (req, res) => {
    try {
        const { name, country, contact, city } = req.body;
        const owner = req.user._id;

        const existingHotel = await Hotel.findOne({ owner });
        if (existingHotel) {
            return res.json({ success: false, message: "Hotel already registered for this account" });
        }

        await Hotel.create({ name, country, contact, city, owner });
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

        res.json({ success: true, message: "Hotel registered successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// GET /api/hotels/my-hotel - Get owner's hotel
export const getMyHotel = async (req, res) => {
    try {
        const owner = req.user._id;
        const hotel = await Hotel.findOne({ owner });
        
        if (!hotel) {
            return res.json({ success: false, message: "No hotel found" });
        }

        res.json({ success: true, hotel });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// PUT /api/hotels/:hotelId - Update hotel details
export const updateHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { name, country, contact, city } = req.body;
        const owner = req.user._id;

        // Verify ownership
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        if (hotel.owner.toString() !== owner) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        await Hotel.findByIdAndUpdate(hotelId, { name, country, contact, city });
        res.json({ success: true, message: "Hotel updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// DELETE /api/hotels/:hotelId - Delete hotel and all its rooms
export const deleteHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const owner = req.user._id;

        // Verify ownership
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        if (hotel.owner.toString() !== owner) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        // Delete all rooms associated with this hotel
        await Room.deleteMany({ hotel: hotelId });

        // Delete the hotel
        await Hotel.findByIdAndDelete(hotelId);

        // Update user role back to user
        await User.findByIdAndUpdate(owner, { role: "user" });

        res.json({ success: true, message: "Hotel and all rooms deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};