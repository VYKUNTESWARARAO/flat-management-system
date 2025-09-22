import React from "react";
import { Navbar, Nav, Container, Button, Image, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/residentHeader.css";
import logo from "../../assets/images/logo.png";

const ResidentHeader = () => {
  const navigate = useNavigate();

  const goToProfile = () => navigate("/resident/profile");
  const goToFlats = () => navigate("/resident/flats");
  const handleLogout = () => navigate("/");

  return (
    <Navbar className="resident-navbar" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="resident-navbar-brand">
          <Image src={logo} alt="HSM Logo" className="resident-logo" />
          <span className="brand-text">Harini Smart Homes</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="resident-nav" />
        <Navbar.Collapse id="resident-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-custom">
              About
            </Nav.Link>

            <Button
              variant="outline-light"
              className="resident-btn me-3"
              onClick={goToFlats}
            >
              Find Your Flats
            </Button>

            {/* My Account dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle className="resident-avatar-toggle" id="resident-menu">
                My Account
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ResidentHeader;
