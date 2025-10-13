import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/local storage if needed
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to landing page
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>My Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Topbar;
