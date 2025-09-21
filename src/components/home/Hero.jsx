import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import PgList from "./PgList.jsx";
import "../../styles/Hero.css";
import FeaturesSection from "./FeaturesSection.jsx";
import Testimonials from "./Testimonials.jsx";

const Hero = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  // 🔹 Fetch locations from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  return (
    <>
      <section className="hero-section d-flex align-items-center text-black">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="fw-bold display-4">
                Smarter Living With <span className="highlight">HSM</span>
              </h1>
              <p className="lead mt-3">
                Simplify your flat & resident management with real-time updates,
                tenant tracking, and hassle-free services.
              </p>

              {/* 🔹 Search Bar with Location Dropdown */}
              <Form className="d-flex justify-content-center mt-4">
                <Form.Select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-25 me-2 custom-input"
                >
                  <option value="">Select Location</option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  type="text"
                  placeholder="Search flats..."
                  className="w-50 me-2 custom-input"
                />
                <Button className="custom-btn-primary px-4">Search</Button>
              </Form>

              {/* Call To Action */}
              <div className="mt-4">
                <Button className="custom-btn-primary px-4 me-3">
                  Learn More
                </Button>
                <Button className="custom-btn-primary px-4">Get Started</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <PgList />
      <FeaturesSection />
      <Testimonials />
    </>
  );
};

export default Hero;
