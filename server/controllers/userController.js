import User from "../models/user.js";

// GET /api/user
export const userData = async (req, res) => {
    try {
        const { role, recentSearchCities } = req.user;
        res.json({ success: true, role, recentSearchCities });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// POST /api/user/store-recent-search
export const storeRecentSearchCities = async (req, res) => {
    try {
        const { recentSearchCities } = req.body;
        const user = req.user;   // already attached by protect middleware

        if (user.recentSearchCities.length >= 3) {
            user.recentSearchCities.shift();   // remove oldest
        }
        user.recentSearchCities.push(recentSearchCities);

        await user.save();
        res.json({ success: true, message: "City saved" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};