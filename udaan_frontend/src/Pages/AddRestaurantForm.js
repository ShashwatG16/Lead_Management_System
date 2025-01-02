import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { REACT_APP_API_BASE_URL } from '../constants';
import { useNavigate } from 'react-router';

const AddRestaurantForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    status: 'Active',
    contacts: [{
      name: '',
      role: '',
      contactInfo: ''
    }],
    leads: [{
      status: 'New',
      callFrequency: '',
      lastCallDate: '',
      interactions: [{
        type: 'Call',
        details: '',
        date: ''
      }]
    }],
    performance: {
      averageOrderValue: '',
      orderFrequency: '',
      lastOrderDate: '',
      performanceScore: ''
    }
  });

  const handleBasicInfoChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value
    });
  };

  const handleContactChange = (index, e) => {
    const newContacts = [...restaurant.contacts];
    newContacts[index] = {
      ...newContacts[index],
      [e.target.name]: e.target.value
    };
    setRestaurant({
      ...restaurant,
      contacts: newContacts
    });
  };

  const addContact = () => {
    setRestaurant({
      ...restaurant,
      contacts: [...restaurant.contacts, { name: '', role: '', contactInfo: '' }]
    });
  };

  // New function to remove contact
  const removeContact = (index) => {
    if (restaurant.contacts.length > 1) {
      const newContacts = restaurant.contacts.filter((_, i) => i !== index);
      setRestaurant({
        ...restaurant,
        contacts: newContacts
      });
    }
  };

  const handlePerformanceChange = (e) => {
    setRestaurant({
      ...restaurant,
      performance: {
        ...restaurant.performance,
        [e.target.name]: e.target.value
      }
    });
  };

  const navigate = useNavigate();

  // Updated submit function with API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log("Restaurant",restaurant)

    try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Authentication token not found');
          }
        const response = await fetch(`${REACT_APP_API_BASE_URL}/api/restaurants`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurant)

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      
      // Clear form after successful submission
      setRestaurant({
        name: '',
        address: '',
        status: 'Active',
        contacts: [{
          name: '',
          role: '',
          contactInfo: ''
        }],
        leads: [{
          status: 'New',
          callFrequency: '',
          lastCallDate: '',
          interactions: [{
            type: 'Call',
            details: '',
            date: ''
          }]
        }],
        performance: {
          averageOrderValue: '',
          orderFrequency: '',
          lastOrderDate: '',
          performanceScore: ''
        }
      });


      alert("restaurant Saved Successfully")
      
    } catch (error) {
      setError('Failed to submit restaurant data. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card className="mb-4">
          <Card.Header>
            <h4>Basic Information</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={restaurant.name}
                    onChange={handleBasicInfoChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={restaurant.status}
                    onChange={handleBasicInfoChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={restaurant.address}
                    onChange={handleBasicInfoChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Contacts */}
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4>Contacts</h4>
            <Button variant="outline-primary" size="sm" onClick={addContact}>
              Add Contact
            </Button>
          </Card.Header>
          <Card.Body>
            {restaurant.contacts.map((contact, index) => (
              <Row key={index} className="mb-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={(e) => handleContactChange(index, e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      value={contact.role}
                      onChange={(e) => handleContactChange(index, e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactInfo"
                      value={contact.contactInfo}
                      onChange={(e) => handleContactChange(index, e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="d-flex align-items-end">
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeContact(index)}
                    disabled={restaurant.contacts.length === 1}
                    className="mb-3"
                  >
                    Remove Contact
                  </Button>
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>

        {/* Performance Metrics */}
        <Card className="mb-4">
          <Card.Header>
            <h4>Performance Metrics</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Average Order Value</Form.Label>
                  <Form.Control
                    type="number"
                    name="averageOrderValue"
                    value={restaurant.performance.averageOrderValue}
                    onChange={handlePerformanceChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Order Frequency (per week)</Form.Label>
                  <Form.Control
                    type="number"
                    name="orderFrequency"
                    value={restaurant.performance.orderFrequency}
                    onChange={handlePerformanceChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Order Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="lastOrderDate"
                    value={restaurant.performance.lastOrderDate}
                    onChange={handlePerformanceChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Performance Score</Form.Label>
                  <Form.Control
                    type="number"
                    name="performanceScore"
                    value={restaurant.performance.performanceScore}
                    onChange={handlePerformanceChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            type="submit" 
            size="lg"
            disabled={loading}
          >
            {loading ? 'Adding Restaurant...' : 'Add Restaurant'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddRestaurantForm;