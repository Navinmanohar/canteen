import React, { useState, useEffect } from 'react';
import loading from "../../assets/plate.png"
import loading1 from "../../assets/plate1.png"
import loading2 from "../../assets/plate2.png"
import loading3 from "../../assets/plate3.png"
import loading4 from "../../assets/plate4.png"
import loading5 from "../../assets/plate7.png"

// Loading Component
const LoadingComponent = () => {
  const images = [
    loading,
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    // Add more images as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // Change the image every 1 second

    return () => {
      clearInterval(intervalId); // Clean up interval on component unmount
    };
  }, [images.length]);

  return (
    <div className="flex justify-center items-center h-screen  bg-white">
      <img
        src={images[currentImageIndex]}
        alt="Loading..."
        className="w-32 h-32 object-cover"
      />
    </div>
  );
};

export default LoadingComponent;
