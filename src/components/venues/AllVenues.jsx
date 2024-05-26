import React, { useEffect, useState } from 'react';
import { getVenues } from '../../api/auth/venues';
import { Link } from 'react-router-dom';
import { IconBed, IconCurrencyDollar } from '@tabler/icons-react';
import { MapPinIcon, StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import defaultImage from '../../assets/default-image.png';

const AllVenues = ({ searchResults, query }) => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await getVenues();
        setVenues(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayVenues = query ? searchResults : venues;

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      stars.push(
        i < filledStars ? (
          <StarIconSolid key={i} className="h-4 w-4 mr-1 flex-shrink-0 text-black" />
        ) : (
          <StarIconOutline key={i} className="h-4 w-4 mr-1 flex-shrink-0 text-gray-400" />
        )
      );
    }

    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-light mb-6">All Venues</h2>
      {displayVenues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayVenues.map((venue) => (
            <Link
              key={venue.id}
              to={`/venue/${venue.id}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs mx-auto sm:mx-0 hover:shadow-xl transition duration-400 ease-in-out"
            >
              <img
                src={venue.media?.[0]?.url || defaultImage}
                alt={venue.media?.[0]?.alt || 'Venue image'}
                className="w-full h-48 object-cover"
                onError={(e) => e.target.src = defaultImage}
              />
              <div className="p-4">
                <h3 className="text-medium font-normal mb-2 truncate">{venue.name}</h3>
                <p className="text-gray-900 font-thin flex mb-2 truncate items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{venue.location?.city || 'Unknown'}, {venue.location?.country || 'Unknown'}</span>
                </p>
                <p className="text-gray-900 font-thin flex items-center mb-2 truncate">
                  <IconBed className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate"> {venue.maxGuests} Guests</span>
                </p>
                <p className="text-md font-normal flex items-center mb-4 truncate">
                  <IconCurrencyDollar className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{venue.price} / night</span>
                </p>
                {venue.rating > 0 && (
                  <div className="flex items-center mt-4">
                    {renderStars(venue.rating)}
                    <p className="text-sm ml-2">{venue.rating}</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        query && <p className="text-center text-lg mt-6">No search results found</p>
      )}
    </div>
  );
};

export default AllVenues;
