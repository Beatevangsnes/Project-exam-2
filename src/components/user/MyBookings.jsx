import React, { useEffect, useState } from 'react';
import { getBookingsByProfile, deleteBooking } from '../../api/auth/bookings';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../api/utils/date';
import { createApiKey } from '../../api/auth/apiKey';
import defaultImage from '../../assets/default-image.png'; 

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const username = localStorage.getItem('username');
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      const response = await getBookingsByProfile(username, apiKey);
      setBookings(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleViewVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      await deleteBooking(bookingId, apiKey);
      await fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const filterBookings = (bookings, type) => {
    const now = new Date();
    if (type === 'upcoming') {
      return bookings.filter((booking) => new Date(booking.dateTo) >= now);
    } else {
      return bookings.filter((booking) => new Date(booking.dateTo) < now);
    }
  };

  const upcomingBookings = filterBookings(bookings, 'upcoming');
  const expiredBookings = filterBookings(bookings, 'expired');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-md mt-12">
      <h2 className="text-xl font-semibold mb-6">My Bookings</h2>
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-4 rounded-md ${activeTab === 'upcoming' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-indigo-600'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Bookings
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'expired' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-indigo-600'}`}
          onClick={() => setActiveTab('expired')}
        >
          Expired Bookings
        </button>
      </div>
      {activeTab === 'upcoming' && (
        <div>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <div key={booking.id} className="mb-6 p-4 bg-white rounded-md shadow-md">
                <div className="flex items-center">
                  {booking.venue && booking.venue.media && booking.venue.media.length > 0 ? (
                    <img
                      src={booking.venue.media[0].url}
                      alt={booking.venue.media[0].alt || 'Booking image'}
                      className="w-32 h-32 rounded-md mr-4"
                      onError={(e) => e.target.src = defaultImage} 
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      alt="Default Image"
                      className="w-32 h-32 rounded-md mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{booking.venue ? booking.venue.name : 'Unknown Venue'}</h3>
                    <p className='text-sm'><b>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</b></p>
                    <p className='text-sm'>Nights: {Math.ceil((new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24))} </p>
                    <p className='text-sm'>Guests: {booking.guests}</p>
                    {booking.venue && booking.venue.price ? (
                      <>
                        <p className='text-sm'>Price/ night: $ {booking.venue.price}</p>
                        <p className='text-sm'>Total: $ {booking.venue.price * Math.ceil((new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24))}</p>
                      </>
                    ) : (
                      <p>Price information not available</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button onClick={() => handleViewVenue(booking.venue.id)} className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md shadow-md hover:bg-zinc-100">View Venue</button>
                  <button onClick={() => handleDeleteBooking(booking.id)} className="bg-indigo-100 text-red-500 px-2 py-1 rounded-md shadow-md hover:bg-zinc-100">Delete Booking</button>
                </div>
              </div>
            ))
          ) : (
            <div>You have no upcoming bookings.</div>
          )}
        </div>
      )}
      {activeTab === 'expired' && (
        <div>
          {expiredBookings.length > 0 ? (
            expiredBookings.map((booking) => (
              <div key={booking.id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                  {booking.venue && booking.venue.media && booking.venue.media.length > 0 ? (
                    <img
                      src={booking.venue.media[0].url}
                      alt={booking.venue.media[0].alt || 'Booking image'}
                      className="w-32 h-32 rounded-lg mr-4"
                      onError={(e) => e.target.src = defaultImage}
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      alt="Default Image"
                      className="w-32 h-32 rounded-lg mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{booking.venue ? booking.venue.name : 'Unknown Venue'}</h3>
                    <p className='text-sm'><b>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</b></p>
                    <p className='text-sm'>Nights: {Math.ceil((new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24))}</p>
                    <p className='text-sm'>Guests: {booking.guests}</p>
                    {booking.venue && booking.venue.price ? (
                      <>
                        <p className='text-sm'>Price/ night: ${booking.venue.price}</p>
                        <p className='text-sm'>Total Price: ${booking.venue.price * Math.ceil((new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24))}</p>
                      </>
                    ) : (
                      <p>Price information not available</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button onClick={() => handleViewVenue(booking.venue.id)} className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md hover:bg-zinc-100">View Venue</button>
                  <button onClick={() => handleDeleteBooking(booking.id)} className="bg-indigo-100 text-red-500 px-2 py-1 rounded-md hover:bg-zinc-100">Delete Booking</button>
                </div>
              </div>
            ))
          ) : (
            <div>You have no expired bookings.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
