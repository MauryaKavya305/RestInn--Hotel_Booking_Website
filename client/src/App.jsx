import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Make sure this path is correct
import Home from './pages/Home';
import AllHotels from './pages/AllHotels';
// import Hotels from './pages/Hotels';
// import Experience from './pages/Experience';
// import About from './pages/About';

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

        {/* <Route path="/hotels" element={ <Hotels /> } />
        <Route path="/experience" element={ <Experience /> } />
        <Route path="/about" element={ <About /> } /> */}


      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;