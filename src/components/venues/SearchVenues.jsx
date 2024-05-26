import React, { useState, useEffect } from 'react';
import { searchVenues } from '../../api/auth/venues';
import { FaSearch } from 'react-icons/fa';
import '../../App.css';

const SearchVenues = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (query === '') {
        onSearchResults([], '');
        return;
      }

      setError(null);

      try {
        const response = await searchVenues(query);
        onSearchResults(response.data, query);
      } catch (error) {
        setError(error.message);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearchResults]);

  return (
    <div className="search-container mb-6 sticky top-0 z-10">
      <form className="flex items-center">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="search-input font-thin text-regular p-4 pl-12 border-none rounded-full"
          />
        </div>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default SearchVenues;
