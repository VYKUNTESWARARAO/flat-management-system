// ResidentHeader.jsx
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const ResidentHeader = () => {
  const navigate = useNavigate();
  const [resident, setResident] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.role === "RESIDENT") {
      setResident(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setResident(null);
    navigate("/");
  };

  if (!resident) return null; // Hide if not logged in

  return (
    <Navbar
      style={{ backgroundColor: "#134164ff" }}
      variant="dark"
      expand="lg"
      className="py-4 shadow-sm"
    >
      <Container fluid>
        {/* Brand with logo */}
        <Navbar.Brand
          href="/resident-dashboard"
          className="fw-bold text-white fs-4 d-flex align-items-center"
        >
          <img
            src={logo}
            alt="HSM Logo"
            className="me-2"
            style={{ height: "40px", width: "40px", objectFit: "contain" }}
          />
          Harini Smart Homes
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="resident-navbar-nav" />

        <Navbar.Collapse id="resident-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="/resident" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link
              href="/flat-management-system/about"
              className="text-white"
            >
              About
            </Nav.Link>

            {/* My Profile Button */}
            <Button
              variant="outline-light"
              className="ms-3 fw-semibold rounded px-3"
              onClick={() => navigate("/resident-profile")}
            >
              My Profile
            </Button>

            {/* Find Your Flat Button */}
            <Button
              variant="outline-light"
              className="ms-2 fw-semibold rounded px-3"
              onClick={() => navigate("/resident-flats")}
            >
              Find Your Flat
            </Button>

            {/* Logout Button */}
            <Button
              variant="danger"
              className="ms-2 fw-semibold rounded px-3"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ResidentHeader;
