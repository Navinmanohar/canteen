import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems } from '../../redux/actions/canteenActions';
import Sidebar from '../sidebar/Sidebar'; // Assuming you have a sidebar for admin navigation

const ViewCanteenItems = () => {
  const dispatch = useDispatch();
  const { allItem, loading, error } = useSelector((state) => state.items); // Fetch the state from Redux store

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    dispatch(fetchAllItems()); // Fetch all items when the component mounts
  }, [dispatch]);

  useEffect(() => {
    setFilteredItems(allItem?.item || []); // Initially set filtered items as all items
  }, [allItem]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDayFilter = (e) => {
    setSelectedDay(e.target.value);
  };

  const handlePriceFilter = (e, type) => {
    setPriceRange({ ...priceRange, [type]: e.target.value });
  };

  const applyFilters = () => {
    let filtered = allItem?.item || [];

    // Filter by name
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by day
    if (selectedDay) {
      filtered = filtered.filter((item) =>
        item.day === selectedDay
      );
    }

    // Filter by price range
    filtered = filtered.filter((item) => 
      item.price >= priceRange.min && item.price <= priceRange.max
    );

    setFilteredItems(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedDay, priceRange, allItem]);

  const apiUrl = process.env.REACT_APP_BASE_URL;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Canteen Items</h2>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          {/* Search by Name */}
          <div className="mb-4 md:mb-0">
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Filter by Day */}
          <div className="mb-4 md:mb-0">
            <select
              className="border border-gray-300 p-2 w-full"
              value={selectedDay}
              onChange={handleDayFilter}
            >
              <option value="">Filter by day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* Filter by Price */}
          <div className="mb-4 md:mb-0">
            <input
              type="number"
              className="border border-gray-300 p-2 w-full"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => handlePriceFilter(e, 'min')}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <input
              type="number"
              className="border border-gray-300 p-2 w-full"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => handlePriceFilter(e, 'max')}
            />
          </div>
        </div>

        {/* Render Filtered Items */}
        {filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300"
              >
                <img
                  src={`${apiUrl}${item.imageUrl}` || '/assets/default-food.jpg'}
                  alt={item.name}
                  className="h-fit z-0 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{item.price}</p>
                  <p className="text-gray-600 mb-1"><strong>Cooking Time:</strong> {item.cookingTime} mins</p>
                  <p className="text-gray-600 mb-4 break-words">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCanteenItems;
