// import React, { useState } from 'react';
// import { LayoutDashboard, PlusCircle, Hotel, LogOut, TrendingUp, Users, DollarSign } from 'lucide-react';
// import AddHotel from './AddHotel'; // Your renamed component
// import { allHotels } from '../assets/assets';

// const OwnerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   return (
//     <div className="flex pt-20 min-h-screen bg-gray-50">
      
//       {/* LEFT PANEL: SIDEBAR */}
//       <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-sm">
//         <div className="fixed w-52 space-y-2">
//           <div className="mb-10 px-4">
//             <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Admin Panel</h2>
//           </div>

//           <button 
//             onClick={() => setActiveTab('dashboard')}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
//           >
//             <LayoutDashboard size={20} /> Dashboard
//           </button>

//           <button 
//             onClick={() => setActiveTab('add-hotel')}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'add-hotel' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
//           >
//             <PlusCircle size={20} /> Add Hotel
//           </button>

//           <button 
//             onClick={() => setActiveTab('list-hotels')}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'list-hotels' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
//           >
//             <Hotel size={20} /> List Hotels
//           </button>

//           <div className="pt-10">
//              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors">
//                <LogOut size={20} /> Logout
//              </button>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT PANEL: CONTENT */}
//       <div className="flex-1 p-10 ml-2">
//         {activeTab === 'dashboard' && <DashboardOverview />}
//         {activeTab === 'add-hotel' && <AddHotel />}
//         {activeTab === 'list-hotels' && <ListHotelsView />}
//       </div>
//     </div>
//   );
// };

// /* --- 1. DASHBOARD OVERVIEW COMPONENT --- */
// const DashboardOverview = () => {
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <h1 className="text-3xl font-black text-gray-900 mb-8">Business Overview</h1>
      
//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <StatCard title="Total Revenue" value="$12,850" icon={<DollarSign />} color="text-green-600" bg="bg-green-50" />
//         <StatCard title="Total Bookings" value="48" icon={<TrendingUp />} color="text-blue-600" bg="bg-blue-50" />
//         <StatCard title="Active Guests" value="12" icon={<Users />} color="text-purple-600" bg="bg-purple-50" />
//       </div>

//       {/* RECENT BOOKINGS TABLE */}
//       <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//           <h3 className="font-bold text-lg">Recent Bookings</h3>
//           <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
//         </div>
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
//             <tr>
//               <th className="px-8 py-4">Guest</th>
//               <th className="px-8 py-4">Hotel</th>
//               <th className="px-8 py-4">Total Amount</th>
//               <th className="px-8 py-4">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             <BookingRow name="John Doe" hotel="Ocean View Resort" amount="$450" status="Paid" />
//             <BookingRow name="Sarah Miller" hotel="Grand Plaza" amount="$200" status="Unpaid" />
//             <BookingRow name="Mike Ross" hotel="Grand Plaza" amount="$890" status="Paid" />
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// /* --- 2. LIST HOTELS VIEW COMPONENT --- */
// const ListHotelsView = () => {
//   return (
//     <div className="animate-in fade-in duration-500">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-black text-gray-900">Your Properties</h1>
//         <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-bold text-sm">
//           Total: {allHotels.length}
//         </span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {allHotels.map((hotel) => (
//           <div key={hotel.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
//             <div className="h-48 overflow-hidden relative">
//               <img src={hotel.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="" />
//               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-blue-600">
//                 ${hotel.price}/night
//               </div>
//             </div>
//             <div className="p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
//               <p className="text-gray-400 text-sm mb-4">{hotel.city}, {hotel.country}</p>
//               <div className="flex gap-2">
//                 <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl font-bold text-xs hover:bg-gray-200 transition">Edit</button>
//                 <button className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition">Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* --- HELPER COMPONENTS --- */
// const StatCard = ({ title, value, icon, color, bg }) => (
//   <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
//     <div className={`${bg} ${color} p-4 rounded-2xl`}>{icon}</div>
//     <div>
//       <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{title}</p>
//       <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
//     </div>
//   </div>
// );

