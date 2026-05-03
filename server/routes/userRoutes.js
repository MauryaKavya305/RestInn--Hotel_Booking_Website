// import express from 'express';
// import { protect } from '../middlewares/authMiddleware.js';
// import { userData } from '../controllers/UserController.js';

// const userRouter = express.Router();

// userRouter.get("/", protect, userData);
// userRouter.post("/store-recent-search", protect, storeRecentSearchCities);

// export default userRouter;



import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { userData, storeRecentSearchCities } from '../controllers/UserController.js';   // FIX: added missing import

const userRouter = express.Router();

userRouter.get("/", protect, userData);
userRouter.post("/store-recent-search", protect, storeRecentSearchCities);

export default userRouter;