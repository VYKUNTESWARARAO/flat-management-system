import React from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";

const ResidentSidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "" };

  const firstLetter = user.name ? user.name[0].toUpperCase() : "R";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Container fluid className="p-0">
      <Row>
        {/* Sidebar */}
        <Col
          md={3}
          className="bg-light vh-100 shadow-sm d-flex flex-column align-items-center p-3"
          style={{ minWidth: "220px" }}
        >
          {/* Avatar */}
          <div
            className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white mb-3"
            style={{ width: "80px", height: "80px", fontSize: "36px" }}
          >
            {firstLetter}
          </div>

          {/* Name */}
          <h5 className="text-center mb-4">{user.name}</h5>

          {/* Navigation */}
          <Nav className="flex-column w-100">
            <Nav.Link
              className="mb-2"
              onClick={() => navigate("/resident/dashboard")}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="mb-2"
              onClick={() => navigate("/resident/profile")}
            >
              My Profile
            </Nav.Link>
            <Nav.Link
              className="mb-2"
              onClick={() => navigate("/resident/flats")}
            >
              Find Your Flat
            </Nav.Link>

            <Button
              variant="danger"
              className="mt-auto w-100"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <Outlet /> {/* Nested resident pages */}
        </Col>
      </Row>
    </Container>
  );
};

export default ResidentSidebar;
