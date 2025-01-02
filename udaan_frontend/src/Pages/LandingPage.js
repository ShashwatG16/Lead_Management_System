import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { REACT_APP_API_BASE_URL } from '../constants';

const LandingPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`${apiBaseUrl}/api/restaurants`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/restaurant/${id}`);
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg font-medium">Loading restaurants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md">
          <p className="text-lg font-bold mb-2">Error loading restaurants</p>
          <p>{error}</p>
          <p className="text-sm mt-2">Please check your authentication status and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Restaurants</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Avg Order Value</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order Frequency</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Performance Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{restaurant.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{restaurant.address}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      restaurant.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {restaurant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  ₹{restaurant.performance.averageOrderValue}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {restaurant.performance.orderFrequency}/month
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {restaurant.performance.performanceScore}%
                </td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => handleViewDetails(restaurant.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandingPage;
