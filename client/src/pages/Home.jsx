import React from 'react';
import Hero from '../components/HeroSection';
import FeaturedHotels from '../components/FeaturedHotels';
import Offers from '../components/Offers';
import Experiences from '../components/Experience';

const Home = () => {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>
      
      <section id="hotels">
        <FeaturedHotels />
      </section>

      <section id="offers">
        <Offers />
      </section>

      <section id="experience">
        <Experiences />
      </section>
    </div>
  );
};

export default Home;