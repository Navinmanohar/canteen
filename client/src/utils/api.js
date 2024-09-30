const API_URL = 'http://localhost:5000/api';

// Get all canteen items
export const fetchCanteenItems = async () => {
  const { data } = await axios.get(`${API_URL}/items`);
  return data;
};

// Get user profile
export const fetchUserProfile = async (token) => {
  const { data } = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Fetch order history for a user
export const fetchOrderHistory = async (userId) => {
  const { data } = await axios.get(`${API_URL}/orders/history/${userId}`);
  return data;
};

// Apply for Admin
export const applyForAdmin = async (token) => {
  const { data } = await axios.post(
    `${API_URL}/apply-admin`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};