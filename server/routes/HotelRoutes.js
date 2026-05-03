// import express from "express";
// import { protect } from "../middleware/authMiddleware";
// import { registerHotel } from "../controllers/HotelController";

// const hotelRouter = express.Router();
// hotelRouter.post('/', protect, registerHotel);

// export default hotelRouter;



// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";   // FIX: added .js, fixed folder name
// import { registerHotel } from "../controllers/HotelController.js";   // FIX: added .js, fixed casing

// const hotelRouter = express.Router();

// hotelRouter.post('/', protect, registerHotel);

// export default hotelRouter;



import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
    registerHotel, 
    getMyHotel, 
    updateHotel, 
    deleteHotel 
} from "../controllers/HotelController.js";

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);
hotelRouter.get('/my-hotel', protect, getMyHotel);
hotelRouter.put('/:hotelId', protect, updateHotel);
hotelRouter.delete('/:hotelId', protect, deleteHotel);

export default hotelRouter;