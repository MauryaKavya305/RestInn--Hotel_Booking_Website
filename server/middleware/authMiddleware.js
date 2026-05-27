// import User from '../models/User.js';

// // middleware to check if user is authenticated
// export const protect = async(req, res, next) => {
//     const {userId} = req.auth;    // get userId from clerk auth object

//     if(!userId) {
//         res.json({success: false, message: "Not authenticated"});
//     } else {
//         const user = await User.findById(userId);
//         req.user = user;    // attach user object to request
//         next();
//     }

// }


import User from '../models/User.js';
import { clerkClient } from '@clerk/express';

// Middleware to check if user is authenticated via Clerk
export const protect = async (req, res, next) => {
    if (!req.auth) {
        console.warn('Auth failed: missing req.auth', {
            authorizationHeader: req.headers.authorization,
            authObject: req.auth,
        });
        return res.json({ success: false, message: "Not authenticated" });
    }

    const authObject = req.auth();
    if (!authObject?.userId) {
        console.warn('Auth failed: missing authObject.userId', {
            authorizationHeader: req.headers.authorization,
            authObject
        });
        return res.json({ success: false, message: "Not authenticated" });
    }

    try {
        let user = await User.findById(authObject.userId);
        if (!user) {
            console.warn('Local user record not found, creating from Clerk profile', {
                userId: authObject.userId,
            });
            const clerkUser = await clerkClient.users.getUser(authObject.userId);
            // const email = clerkUser.email_addresses?.[0]?.email_address || clerkUser.primary_email_address?.email_address || '';
            // const username = [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(' ') || clerkUser.username || email.split('@')[0] || 'Clerk User';
            // const image = clerkUser.image_url || '';

            const email =
                        clerkUser.emailAddresses?.[0]?.emailAddress ||
                        clerkUser.primaryEmailAddress?.emailAddress ||
                        '';

            const username =
                            `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
                            clerkUser.username ||
                            (email ? email.split('@')[0] : 'Clerk User');

            const image = clerkUser.imageUrl || '';

            if (!email) {
                return res.json({ success: false, message: "Unable to create user: missing email from Clerk profile" });
            }

            user = await User.create({
                _id: authObject.userId,
                username,
                email,
                image,
                role: 'user',
                recentSearchCities: [],
            });
        }

        req.user = user;   // attach full user object to request
        next();
    // } catch (error) {
    //     console.error('Auth middleware error:', error.message);
    //     console.log(error);
    //     res.json({ success: false, message: error.message });
    // }

    } catch (error) {
    console.log("========== FULL ERROR ==========");
    console.log(error);
    console.log("MESSAGE:", error.message);

    if (error.errors) {
        console.log("VALIDATION ERRORS:");
        Object.values(error.errors).forEach(err => {
            console.log(err.message);
        });
    }

    res.json({
        success: false,
        message: error.message
    });
}
}