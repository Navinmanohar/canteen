import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Import search icon from react-icons

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query);  // Call the parent component's search function
  };

  return (
    <div className="flex justify-center items-center my-4">  {/* Center the container */}
      <div className="relative w-1/3">  {/* Width is adjustable */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 w-full rounded pl-10" // Full width input with padding for the icon
          placeholder="Search for canteen items..."
        />
        {/* Search Icon */}
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
