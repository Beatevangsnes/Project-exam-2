import React, { useEffect, useState } from 'react';
import { getVenuesByProfile, deleteVenue } from '../../api/auth/venues';
import { useNavigate } from 'react-router-dom';
import { createApiKey } from '../../api/auth/apiKey';
import AddVenueModal from '../venues/AddVenueModal'; 
import defaultImage from '../../assets/default-image.png'; 

const MyVenues = () => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchVenues = async () => {
    try {
      const username = localStorage.getItem('username');
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      const response = await getVenuesByProfile(username, apiKey);
      setVenues(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleViewVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const handleViewBookings = (e, venueId) => {
    e.stopPropagation();
    navigate(`/venue/${venueId}/bookings`);
  };

  const handleDeleteVenue = async (e, venueId) => {
    e.stopPropagation();
    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      await deleteVenue(venueId, apiKey);
      fetchVenues(); 
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  const handleAddVenue = () => {
    setIsModalOpen(true);
  };

  const handleVenueAdded = (newVenue) => {
    setVenues([...venues, newVenue]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-md mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Venues</h2>
        <button onClick={handleAddVenue} className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md hover:bg-zinc-100">
          + Add Venue
        </button>
      </div>
      {venues.length > 0 ? (
        venues.map((venue) => (
          <div key={venue.id} onClick={() => handleViewVenue(venue.id)} className="cursor-pointer block mb-6 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <img 
                src={venue.media[0]?.url || defaultImage} 
                alt={venue.media[0]?.alt || 'Default Image'} 
                className="w-32 h-32 rounded-md mr-4" 
                onError={(e) => e.target.src = defaultImage} 
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">{venue.name}</h3>
                <p className='text-sm'><b>Created:</b> {new Date(venue.created).toLocaleDateString()}</p>
                <p className='text-sm'><b>Updated:</b> {new Date(venue.updated).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button onClick={(e) => handleViewBookings(e, venue.id)} className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md shadow-md hover:bg-zinc-100">View Bookings</button>
              <button onClick={(e) => handleDeleteVenue(e, venue.id)} className="bg-indigo-100 text-red-500 px-2 py-1 rounded-md shadow-md hover:bg-zinc-100">Delete Venue</button>
            </div>
          </div>
        ))
      ) : (
        <div>You have no venues.</div>
      )}
      <AddVenueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onVenueAdded={handleVenueAdded} />
    </div>
  );
};

export default MyVenues;
