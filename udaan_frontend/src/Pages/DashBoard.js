import React, { useState, useEffect } from "react";
import { Table, Card, Container, Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { REACT_APP_API_BASE_URL } from "../constants";

const Dashboard = () => {
  const [overview, setOverview] = useState({});
  const [pendingTasks, setPendingTasks] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch overview data
    fetch(`${REACT_APP_API_BASE_URL}/api/overview`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOverview(data))
      .catch((error) => console.error("Error fetching overview data:", error));

    // Fetch pending tasks
    fetch(`${REACT_APP_API_BASE_URL}/api/pending-tasks`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPendingTasks(data))
      .catch((error) =>
        console.error("Error fetching pending tasks data:", error)
      );

    // Fetch top performers
    fetch(`${REACT_APP_API_BASE_URL}/api/top-performers`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTopPerformers(data))
      .catch((error) =>
        console.error("Error fetching top performers data:", error)
      );
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container fluid>
      {/* Overview Section */}
      <Row className="my-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Restaurants</Card.Title>
              <Card.Text>{overview.totalRestaurants || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Leads</Card.Title>
              <Card.Text>{overview.totalLeads || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Conversion Rate</Card.Title>
              <Card.Text>{overview.conversionRate || "0"}%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pending Tasks Section */}
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Pending Tasks</Card.Title>
              {pendingTasks.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Restaurant Name</th>
                      <th>Last Call Date</th>
                      <th>Call Frequency (days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTasks.map((task, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{task.restaurantName}</td>
                        <td>{task.lastCallDate}</td>
                        <td>{task.callFrequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No pending tasks for today!</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Performers Section */}
      <Row className="my-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Top Performers</Card.Title>
              {topPerformers.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Restaurant Name</th>
                      <th>Performance Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformers.map((performer, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{performer.restaurantName}</td>
                        <td>{performer.performanceScore}%</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No top performers to display!</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Performance Chart</Card.Title>
              <BarChart
                width={400}
                height={300}
                data={topPerformers.map((performer) => ({
                  name: performer.restaurantName,
                  score: performer.performanceScore,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Conversion Rate Chart */}
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Conversion Rate Distribution</Card.Title>
              <PieChart width={400} height={300}>
                <Pie
                  data={[
                    { name: "Converted", value: overview.conversionRate || 0 },
                    { name: "Not Converted", value: 100 - (overview.conversionRate || 0) },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
