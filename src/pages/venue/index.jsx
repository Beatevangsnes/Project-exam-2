import React from 'react';
import VenueDetails from '../../components/venues/VenueDetails';

const Venue = () => {
  return (
    <div className='double-gradient min-h-screen flex flex-col justify-start pb-48'>
      <div className="container mx-auto p-4">
        <VenueDetails />
      </div>
    </div>
  );
};

export default Venue;
