import React from 'react';
import RecentVenues from '../../components/venues/RecentVenues';
import FeaturedVenues from '../../components/venues/FeaturedVenues';
import Hero from '../../components/layout/Hero'

const Home = () => {
  return (
    <div className='double-gradient min-h-screen flex flex-col justify-start pb-48'>
      <div className="container mx-auto p-4">
        <Hero />
        <FeaturedVenues />
        <RecentVenues />
      </div>
    </div>
  );
};

export default Home;
