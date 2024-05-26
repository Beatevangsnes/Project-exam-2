import React from 'react';
import '../../App.css'
import MyBookings from '../../components/user/MyBookings';


const BookingsPage = () => {
  return (
    <div className='double-gradient min-h-screen flex flex-col justify-start pb-48'>
       <div className="container mx-auto p-4 lg:mt-12">
        <MyBookings />
    </div>
    </div>
  );
};

export default BookingsPage;
