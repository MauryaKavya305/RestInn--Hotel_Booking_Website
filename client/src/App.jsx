import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Make sure this path is correct
import Home from './pages/Home';
import AllHotels from './pages/AllHotels';
import RoomDetails from './pages/RoomDetails';
import Footer from './components/Footer';
import MyBookings from './pages/MyBookings';
import { ClerkProvider } from '@clerk/react';

// 2. Get your Publishable Key from your .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create a wrapper to handle the conditional Navbar/Home rendering
const AppContent = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");

  return (
    <div className="App">
      {/* 1. Render Navbar only if not in owner path */}
      {!isOwnerPath && <Navbar />}

      <Routes>
        {/* 2. Home only renders once here */}
        <Route path="/" element={ <Home /> } />
        <Route path="/all-hotels" element={<AllHotels />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />

      </Routes>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <AppContent />
      </Router>
    </ClerkProvider>
    // <Router>
    //   <AppContent />
    // </Router>
  );
}

export default App;