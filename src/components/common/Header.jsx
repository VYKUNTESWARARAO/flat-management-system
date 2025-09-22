import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import axios from "axios";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import RequestCallBackModal from "./RequestCallBackModal";
import "../../styles/header.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Check if user already logged in (from localStorage/session)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowSignIn(false);

    // Redirect based on role
    if (userData.role === "SUPER_ADMIN") {
      navigate("/admin-dashboard");
    } else if (userData.role === "RESIDENT") {
      navigate("/resident-dashboard");
    } else if (userData.role === "MANAGER") {
      navigate("/manager-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
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

              {!user ? (
                // If not logged in show sign in button
                <Button
                  variant="outline-light"
                  className="ms-3 fw-semibold rounded px-3"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </Button>
              ) : (
                // If logged in show My Account + Logout
                <>
                  <Button
                    variant="outline-light"
                    className="ms-3 fw-semibold rounded px-3"
                    onClick={() => {
                      if (user.role === "SUPER_ADMIN") {
                        navigate("/admin-dashboard");
                      } else if (user.role === "RESIDENT") {
                        navigate("/resident-dashboard");
                      } else if (user.role === "MANAGER") {
                        navigate("/manager-dashboard");
                      }
                    }}
                  >
                    My Account
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2 fw-semibold rounded px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modals */}
      <SignInModal
        show={showSignIn}
        handleClose={() => setShowSignIn(false)}
        switchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
        onLoginSuccess={handleLoginSuccess} // send login success event
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
