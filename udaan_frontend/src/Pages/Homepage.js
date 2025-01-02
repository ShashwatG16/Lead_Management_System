import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import LandingPage from './LandingPage';
import { useNavigate } from 'react-router';
import AddRestaurantForm from './AddRestaurantForm';
import AddLeadForm from '../Components/AddLeadsForm';
import AddInteractionForm from '../Components/AddInteractionForm';
import LeadsPage from './leadsPage';
import InteractionsPage from './InteractionsPage';
import Dashboard from './DashBoard';

const Homepage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [activeComponent, setActiveComponent] = useState('landing');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'landing':
        return <Dashboard/>;
      case 'restaurants':
        return <LandingPage />;
      case 'leads':
        return <LeadsPage/>; 
      case 'performances':
        return <div>Performances Component</div>; 
      case 'interactions':
        return <InteractionsPage/>; 
      case 'addRestaurant':
        return <AddRestaurantForm/>; 
      case 'addLead':
        return <AddLeadForm/>;
      case 'addInteraction':
        return <AddInteractionForm/>;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand onClick={() => setActiveComponent('landing')} style={{ cursor: 'pointer' }}>
            LMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left aligned user info */}
            <Nav className="me-auto">
              {userInfo && (
                <Nav.Item className="text-light d-flex align-items-center">
                  <span className="text-light">Welcome, {userInfo.name}</span>
                </Nav.Item>
              )}
            </Nav>
            
            {/* Main navigation items */}
            <Nav className="mx-auto">
              <Nav.Link 
                onClick={() => setActiveComponent('restaurants')}
                active={activeComponent === 'restaurants'}
              >
                Restaurants
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveComponent('leads')}
                active={activeComponent === 'leads'}
              >
                Leads
              </Nav.Link>
              {/* <Nav.Link 
                onClick={() => setActiveComponent('performances')}
                active={activeComponent === 'performances'}
              >
                Performances
              </Nav.Link> */}
              <Nav.Link 
                onClick={() => setActiveComponent('interactions')}
                active={activeComponent === 'interactions'}
              >
                Interactions
              </Nav.Link>
              
              {/* Add submenu */}
              <NavDropdown title="Add" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setActiveComponent('addRestaurant')}>
                  Add Restaurant
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setActiveComponent('addLead')}>
                  Add Lead
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setActiveComponent('addInteraction')}>
                  Add Interaction
                </NavDropdown.Item>
                
              </NavDropdown>
            </Nav>
            
            {/* User logout */}
            <Nav>
              <Nav.Link onClick={() => {
                localStorage.removeItem('authToken');
                navigate("/")
                // Add your logout logic here
              }}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container>
        {activeComponent === 'landing' && (
          <div className="text-center">
            <div className="position-relative min-vh-75 d-flex flex-column justify-content-center align-items-center">
              <h1 className="display-2 mb-4">LEAD Management System</h1>
              <p className="lead">Streamline your restaurant leads and interactions</p>       
            </div>
          </div>
        )}
      
        
        {renderComponent()}
      </Container>
    </div>
  );
};

export default Homepage;