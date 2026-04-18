import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, Hotel, LogOut, TrendingUp, Users, DollarSign } from 'lucide-react';
import AddHotel from './AddHotel'; // Your renamed component
import { allHotels } from '../assets/assets';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
            onClick={() => setActiveTab('list-hotels')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'list-hotels' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Hotel size={20} /> List Hotels
          </button>

          <div className="pt-10">
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors">
               <LogOut size={20} /> Logout
             </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: CONTENT */}
      <div className="flex-1 p-10 ml-2">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'add-hotel' && <AddHotel />}
        {activeTab === 'list-hotels' && <ListHotelsView />}
      </div>
    </div>
  );
};

/* --- 1. DASHBOARD OVERVIEW COMPONENT --- */
const DashboardOverview = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Business Overview</h1>
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Revenue" value="$12,850" icon={<DollarSign />} color="text-green-600" bg="bg-green-50" />
        <StatCard title="Total Bookings" value="48" icon={<TrendingUp />} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Active Guests" value="12" icon={<Users />} color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Recent Bookings</h3>
          <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Guest</th>
              <th className="px-8 py-4">Hotel</th>
              <th className="px-8 py-4">Total Amount</th>
              <th className="px-8 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <BookingRow name="John Doe" hotel="Ocean View Resort" amount="$450" status="Paid" />
            <BookingRow name="Sarah Miller" hotel="Grand Plaza" amount="$200" status="Unpaid" />
            <BookingRow name="Mike Ross" hotel="Grand Plaza" amount="$890" status="Paid" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- 2. LIST HOTELS VIEW COMPONENT --- */
const ListHotelsView = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">Your Properties</h1>
        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-bold text-sm">
          Total: {allHotels.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allHotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
            <div className="h-48 overflow-hidden relative">
              <img src={hotel.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-blue-600">
                ${hotel.price}/night
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{hotel.city}, {hotel.country}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl font-bold text-xs hover:bg-gray-200 transition">Edit</button>
                <button className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition">Delete</button>
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

const BookingRow = ({ name, hotel, amount, status }) => (
  <tr className="hover:bg-gray-50 transition">
    <td className="px-8 py-4 font-bold text-gray-700 text-sm">{name}</td>
    <td className="px-8 py-4 text-gray-500 text-sm">{hotel}</td>
    <td className="px-8 py-4 font-black text-gray-900 text-sm">{amount}</td>
    <td className="px-8 py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {status}
      </span>
    </td>
  </tr>
);

export default OwnerDashboard;