// const BookingRow = ({ name, hotel, amount, status }) => (
//   <tr className="hover:bg-gray-50 transition">
//     <td className="px-8 py-4 font-bold text-gray-700 text-sm">{name}</td>
//     <td className="px-8 py-4 text-gray-500 text-sm">{hotel}</td>
//     <td className="px-8 py-4 font-black text-gray-900 text-sm">{amount}</td>
//     <td className="px-8 py-4">
//       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
//         {status}
//       </span>
//     </td>
//   </tr>
// );

// export default OwnerDashboard;



// import React, { useState, useEffect } from 'react';
// import { LayoutDashboard, PlusCircle, Hotel, LogOut, TrendingUp, Users, DollarSign } from 'lucide-react';
// import AddHotel from './AddHotel';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import { useClerk } from '@clerk/clerk-react';
// import toast from 'react-hot-toast';

// const OwnerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [dashboardData, setDashboardData] = useState(null);
//   const [ownerRooms, setOwnerRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { signOut } = useClerk();

//   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

//   // FIX 5: Fetch real-time dashboard data
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const token = await window.Clerk.session.getToken();
//       const response = await axios.get(`${backendUrl}/api/bookings/hotel`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setDashboardData(response.data.dashboardData);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FIX 5 & 6: Fetch owner's rooms
//   const fetchOwnerRooms = async () => {
//     try {
//       setLoading(true);
//       const token = await window.Clerk.session.getToken();
//       const response = await axios.get(`${backendUrl}/api/rooms/owner`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setOwnerRooms(response.data.rooms);
//       }
//     } catch (error) {
//       console.error('Error fetching rooms:', error);
//       toast.error('Failed to load rooms');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FIX 6: Handle room availability toggle
//   const handleToggleAvailability = async (roomId) => {
//     try {
//       const token = await window.Clerk.session.getToken();
//       const response = await axios.post(
//         `${backendUrl}/api/rooms/toggle-availability`,
//         { roomId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       if (response.data.success) {
//         toast.success('Room availability updated');
//         fetchOwnerRooms(); // Refresh the list
//       }
//     } catch (error) {
//       console.error('Error toggling availability:', error);
//       toast.error('Failed to update room');
//     }
//   };

//   // FIX 6: Handle room deletion (placeholder - you'll need to add this API endpoint)
//   const handleDeleteRoom = async (roomId) => {
//     if (!confirm('Are you sure you want to delete this room?')) return;
    
//     try {
//       const token = await window.Clerk.session.getToken();
//       // You'll need to create this endpoint in your backend
//       const response = await axios.delete(
//         `${backendUrl}/api/rooms/${roomId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       if (response.data.success) {
//         toast.success('Room deleted successfully');
//         fetchOwnerRooms();
//       }
//     } catch (error) {
//       console.error('Error deleting room:', error);
//       toast.error('Failed to delete room');
//     }
//   };

//   // FIX 5: Auto-refresh data when switching tabs
//   useEffect(() => {
//     if (activeTab === 'dashboard') {
//       fetchDashboardData();
//     } else if (activeTab === 'list-hotels') {
//       fetchOwnerRooms();
//     }
//   }, [activeTab]);

//   const handleLogout = () => {
//     signOut(() => navigate('/'));
//   };

//   return (
//     <div className="flex pt-20 min-h-screen bg-gray-50">
      
//       {/* LEFT PANEL: SIDEBAR */}
//       <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-sm">
//         <div className="fixed w-52 space-y-2">
//           <div className="mb-10 px-4">
//             <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Admin Panel</h2>
//           </div>

//           <button 
//             onClick={() => setActiveTab('dashboard')}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
//           >
//             <LayoutDashboard size={20} /> Dashboard
//           </button>

//           <button 
//             onClick={() => setActiveTab('add-hotel')}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'add-hotel' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
//           >
//             <PlusCircle size={20} /> Add Hotel
//           </button>

//           <button 
//             onClick={() => setActiveTab('list-hotels')}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'list-hotels' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
//           >
//             <Hotel size={20} /> List Hotels
//           </button>

