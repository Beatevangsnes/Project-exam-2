import React, { useState } from 'react';
import AllVenues from '../../components/venues/AllVenues';
import SearchVenues from '../../components/venues/SearchVenues';
import '../../App.css';

const Venues = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearchResults = (results, searchQuery) => {
    setSearchResults(results);
    setQuery(searchQuery);
  };

  return (
    <div className="double-gradient min-h-screen flex flex-col justify-start pb-48">
      <div className="sticky top-0 z-10 p-4">
        <SearchVenues onSearchResults={handleSearchResults} />
      </div>
      <div className="container mx-auto p-4 flex-grow">
        <AllVenues searchResults={searchResults} query={query} />
      </div>
    </div>
  );
};

export default Venues;
