import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import RequestCallBackModal from "./RequestCallBackModal";
import "../../styles/header.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  // Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Rahul");

  // Handle login success (from SignInModal)
  const handleLoginSuccess = (name) => {
    setUserName(name || "User");
    setIsLoggedIn(true);
    setShowSignIn(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#134164ff" }}
        variant="dark"
        expand="lg"
        className="py-4 shadow-sm"
      >
        <Container fluid>
          {/* Brand with logo */}
          <Navbar.Brand
            href="/"
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

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link href="/" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link
                href="/flat-management-system/about"
                className="text-white"
              >
                About
              </Nav.Link>

              {/* Request Call Back Button */}
              <Button
                className="ms-3 fw-semibold rounded px-3 custom-btn m-2"
                onClick={() => setShowRequest(true)}
              >
                Request Call Back
              </Button>

              {/* Conditional Rendering */}
              {isLoggedIn ? (
                <Dropdown align="end" className="ms-3">
                  <Dropdown.Toggle
                    variant="outline-light"
                    className="fw-semibold rounded px-3"
                  >
                    My Account
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/resident-dashboard">
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant="outline-light"
                  className="ms-3 fw-semibold rounded px-3"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modals */}
      <SignInModal
        show={showSignIn}
        handleClose={() => setShowSignIn(false)}
        onLoginSuccess={handleLoginSuccess} // pass success callback
        switchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        show={showSignUp}
        handleClose={() => setShowSignUp(false)}
        switchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />

      <RequestCallBackModal
        show={showRequest}
        handleClose={() => setShowRequest(false)}
      />
    </>
  );
};

export default Header;
