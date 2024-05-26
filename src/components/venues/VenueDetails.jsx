import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getVenueById } from '../../api/auth/venues';
import { IconBed, IconCurrencyDollar } from '@tabler/icons-react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import BookingForm from '../forms/BookingForm';
import '../../App.css';
import AuthContext from '../../api/context/AuthContext';
import ImageCarousel from './ImageCarousel';
import VenueImageModal from './VenueImageModal';
import UpdateVenueModal from './UpdateVenueModal';
import defaultImage from '../../assets/default-image.png'; 
import defaultAvatar from '../../assets/default-image.png'; 

const VenueDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const fetchVenue = async () => {
    try {
      const response = await getVenueById(id, { _owner: true });
      const fetchedVenue = response.data;
      setVenue(fetchedVenue);
      setIsOwner(user && user.profile?.email === fetchedVenue.owner?.email);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, [id]);

  const handleVenueUpdate = (updatedVenue) => {
    setVenue(updatedVenue);
    setIsUpdateModalOpen(false);
  };

  const handleVenueDelete = () => {
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="venue-details-container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-thin mb-6">{venue.name}</h2>
      {venue.media && venue.media.length > 0 ? (
        <ImageCarousel images={venue.media} />
      ) : (
        <img
          src={defaultImage}
          alt="Default venue"
          className="venue-image mb-6 rounded-md"
          onError={(e) => e.target.src = defaultImage} 
        />
      )}
      <div className="flex justify-between items-start mb-6 mt-8">
        {isOwner && (
          <button
            className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md flex items-center hover:bg-zinc-100"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            Update Venue
          </button>
        )}
        <button
          className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md flex items-center hover:bg-zinc-100"
          onClick={() => setIsGalleryModalOpen(true)}
        >
          <PhotoIcon className="h-5 w-5 mr-2" />
          Open gallery
        </button>
      </div>
      <div className="venue-details-grid">
        <div className="venue-details-left">
          <h3 className="text-xl font-normal mb-4">Description</h3>
          <p className="mb-6 font-light text-md">{venue.description}</p>

          <h3 className="text-xl font-normal mb-2">Address</h3>
          <p className="text-md font-light">
            {venue.location?.address}<br />
            {venue.location?.city}, {venue.location?.zip} {venue.location?.country}
          </p>
        </div>
        <div className="venue-details-right">
          <h3 className="text-xl font-normal mb-4">Information</h3>
          <p className="text-gray-900 font-light text-md mb-2"><IconCurrencyDollar className="inline-block h-5 w-5 mr-1" />{venue.price} / night</p>
          <p className="text-gray-900 font-light text-md mb-2"><IconBed className="inline-block h-5 w-5 mr-1" />{venue.maxGuests} guests</p>
          <p className="text-gray-900 font-light text-md mb-4">Created: {new Date(venue.created).toLocaleDateString()}</p>

          <h3 className="text-xl font-normal mb-4">Facilities</h3>
          <div className="flex flex-wrap">
            {venue.meta?.breakfast && <p className="text-gray-900 font-light mr-4 mb-2">🍳 Breakfast</p>}
            {venue.meta?.parking && <p className="text-gray-900 font-light mr-4 mb-2">🚗 Parking</p>}
            {venue.meta?.pets && <p className="text-gray-900 font-light mr-4 mb-2">🐶 Pets</p>}
            {venue.meta?.wifi && <p className="text-gray-900 font-light mr-4 mb-2">📡 WiFi</p>}
          </div>

          <h3 className="text-xl font-normal mb-4 mt-2">Host</h3>
          {venue.owner ? (
            <div className="flex items-center mb-6">
              <img
                src={venue.owner.avatar?.url || defaultAvatar}
                alt={venue.owner.avatar?.alt || 'Owner avatar'}
                className="h-10 w-10 rounded-full mr-4"
                onError={(e) => e.target.src = defaultAvatar}
              />
              <p className='font-normal'>{venue.owner.name}</p>
            </div>
          ) : (
            <p>No owner information available.</p>
          )}
        </div>
      </div>

      <BookingForm price={venue.price} venueId={venue.id} maxGuests={venue.maxGuests} />

      <VenueImageModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} images={venue.media} />
      {venue && (
        <UpdateVenueModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          venueData={venue}
          onVenueUpdated={handleVenueUpdate}
          onVenueDeleted={handleVenueDelete}
        />
      )}
    </div>
  );
};

export default VenueDetails;
