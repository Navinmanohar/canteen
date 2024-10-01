import React, { useState, useEffect } from 'react';
import adminDeskImg from './path-to-images/admin_desk.png'; // Replace with the correct path
import reportImg from './path-to-images/report.png'; // Replace with the correct path
import statsImg from './path-to-images/stats.png'; // Replace with the correct path

const adminImages = [adminDeskImg, reportImg, statsImg]; // Array of images

const AdminLoading = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % adminImages.length);
    }, 1500); // Change every 1.5 seconds for a calmer effect

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <img src={adminImages[currentImage]} alt="Admin Loading..." className="h-56 w-56 object-cover mb-4" />
      <p className="text-2xl font-semibold text-gray-700">Loading Admin Dashboard...</p>
    </div>
  );
};

export default AdminLoading;
