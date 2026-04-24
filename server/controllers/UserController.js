// Get /api/user

export const userData = async (req, res) => {
    try {
        const role = req.user.role;    // get user role from request object
        const recentSearchCities = req.user.recentSearchCities;    // get recent search cities from request object
        res.json({success: true, role, recentSearchCities});
    } catch(error) {
        res.json({success: false, message: error.message});
    }
}

// store user's recent search cities in database
export const storeRecentSearchCities = async (req, res) => {
    try {
        const {recentSearchCities} = req.body;    // get cities from request body
        const user = await req.user;    // get user object from request

        if(user.recentSearchCities.length < 3) {
            user.recentSearchCities.push(recentSearchCities);    // add new city to recent search cities
        } else {
            user.recentSearchCities.shift();    // remove oldest city
            user.recentSearchCities.push(recentSearchCities);    // add new city
        }
        await user.save();    // save updated user object to database
        res.json({success: true, message: "City added"});
    } catch(error) {
        res.json({success: false, message: error.message});
    }
}