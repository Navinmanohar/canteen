import React, { useState, useEffect } from 'react';
import foodTruckImg from './path-to-images/food_truck.png'; // Replace with the correct path
import kitchenImg from './path-to-images/kitchen.png'; // Replace with the correct path
import chefImg from './path-to-images/chef.png'; // Replace with the correct path

const canteenImages = [foodTruckImg, kitchenImg, chefImg]; // Array of images

const CanteenAdminLoading = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % canteenImages.length);
    }, 1200); // Change every 1.2 seconds for a more dynamic effect

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-100">
      <img src={canteenImages[currentImage]} alt="Canteen Admin Loading..." className="h-56 w-56 object-cover mb-4" />
      <p className="text-2xl font-semibold text-yellow-700">Preparing your Canteen Dashboard...</p>
    </div>
  );
};

export default CanteenAdminLoading;
