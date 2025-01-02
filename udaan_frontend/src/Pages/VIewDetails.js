import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button, Spinner, Alert, Badge, Card } from "react-bootstrap";
import { REACT_APP_API_BASE_URL } from "../constants";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${REACT_APP_API_BASE_URL}/api/restaurants/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }

        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  if (!restaurant) {
    return (
      <Container className="py-5 text-center">
        <p>No restaurant found</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        Back
      </Button>

      {/* General Information */}
      <Card className="mb-4">
        <Card.Header as="h5">General Information</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Name:</strong> {restaurant.name}
              </p>
              <p>
                <strong>Address:</strong> {restaurant.address}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Created At:</strong> {formatDate(restaurant.createdAt)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  bg={restaurant.status === "Active" ? "success" : "danger"}
                >
                  {restaurant.status}
                </Badge>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Performance Metrics */}
      <Card className="mb-4">
        <Card.Header as="h5">Performance Metrics</Card.Header>
        <Card.Body>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average Order Value</td>
                <td>₹{restaurant.performance.averageOrderValue}</td>
              </tr>
              <tr>
                <td>Order Frequency</td>
                <td>{restaurant.performance.orderFrequency}/month</td>
              </tr>
              <tr>
                <td>Performance Score</td>
                <td>{restaurant.performance.performanceScore}%</td>
              </tr>
              <tr>
                <td>Last Order Date</td>
                <td>{formatDate(restaurant.performance.lastOrderDate)}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Contacts */}
      <Card className="mb-4">
        <Card.Header as="h5">Contacts</Card.Header>
        <Card.Body>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact Info</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {restaurant.contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.role}</td>
                  <td>{contact.contactInfo}</td>
                  <td>{formatDate(contact.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Leads */}
      <Card>
        <Card.Header as="h5">Leads</Card.Header>
        <Card.Body>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Lead Id</th>
                <th>Status</th>
                <th>Call Frequency</th>
                <th>Last Call Date</th>
                <th>Created</th>
                <th>Interactions</th>
              </tr>
            </thead>
            <tbody>
              {restaurant.leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.status}</td>
                  <td>Every {lead.callFrequency} days</td>
                  <td>{formatDate(lead.lastCallDate)}</td>
                  <td>{formatDate(lead.createdAt)}</td>
                  <td>
                    {lead.interactions.map((interaction) => (
                      <div key={interaction.id} className="mb-2">
                        <p>
                          <strong>{interaction.type}</strong> (
                          {formatDate(interaction.date)})
                        </p>
                        <p className="text-muted">{interaction.details}</p>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
