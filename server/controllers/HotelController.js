import Hotel from "../models/Hotel";
import User from "../models/User";

// create hotel
export const registerHotel = async (req, res) => {
    try {
        const {name, address, contact, city} = req.body;    // get hotel details from request body
        const owner = req.user._id;    // get user id from request object

        // check if user already registred
        const hotel = await Hotel.findOne({owner});
        if(hotel) {
            return res.json({success: false, message: "Hotel already registered"});
        }

        await Hotel.create({name, address, contact, city, owner});    // create new hotel document in database
        await User.findByIdAndUpdate(owner, {role: "hotelOwner"});    // update user document to set role to "hotelOwner"
        res.json({success: true, message: "Hotel registered successfully"});
    } catch(error) {
        res.json({success: false, message: error.message});
    }
}