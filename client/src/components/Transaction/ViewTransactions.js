import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewTransactions } from '../../redux/actions/canteenActions'; // Import the action
import Sidebar from '../sidebar/Sidebar'; // Assuming you want to keep a sidebar for admin navigation

const ViewTransactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.items); // Assuming your reducer is named 'payments'
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(viewTransactions()); // Fetch all transactions when the component mounts
    setTotal(transactions?.transactions?.reduce((total, transaction) => {
      return total + transaction.amount / 100; // Assuming amount is in cents, divide by 100
    }, 0));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      
      {/* Main content with proper width and margin */}
      <div className="flex-1 p-8">
        <div className="container ml-auto mr-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">View Transactions</h2>
            <p className="text-gray-600 font-bold">Total Order: {transactions?.transactions?.length}</p>
            <p className="text-gray-600 font-bold">Total Amount: ₹{total}</p>
          </div>

          {transactions?.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            <div className="space-y-2">
              {transactions?.transactions.map((transaction) => (
                <div key={transaction._id} className="bg-white shadow-md rounded-lg p-6">
                  <div className="mb-2 flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Transaction ID: {transaction._id}</h3>
                      <p className="text-gray-600">Order ID: {transaction.order_id}</p>
                      <p className="text-gray-600">Payment ID: {transaction.payment_id}</p>
                      <p className="text-gray-600">Amount: ₹{transaction.amount / 100} {transaction.currency}</p>
                      <p className="text-gray-600">Status: {transaction.status}</p>
                      {transaction.status === 'refunded' && (
                        <p className="text-red-600">Refund Reason: {transaction.refundDetails?.reason}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">Date: {new Date(transaction.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold"></h4>
                    {transaction?.items.map((item) => (
                      <div key={item._id} className="flex justify-between bg-gray-100 p-3 rounded-lg">
                        <div>
                          <p className="font-medium">Item ID: {item.itemId}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTransactions;
