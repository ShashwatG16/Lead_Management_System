import React, { useEffect, useState } from 'react';
import { REACT_APP_API_BASE_URL } from '../constants';

const InteractionsPage = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingInteractions, setLoadingInteractions] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all leads
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
        setLoadingLeads(false);
      }
    };

    fetchLeads();
  }, []);

  const fetchInteractions = async (leadId) => {
    setLoadingInteractions(true);
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/leads/${leadId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch interactions');
      }

      const data = await response.json();
      console.log(data)
      setInteractions(data.interactions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingInteractions(false);
    }
  };

  const handleLeadSelection = (lead) => {
    setSelectedLead(lead);
    fetchInteractions(lead.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loadingLeads) {
    return <div className="p-6 flex justify-center items-center text-gray-500">Loading leads...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Interactions</h1>

      {/* Leads Dropdown */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Select a Lead:</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={selectedLead?.id || ''}
          onChange={(e) => {
            const lead = leads.find((lead) => lead.id === parseInt(e.target.value, 10));
            handleLeadSelection(lead);
          }}
        >
          <option value="" disabled>
            -- Select Lead --
          </option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              Lead #{lead.id} - {lead.status}
            </option>
          ))}
        </select>
      </div>

      {/* Interactions Table */}
      {loadingInteractions ? (
        <div className="p-6 text-gray-500">Loading interactions...</div>
      ) : selectedLead ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Interactions for Lead ID: {selectedLead.id}</h2>
          {interactions.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="p-4 border-b">ID</th>
                  <th className="p-4 border-b">Type</th>
                  <th className="p-4 border-b">Details</th>
                  <th className="p-4 border-b">Date</th>
                  <th className="p-4 border-b">Created At</th>
                </tr>
              </thead>
              <tbody>
                {interactions.map((interaction) => (
                  <tr key={interaction.id} className="border-b">
                    <td className="p-4">{interaction.id}</td>
                    <td className="p-4">{interaction.type}</td>
                    <td className="p-4">{interaction.details}</td>
                    <td className="p-4">{formatDate(interaction.date)}</td>
                    <td className="p-4">{formatDate(interaction.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No interactions found for this lead.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Please select a lead to view interactions.</p>
      )}
    </div>
  );
};

export default InteractionsPage;
