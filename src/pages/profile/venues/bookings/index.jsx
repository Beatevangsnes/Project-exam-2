import React from 'react';
import '../../../../App.css'
import VenueBookings from '../../../../components/venues/VenueBookings';



const VenueBookingsPage = () => {
  return (
    <div className='double-gradient min-h-screen flex flex-col justify-start pb-48'>
       <div className="container mx-auto p-4 lg:mt-12">
        <VenueBookings />
    </div>
    </div>
  );
};

export default VenueBookingsPage;
