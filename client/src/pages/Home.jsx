import React from 'react';
import Hero from '../components/HeroSection';
import FeaturedHotels from '../components/FeaturedHotels';
import Offers from '../components/Offers';
import Experiences from '../components/Experience';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="font-sans text-gray-900">
      <Hero />
      <FeaturedHotels />
      <Offers />
      <Experiences />
      <Footer />
    </div>
  );
};

export default Home;