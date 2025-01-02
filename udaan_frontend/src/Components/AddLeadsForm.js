import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { REACT_APP_API_BASE_URL } from '../constants';

const AddLeadForm = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [contacts, setContacts] = useState([]);

  const [leadData, setLeadData] = useState({
    status: 'New',
    callFrequency: '7',
    lastCallDate: '',
    interactions: [{
      type: 'Call',
      details: '',
      date: new Date().toISOString().split('T')[0]
    }]
  });

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No authentication token found');
      }
      console.log('Auth Token:', authToken);
  
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/restaurants`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response Status:', response.status);
  
      if (!response.ok) {
        const responseText = await response.text();
        console.error('Response Error:', responseText);
        throw new Error('Failed to fetch restaurants');
      }
  
      const data = await response.json();
      console.log('Fetched Restaurants:', data);
      setRestaurants(data);
    } catch (err) {
      console.error('Error fetching restaurants:', err.message);
      setError('Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle restaurant selection
  const handleRestaurantChange = (e) => {
    const restaurantId = e.target.value;
    setSelectedRestaurant(restaurantId);
    setSelectedContact('');
    
    if (restaurantId) {
      const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
      setContacts(restaurant?.contacts || []);
    } else {
      setContacts([]);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle interaction changes
  const handleInteractionChange = (e) => {
    const { name, value } = e.target;
    setLeadData(prev => ({
      ...prev,
      interactions: [{
        ...prev.interactions[0],
        [name]: value
      }]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRestaurant || !selectedContact) {
      setError('Please select both restaurant and contact person.');
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/leads/${selectedRestaurant}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          restaurantId: selectedRestaurant,
          contactId: selectedContact,
          ...leadData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create lead');
      }

      // Reset form
      setSelectedRestaurant('');
      setSelectedContact('');
      setLeadData({
        status: 'New',
        callFrequency: '7',
        lastCallDate: '',
        interactions: [{
          type: 'Call',
          details: '',
          date: new Date().toISOString().split('T')[0]
        }]
      });

    } catch (err) {
      setError('Failed to create lead. Please try again.');
    }
  };

  if (loading) {
    return <Container className="mt-4"><Alert variant="info">Loading restaurants...</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="mb-4">
        <Card.Header>
          <h4>Add New Lead</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Restaurant Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Select Restaurant</Form.Label>
              <Form.Select 
                value={selectedRestaurant} 
                onChange={handleRestaurantChange}
                required
              >
                <option value="">Choose a restaurant...</option>
                {restaurants.map(restaurant => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Contact Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Select Contact Person</Form.Label>
              <Form.Select 
                value={selectedContact}
                onChange={(e) => setSelectedContact(e.target.value)}
                required
                disabled={!selectedRestaurant}
              >
                <option value="">Choose a contact person...</option>
                {contacts.map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name} - {contact.role}
                  </option>
                ))}
              </Form.Select>
              {selectedRestaurant && contacts.length === 0 && (
                <Alert variant="warning" className="mt-2">
                  No contacts found for this restaurant. Please add a contact first.
                </Alert>
              )}
            </Form.Group>

            {/* Lead Details */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={leadData.status}
                onChange={handleChange}
                required
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Call Frequency (days)</Form.Label>
              <Form.Control
                type="number"
                name="callFrequency"
                value={leadData.callFrequency}
                onChange={handleChange}
                required
                min="1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Call Date</Form.Label>
              <Form.Control
                type="date"
                name="lastCallDate"
                value={leadData.lastCallDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Initial Interaction */}
            <Card className="mb-3">
              <Card.Header>Initial Interaction</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={leadData.interactions[0].type}
                    onChange={handleInteractionChange}
                    required
                  >
                    <option value="Call">Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="details"
                    value={leadData.interactions[0].details}
                    onChange={handleInteractionChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={leadData.interactions[0].date}
                    onChange={handleInteractionChange}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Create Lead
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddLeadForm;