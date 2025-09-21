// Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#041933ff", color: "white" }}>
      <Container className="py-5">
        <Row className="text-center text-md-start">
          {/* Brand / Logo */}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">🏠 FlatManagement</h5>
            <p>Simple solution for managing your flats & residents.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#request" className="text-white text-decoration-none">
                  Request Callback
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-1">📍Chennai, India</p>
            <p className="mb-1">📧 support@flatmgmt.com</p>
            <p className="mb-0">📞 +91 98765 43210</p>
          </Col>
        </Row>

        <hr className="border-light" />

        {/* Bottom Bar */}
        <Row>
          <Col className="text-center">
            <small>
              © {new Date().getFullYear()} FlatMgmt. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
