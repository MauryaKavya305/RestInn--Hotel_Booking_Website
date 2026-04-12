// import React from 'react';
// import Hero from '../components/HeroSection';
// import FeaturedHotels from '../components/FeaturedHotels';
// import Offers from '../components/Offers';
// import Experiences from '../components/Experience';
// import Footer from '../components/Footer';

// const Home = () => {
//   return (
//     <div className="font-sans text-gray-900">
//       <Hero />
//       <FeaturedHotels />
//       <Offers />
//       <Experiences />
//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import Hero from '../components/HeroSection';
import FeaturedHotels from '../components/FeaturedHotels';
import Offers from '../components/Offers';
import Experiences from '../components/Experience';
// import Footer from '../components/Footer';

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

      {/* You can add an ID here for About if it's in your footer or a separate component */}
      {/* <section id="about">
        <Footer /> 
      </section> */}
    </div>
  );
};

export default Home;