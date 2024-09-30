import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CanteenItem from '../../components/CanteenItem/CanteenItem';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar'; // Import Sidebar
import DaysFilter from '../../components/SearchBar/DaysFilter';

import { fetchAllItemsUser } from '../../redux/actions/userActions';

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { allItem, loading, error } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  // State to store filtered items based on search and day filters
  const [filteredItems, setFilteredItems] = useState([]);
  
  // Fetch all items when the component mounts
  useEffect(() => {
    dispatch(fetchAllItemsUser());
  },[dispatch]); 
  // console.log(allItem,"from home") 

  // Set filteredItems to allItem initially when allItem is fetched from backend
  useEffect(() => {
    if (allItem?.item) {
      setFilteredItems(allItem.item); // Assuming allItem.item is an array of items
    }
  }, [allItem]);

  // Handle search functionality
  const handleSearch = (query) => {
    if (!query) {
      setFilteredItems(allItem.item); // Reset to all items when search is cleared
      return;
    }

    const filtered = allItem?.item?.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Handle day filter functionality (if needed)
  const handleDayFilter = (items) => {
    setFilteredItems(items);
  };

  return (
    <div className="flex min-h-screen">
      {/* Show Sidebar only for Super Admin and Canteen Admin */}
      {userInfo?.userData?.user.isCanteenAdmin ? (
        <div className="w-64 h-screen bg-gray-800">
          <Sidebar />
        </div>
      ) : null}

      {/* Main content should be next to the sidebar */}
      <div className="flex-1 ml-1">
        <div className="bg-black text-white p-8">
          <video src="/assets/food-process-video.mp4" autoPlay loop muted className="w-full h-64 object-cover"></video>
        </div>
        <div className="container mx-auto py-8">
          {/* Day filter and search bar */}
          <DaysFilter items={allItem?.item} onFilter={handleDayFilter} />
          <SearchBar onSearch={handleSearch} />

          {/* Display filtered items */}
          {loading ? (
            <p>Loading items...</p>
          ) : error ? (
            <p>Error loading items</p>
          ) : filteredItems?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredItems.map((item) => (
                <CanteenItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
