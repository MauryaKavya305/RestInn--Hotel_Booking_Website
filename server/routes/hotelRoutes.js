import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
    registerHotel, 
    getMyHotel, 
    updateHotel, 
    deleteHotel,
    getAllHotels 
} from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);
hotelRouter.get('/all', getAllHotels);
hotelRouter.get('/my-hotel', protect, getMyHotel);
hotelRouter.put('/:hotelId', protect, updateHotel);
hotelRouter.delete('/:hotelId', protect, deleteHotel);

export default hotelRouter;