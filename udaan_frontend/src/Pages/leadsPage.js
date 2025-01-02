import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_BASE_URL } from '../constants';
import { Button } from 'react-bootstrap';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`${REACT_APP_API_BASE_URL}/api/leads`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }

        const data = await response.json();
        setLeads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="p-6 flex justify-center items-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Call Frequency (days)</th>
            <th className="p-4 border-b">Last Call Date</th>
            <th className="p-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b">
              <td className="p-4">{lead.id}</td>
              <td className="p-4">{lead.status}</td>
              <td className="p-4">{lead.callFrequency}</td>
              <td className="p-4">{formatDate(lead.lastCallDate)}</td>
              <td className="p-4">{formatDate(lead.createdAt)}</td>
              <td className="p-4">
                {/* <Button
                  onClick={() => navigate(`/interactions/${lead.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  View Interactions
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsPage;
