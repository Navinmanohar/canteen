import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCanteenAnalytics } from '../../redux/actions/canteenAnalyticsActions';
import Sidebar from '../sidebar/Sidebar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);



const ViewAnalytics = () => {
  const dispatch = useDispatch();
  const { analyticsData, loading, error } = useSelector((state) => state.analytics);
  const [chartData, setChartData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    dispatch(fetchCanteenAnalytics());
  }, [dispatch]);

  useEffect(() => {
    if (analyticsData) {
      const salesByDay = analyticsData?.salesByDay || {};
      const labels = Object.keys(salesByDay);
      const data = Object.values(salesByDay);

      const orderStatus = analyticsData?.orderStatusBreakdown || {};
      const pieLabels = Object.keys(orderStatus);
      const pieValues = Object.values(orderStatus);

      // Only set the chart data if the data is valid and not empty
      if (labels.length && data.length) {
        setChartData({
          labels,
          datasets: [
            {
              label: 'Sales by Day (₹)',
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              data,
            },
          ],
        });
      }

      if (pieLabels.length && pieValues.length) {
        setPieData({
          labels: pieLabels,
          datasets: [
            {
              label: 'Order Status Breakdown',
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              data: pieValues,
            },
          ],
        });
      }
    }
  }, [analyticsData]);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 p-4 lg:p-8 ml-64">
      <h2 className="text-3xl font-bold mb-6">Admin Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Total Sales</h3>
          <p className="text-3xl">₹{analyticsData?.totalSales}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl">{analyticsData?.totalOrders}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Top-Selling Item</h3>
          <p className="text-lg">Count: {analyticsData?.topSellingItem?.totalQuantitySold}</p>
          <p className="text-lg">Name: {analyticsData?.topSellingItem?.itemName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {chartData && (
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Sales by Day</h3>
            <div className="h-64">
              <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        )}

        {pieData && (
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Order Status Breakdown</h3>
            <div className="h-64">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData?.recentOrders?.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">₹{order.totalPrice}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default ViewAnalytics;
