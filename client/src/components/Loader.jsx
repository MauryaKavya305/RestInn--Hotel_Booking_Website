// import React from 'react';
// import { useEffect } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { useParams } from 'react-router-dom';
// import axios from "axios";

// const Loader = () => {
//     const { navigate } = useAppContext();
//     const { nextUrl } = useParams();

//     // useEffect(() => {
//     //     if(nextUrl) {
//     //         setTimeout(() => {
//     //             navigate(`/${nextUrl}`);
//     //         }, 6000)
//     //     }
//     // }, [nextUrl]);

//     useEffect(() => {
//   const verifyBooking = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "/api/bookings/verify-payment",
//         {
//           bookingId: nextUrl,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       navigate("/my-bookings");

//     } catch (error) {
//       console.log(error);
//       navigate("/my-bookings");
//     }
//   };

//   if (nextUrl) {
//     verifyBooking();
//   }
// }, [nextUrl]);

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="animate-spin rounded-full h-26 w-26 border-4 border-gray-400 border-t-primary">

//             </div>

//         </div>

//     )
// }

// export default Loader;

import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Loader = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();
  console.log("LOADER nextUrl:", nextUrl);
  useEffect(() => {
  console.log("Navigating to:", `/${nextUrl}`);
}, [nextUrl]);

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const successTimer = setTimeout(() => {
      setCompleted(true);
    }, 4000);

    const redirectTimer = setTimeout(() => {
      navigate(`/${nextUrl}`);
    }, 6500);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(redirectTimer);
    };
  }, [nextUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-6">

      {!completed ? (
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center">

          <div className="mx-auto w-24 h-24 border-[6px] border-blue-200 border-t-blue-600 rounded-full animate-spin mb-8"></div>

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Processing Your Booking
          </h2>

          <p className="text-gray-500 mb-8">
            Please wait while we confirm your reservation.
          </p>

          <div className="space-y-4 text-left">

            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <CheckCircle2 size={20} />
              Booking Created
            </div>

            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <CheckCircle2 size={20} />
              Payment Verified
            </div>

            <div className="flex items-center gap-3 text-blue-600 font-semibold animate-pulse">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              Confirming Reservation...
            </div>

          </div>

          <div className="mt-8 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-blue-600 animate-[loading_4s_linear_forwards]"></div>
          </div>

        </div>
      ) : (

        <div className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-lg text-center animate-in fade-in zoom-in duration-700">

          <CheckCircle2
            size={110}
            className="mx-auto text-green-500 mb-6 animate-bounce"
          />

          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Booking Confirmed!
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Congratulations! 🎉
            <br />
            Your hotel reservation has been successfully confirmed.
          </p>

          <div className="mt-6 text-sm text-gray-400">
            Redirecting to My Bookings...
          </div>

        </div>
      )}
    </div>
  );
};

export default Loader;