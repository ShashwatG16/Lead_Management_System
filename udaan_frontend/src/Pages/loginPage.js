import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: email, 
                password: password 
            }),
        });

        // First check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('authToken', data.token);
            // You might want to redirect or update state here
            console.log('Successfully logged in');
            navigate("/landingPage");
        } else {
            throw new Error('Token not received');
        }

    } catch (err) {
        setError(err.message || 'An error occurred during login');
        console.log("error", err.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <div className='-flex align-items-center justify-content-center py-5'>
        <h1> WELCOM TO LEAD MANAGEMENT SYSTEM</h1>
      </div>
    <Container fluid className="bg-light min-vh-90 d-flex align-items-center justify-content-center py-5">
     
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-0 text-center py-3">
              <h4 className="mb-0">Welcome back</h4>
            </Card.Header>
            <Card.Body className="px-4 py-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      Loading...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default LoginPage;