//           <div className="pt-10">
//             <button 
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors"
//             >
//               <LogOut size={20} /> Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT PANEL: CONTENT */}
//       <div className="flex-1 p-10 ml-2">
//         {loading && activeTab !== 'add-hotel' ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <>
//             {activeTab === 'dashboard' && <DashboardOverview data={dashboardData} />}
//             {activeTab === 'add-hotel' && <AddHotel />}
//             {activeTab === 'list-hotels' && (
//               <ListHotelsView 
//                 rooms={ownerRooms} 
//                 onToggle={handleToggleAvailability}
//                 onDelete={handleDeleteRoom}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// /* --- 1. DASHBOARD OVERVIEW COMPONENT --- */
// const DashboardOverview = ({ data }) => {
//   if (!data) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-gray-500">No booking data available yet</p>
//       </div>
//     );
//   }

//   const { totalBookings, totalRevenue, bookings } = data;

//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <h1 className="text-3xl font-black text-gray-900 mb-8">Business Overview</h1>
      
//       {/* FIX 5: Real-time stat cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <StatCard 
//           title="Total Revenue" 
//           value={`$${totalRevenue.toLocaleString()}`} 
//           icon={<DollarSign />} 
//           color="text-green-600" 
//           bg="bg-green-50" 
//         />
//         <StatCard 
//           title="Total Bookings" 
//           value={totalBookings} 
//           icon={<TrendingUp />} 
//           color="text-blue-600" 
//           bg="bg-blue-50" 
//         />
//         <StatCard 
//           title="Active Guests" 
//           value={bookings.filter(b => b.status === 'confirmed').length} 
//           icon={<Users />} 
//           color="text-purple-600" 
//           bg="bg-purple-50" 
//         />
//       </div>

//       {/* FIX 5: Real-time bookings table */}
//       <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//           <h3 className="font-bold text-lg">Recent Bookings</h3>
//         </div>
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
//             <tr>
//               <th className="px-8 py-4">Guest</th>
//               <th className="px-8 py-4">Room Type</th>
//               <th className="px-8 py-4">Check In</th>
//               <th className="px-8 py-4">Total Amount</th>
//               <th className="px-8 py-4">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {bookings.slice(0, 10).map((booking) => (
//               <BookingRow 
//                 key={booking._id}
//                 name={booking.user?.username || 'Guest'}
//                 roomType={booking.room?.roomType || 'N/A'}
//                 checkIn={new Date(booking.checkInDate).toLocaleDateString()}
//                 amount={`$${booking.totalPrice}`}
//                 status={booking.isPaid ? 'Paid' : 'Unpaid'}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// /* --- 2. LIST HOTELS VIEW COMPONENT --- */
// const ListHotelsView = ({ rooms, onToggle, onDelete }) => {
//   if (!rooms || rooms.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-gray-500">No rooms found. Add your first room to get started!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="animate-in fade-in duration-500">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-black text-gray-900">Your Rooms</h1>
//         <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-bold text-sm">
//           Total: {rooms.length}
//         </span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {rooms.map((room) => (
//           <div key={room._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
//             <div className="h-48 overflow-hidden relative">
//               <img 
//                 src={room.images[0] || 'https://via.placeholder.com/400x300'} 
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
//                 alt={room.roomType} 
//               />
//               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-blue-600">
//                 ${room.pricePerNight}/night
//               </div>
//               <div className={`absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-black ${
//                 room.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//               }`}>
//                 {room.isAvailable ? 'Available' : 'Unavailable'}
//               </div>
//             </div>
//             <div className="p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-1">{room.roomType}</h3>
//               <p className="text-gray-400 text-sm mb-4">{room.hotel?.name || 'Your Hotel'}</p>
//               <div className="text-xs text-gray-500 mb-4">
//                 <p>Amenities: {room.amenities.join(', ')}</p>
//               </div>
//               {/* FIX 6: Working buttons */}
//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => onToggle(room._id)}
//                   className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl font-bold text-xs hover:bg-gray-200 transition"
//                 >
//                   {room.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
//                 </button>
//                 <button 
//                   onClick={() => onDelete(room._id)}
//                   className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* --- HELPER COMPONENTS --- */
// const StatCard = ({ title, value, icon, color, bg }) => (
//   <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
//     <div className={`${bg} ${color} p-4 rounded-2xl`}>{icon}</div>
//     <div>
//       <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{title}</p>
//       <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
//     </div>
//   </div>
// );

