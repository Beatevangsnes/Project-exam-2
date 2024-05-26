import React from 'react';
import '../../../App.css';
import AddVenue from '../../../components/venues/AddVenue';

const AddVenuePage = () => {
  const handleVenueAdded = (newVenue) => {
    console.log('Venue added:', newVenue);
  };

  return (
    <div className='double-gradient min-h-screen flex flex-col justify-start pb-48'>
      <div className="container mx-auto p-4 lg:mt-12">
        <AddVenue onVenueAdded={handleVenueAdded} />
      </div>
    </div>
  );
};

export default AddVenuePage;
