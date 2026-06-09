import express from 'express';
import { checkAvailabilityAPI, createBooking, getUserBookings, getHotelBookings, stripePayment, verifyPayment,  cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';   // FIX: was '../middleware/' (missing 's')

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);

bookingRouter.post('/stripe-payment', protect, stripePayment);
bookingRouter.post('/verify-payment', protect, verifyPayment);
bookingRouter.put('/cancel/:bookingId', protect, cancelBooking);
export default bookingRouter;