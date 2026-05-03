// import express from 'express';
// import { checkAvailabilityAPI, createBooking, getUserBookings, getHotelBookings } from '../controllers/bookingController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const bookingRouter = express.Router();
// bookingRouter.post('/check-availability', checkAvailabilityAPI);
// bookingRouter.post('/book', protect,  createBooking);
// bookingRouter.get('/user', protect,  getUserBookings);
// bookingRouter.get('/hotel', protect,  getHotelBookings);

// export default bookingRouter;



import express from 'express';
import { checkAvailabilityAPI, createBooking, getUserBookings, getHotelBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';   // FIX: was '../middleware/' (missing 's')

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);

export default bookingRouter;