import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingsByVenueId } from '../../api/auth/bookings';
import { getVenueById } from '../../api/auth/venues';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import '../../App.css';

const VenueBookings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [venueName, setVenueName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    const fetchVenueAndBookings = async () => {
      try {
        const venueResponse = await getVenueById(id);
        setVenueName(venueResponse.data.name);

        const bookingsResponse = await getBookingsByVenueId(id, { _customer: true, _venue: true });
        if (Array.isArray(bookingsResponse.data.bookings)) {
          setBookings(bookingsResponse.data.bookings);
        } else {
          setBookings([]); 
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchVenueAndBookings();
  }, [id]);

  const filterBookings = (bookings, type) => {
    const now = new Date();
    if (type === 'current') {
      return bookings.filter((booking) => new Date(booking.dateTo) >= now);
    } else {
      return bookings.filter((booking) => new Date(booking.dateTo) < now);
    }
  };

  const currentBookings = filterBookings(bookings, 'current');
  const expiredBookings = filterBookings(bookings, 'expired');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12">
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <ArrowLeftIcon className="h-5 w-5 text-gray-900 mr-2 cursor-pointer" onClick={() => navigate('/profile')} />
          <span className="text-gray-900 cursor-pointer font-thin" onClick={() => navigate('/profile')}>Back to Profile</span>
        </div>
        <h2 className="text-center text-xl font-medium mb-4">{venueName} Bookings</h2>
        <div className="flex mb-4">
          <button
            className={`text-lg font-regular px-4 py-2 ${activeTab === 'current' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-900'}`}
            onClick={() => setActiveTab('current')}
          >
            Current Bookings
          </button>
          <button
            className={`text-lg font-regular px-4 py-2 ml-4 ${activeTab === 'expired' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-900'}`}
            onClick={() => setActiveTab('expired')}
          >
            Expired Bookings
          </button>
        </div>
        <div className="bg-white rounded-md p-4">
          {activeTab === 'current' && (
            <div>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <div key={booking.id} className="mb-4 p-4 border rounded-md flex items-center">
                    <img 
                      src={booking.customer.avatar?.url} 
                      alt={booking.customer.avatar?.alt || 'Customer Avatar'} 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className='text-md font-light'>
                      <p><b>{new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()}</b> </p>
                      <p><b>Guests:</b> {booking.guests}</p>
                      <p><b>Customer:</b> {booking.customer.name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='font-light text-lg'>You have 0 current bookings</p>
              )}
            </div>
          )}
          {activeTab === 'expired' && (
            <div>
              {expiredBookings.length > 0 ? (
                expiredBookings.map((booking) => (
                  <div key={booking.id} className="mb-4 p-4 border rounded-md flex items-center">
                    <img 
                      src={booking.customer.avatar?.url} 
                      alt={booking.customer.avatar?.alt || 'Customer Avatar'} 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className='text-md font-light'>
                      <p><b>From: {new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()}</b></p>
                      <p><b>Guests:</b> {booking.guests}</p>
                      <p><b>Customer:</b> {booking.customer.name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='font-light text-lg'>You have 0 expired bookings</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueBookings;
