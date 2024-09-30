import React, { useState } from 'react';

const DaysFilter = ({ items, onFilter }) => {
  const daysOfWeek = ['All','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [selectedDay, setSelectedDay] = useState('');

  const handleDayClick = (day) => {
    if(day==="All")
    {
      onFilter(items)
      setSelectedDay(day)
      return;
    }
    setSelectedDay(day);
    const filteredItems = items.filter(item => item.availableDays.includes(day));
    onFilter(filteredItems); // Pass the filtered items back to the parent component
  };

  return (
    <div className="flex justify-center space-x-4 my-4">
      {daysOfWeek.map((day) => (
        <button
          key={day}
          onClick={() => handleDayClick(day)}
          className={`px-4 py-2 rounded ${selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaysFilter;