// const BookingRow = ({ name, roomType, checkIn, amount, status }) => (
//   <tr className="hover:bg-gray-50 transition">
//     <td className="px-8 py-4 font-bold text-gray-700 text-sm">{name}</td>
//     <td className="px-8 py-4 text-gray-500 text-sm">{roomType}</td>
//     <td className="px-8 py-4 text-gray-500 text-sm">{checkIn}</td>
//     <td className="px-8 py-4 font-black text-gray-900 text-sm">{amount}</td>
//     <td className="px-8 py-4">
//       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
//         status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//       }`}>
//         {status}
//       </span>
//     </td>
//   </tr>
// );

// export default OwnerDashboard;



import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, Hotel, LogOut, TrendingUp, Users, DollarSign, Bed } from 'lucide-react';
import AddHotel from './AddHotel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useClerk, useAuth } from '@clerk/react';
import toast from 'react-hot-toast';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [ownerHotel, setOwnerHotel] = useState(null);
  const [ownerRooms, setOwnerRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { getToken } = useAuth();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${backendUrl}/api/bookings/hotel`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setDashboardData(response.data.dashboardData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch owner's hotel
  const fetchOwnerHotel = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${backendUrl}/api/hotels/my-hotel`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setOwnerHotel(response.data.hotel);
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch owner's rooms
  const fetchOwnerRooms = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${backendUrl}/api/rooms/owner`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setOwnerRooms(response.data.rooms);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  // Handle hotel deletion
  const handleDeleteHotel = async () => {
    if (!confirm('Are you sure? This will delete your hotel and all its rooms!')) return;
    
    try {
      const token = await getToken();
      const response = await axios.delete(`${backendUrl}/api/hotels/${ownerHotel._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Hotel deleted successfully');
        setOwnerHotel(null);
        setActiveTab('add-hotel');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast.error('Failed to delete hotel');
    }
  };

  // Handle room availability toggle
  const handleToggleAvailability = async (roomId) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${backendUrl}/api/rooms/toggle-availability`,
        { roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        toast.success('Room availability updated');
        fetchOwnerRooms();
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Failed to update room');
    }
  };

  // Handle room deletion
  const handleDeleteRoom = async (roomId) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    
    try {
      const token = await getToken();
      const response = await axios.delete(
        `${backendUrl}/api/rooms/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        toast.success('Room deleted successfully');
        fetchOwnerRooms();
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Failed to delete room');
    }
  };

  // Auto-refresh data when switching tabs
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    } else if (activeTab === 'my-hotel') {
      fetchOwnerHotel();
    } else if (activeTab === 'my-rooms') {
      fetchOwnerRooms();
    }
  }, [activeTab]);

  const handleLogout = () => {
    signOut(() => navigate('/'));
  };

  return (
    <div className="flex pt-20 min-h-screen bg-gray-50">
      
      {/* LEFT PANEL: SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-sm">
        <div className="fixed w-52 space-y-2">
          <div className="mb-10 px-4">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Admin Panel</h2>
          </div>

          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>

          <button 
            onClick={() => setActiveTab('add-hotel')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'add-hotel' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <PlusCircle size={20} /> Add Hotel
          </button>

          <button 
            onClick={() => setActiveTab('my-hotel')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'my-hotel' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Hotel size={20} /> My Hotel
          </button>

          <button 
            onClick={() => setActiveTab('my-rooms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'my-rooms' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Bed size={20} /> My Rooms
          </button>

          <div className="pt-10">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: CONTENT */}
      <div className="flex-1 p-10 ml-2">
        {loading && activeTab !== 'add-hotel' ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <DashboardOverview data={dashboardData} />}
            {activeTab === 'add-hotel' && <AddHotel onHotelAdded={() => setActiveTab('my-hotel')} />}
            {activeTab === 'my-hotel' && (
              <MyHotelView 
                hotel={ownerHotel} 
                onDelete={handleDeleteHotel}
                onRefresh={fetchOwnerHotel}
              />
            )}
            {activeTab === 'my-rooms' && (
              <MyRoomsView 
                rooms={ownerRooms} 
                onToggle={handleToggleAvailability}
                onDelete={handleDeleteRoom}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* --- 1. DASHBOARD OVERVIEW COMPONENT --- */
const DashboardOverview = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No booking data available yet</p>
      </div>
    );
  }

  const { totalBookings, totalRevenue, bookings } = data;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Business Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={<DollarSign />} 
          color="text-green-600" 
          bg="bg-green-50" 
        />
        <StatCard 
          title="Total Bookings" 
          value={totalBookings} 
          icon={<TrendingUp />} 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <StatCard 
          title="Active Guests" 
          value={bookings.filter(b => b.status === 'confirmed').length} 
          icon={<Users />} 
          color="text-purple-600" 
          bg="bg-purple-50" 
        />
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Recent Bookings</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Guest</th>
              <th className="px-8 py-4">Room Type</th>
              <th className="px-8 py-4">Check In</th>
              <th className="px-8 py-4">Total Amount</th>
              <th className="px-8 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.slice(0, 10).map((booking) => (
              <BookingRow 
                key={booking._id}
                name={booking.user?.username || 'Guest'}
                roomType={booking.room?.roomType || 'N/A'}
                checkIn={new Date(booking.checkInDate).toLocaleDateString()}
                amount={`$${booking.totalPrice}`}
                status={booking.isPaid ? 'Paid' : 'Unpaid'}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- 2. MY HOTEL VIEW COMPONENT --- */
const MyHotelView = ({ hotel, onDelete, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    contact: '',
    city: ''
  });
  const { getToken } = useAuth();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        country: hotel.country,
        contact: hotel.contact,
        city: hotel.city
      });
    }
  }, [hotel]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const response = await axios.put(
        `${backendUrl}/api/hotels/${hotel._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        toast.success('Hotel updated successfully');
        setIsEditing(false);
        onRefresh();
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast.error('Failed to update hotel');
    }
  };

  if (!hotel) {
    return (
      <div className="text-center py-20">
        <Hotel size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Hotel Registered</h2>
        <p className="text-gray-500 mb-6">Register your hotel to start managing rooms and bookings</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">My Hotel</h1>
        <div className="flex gap-3">
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Edit Details
            </button>
          )}
          <button 
            onClick={onDelete}
            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition"
          >
            Delete Hotel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hotel Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contact</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Hotel Name</p>
              <p className="text-xl font-bold text-gray-900">{hotel.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Country</p>
              <p className="text-gray-700">{hotel.country}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">City</p>
                <p className="text-gray-700">{hotel.city}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Contact</p>
                <p className="text-gray-700">{hotel.contact}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Registered On</p>
              <p className="text-gray-700">{new Date(hotel.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- 3. MY ROOMS VIEW COMPONENT --- */
const MyRoomsView = ({ rooms, onToggle, onDelete }) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-20">
        <Bed size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Rooms Added</h2>
        <p className="text-gray-500 mb-6">Add rooms to your hotel to start receiving bookings</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">My Rooms</h1>
        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-bold text-sm">
          Total: {rooms.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={room.images[0] || 'https://via.placeholder.com/400x300'} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                alt={room.roomType} 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-blue-600">
                ${room.pricePerNight}/night
              </div>
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-black ${
                room.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {room.isAvailable ? 'Available' : 'Unavailable'}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{room.roomType}</h3>
              <p className="text-gray-400 text-sm mb-4">{room.hotel?.name || 'Your Hotel'}</p>
              <div className="text-xs text-gray-500 mb-4">
                <p>Amenities: {room.amenities.join(', ')}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onToggle(room._id)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl font-bold text-xs hover:bg-gray-200 transition"
                >
                  {room.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button 
                  onClick={() => onDelete(room._id)}
                  className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */
const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
    <div className={`${bg} ${color} p-4 rounded-2xl`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{title}</p>
      <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
    </div>
  </div>
);

const BookingRow = ({ name, roomType, checkIn, amount, status }) => (
  <tr className="hover:bg-gray-50 transition">
    <td className="px-8 py-4 font-bold text-gray-700 text-sm">{name}</td>
    <td className="px-8 py-4 text-gray-500 text-sm">{roomType}</td>
    <td className="px-8 py-4 text-gray-500 text-sm">{checkIn}</td>
    <td className="px-8 py-4 font-black text-gray-900 text-sm">{amount}</td>
    <td className="px-8 py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
        status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

export default OwnerDashboard;