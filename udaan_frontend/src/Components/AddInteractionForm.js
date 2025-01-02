import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { REACT_APP_API_BASE_URL } from '../constants';
import { useNavigate } from 'react-router';

const AddInteractionForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  // Data states
  const [restaurants, setRestaurants] = useState([]);
  const [leads, setLeads] = useState([]);
  
  // Selection states
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedLead, setSelectedLead] = useState('');
  
  // Interaction data
  const [interactionData, setInteractionData] = useState({
    type: 'Call',
    details: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Fetch restaurants on mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/restaurants`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch restaurants');
      
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle restaurant selection and fetch leads
  const handleRestaurantChange = async (e) => {
    const restaurantId = e.target.value;
    setSelectedRestaurant(restaurantId);
    setSelectedLead('');
    setLeads([]);
    
    if (restaurantId) {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(
          `${REACT_APP_API_BASE_URL}/api/leads/restaurant/${restaurantId}`, 
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch leads');
        
        const data = await response.json();
        setLeads(data);
      } catch (err) {
        setError('Failed to load leads. Please try again.');
      }
    }
  };

  // Handle interaction data changes
  const handleInteractionChange = (e) => {
    const { name, value } = e.target;
    setInteractionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLead) {
      setError('Please select a lead.');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/leads/${selectedLead}/interactions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interactionData)
      });

      if (!response.ok) throw new Error('Failed to create interaction');

      setSuccess('Interaction added successfully!');
      // Reset form
      setSelectedRestaurant('');
      setSelectedLead('');
      setInteractionData({
        type: 'Call',
        details: '',
        date: new Date().toISOString().split('T')[0]
      });
      navigate('/landingPage')
    } catch (err) {
      setError('Failed to create interaction. Please try again.');
    }
  };

  if (loading) {
    return <Container className="mt-4"><Alert variant="info">Loading restaurants...</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      
      <Card className="mb-4">
        <Card.Header>
          <h4>Add New Interaction</h4>
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

            {/* Lead Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Select Lead</Form.Label>
              <Form.Select 
                value={selectedLead}
                onChange={(e) => setSelectedLead(e.target.value)}
                required
                disabled={!selectedRestaurant}
              >
                <option value="">Choose a lead...</option>
                {leads.map(lead => (
                  <option key={lead.id} value={lead.id}>
                    Lead {lead.id} - {lead.status}
                  </option>
                ))}
              </Form.Select>
              {selectedRestaurant && leads.length === 0 && (
                <Alert variant="warning" className="mt-2">
                  No leads found for this restaurant. Please create a lead first.
                </Alert>
              )}
            </Form.Group>

            {/* Interaction Details */}
            <Card className="mb-3">
              <Card.Header>Interaction Details</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={interactionData.type}
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
                    value={interactionData.details}
                    onChange={handleInteractionChange}
                    required
                    placeholder="Enter interaction details..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={interactionData.date}
                    onChange={handleInteractionChange}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={!selectedLead}
              >
                Add Interaction
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddInteractionForm;
