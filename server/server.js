// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import userRouter from "./routes/userRoutes.js";
// import hotelRouter from "./routes/HotelRoutes.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import roomRouter from "./routes/RoomRoutes.js";
// import bookingRouter from "./routes/BookingRoutes.js";

// connectDB()
// connectCloudinary();

// const app = express();
// app.use(cors());    // enable cross-origin resource sharing

// // middleware
// app.use(express.json());    // parse incoming JSON requests
// app.use(clerkMiddleware());

// // api to listen clerk webhooks
// app.use("/api/clerk", clerkWebhooks);

// app.get("/", (req, res) => {
//     res.send("API is working fine");
// })

// app.use("/api/user", userRouter);
// app.use("/api/hotels", hotelRouter);
// app.use("/api/rooms", roomRouter);
// app.use("/api/bookings", bookingRouter);

// const PORT = process.env.PORT || 3000;

// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`)
// //     connectDB();
// //     console.log("Connected to MongoDB");
// // });

// // Connect to DB first, then start server
// // connectDB().then(() => {
// app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
// });
// });

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";     // FIX: was HotelRoutes.js — use consistent lowercase
import roomRouter from "./routes/roomRoutes.js";       // FIX: was RoomRoutes.js
import bookingRouter from "./routes/bookingRoutes.js"; // FIX: was BookingRoutes.js

// Connect to DB and Cloudinary before starting server
connectDB();
connectCloudinary();

const app = express();

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());

// Clerk webhook — must be before other routes
app.post("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
    res.send("API is working fine");
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});