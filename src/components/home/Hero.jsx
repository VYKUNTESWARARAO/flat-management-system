import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import PgList from "./PgList.jsx";
import "../../styles/Hero.css";
import FeaturesSection from "./FeaturesSection.jsx";
import Testimonials from "./Testimonials.jsx";

const Hero = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔹 Fetch all locations for dropdown
  useEffect(() => {
    fetch("http://localhost:2003/api/apartments/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data)) // ✅ list of strings
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  // 🔹 Fetch suggestions as user types
  useEffect(() => {
    if (searchText.length > 1) {
      fetch(
        `http://localhost:2003/api/apartments/search?query=${searchText}&location=${selectedLocation}`
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.error("Error fetching suggestions:", err));
    } else {
      setSuggestions([]);
    }
  }, [searchText, selectedLocation]);

  // 🔹 Handle search button
  const handleSearch = () => {
    fetch(
      `http://localhost:2003/api/apartments/search?query=${searchText}&location=${selectedLocation}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Search Results:", data);
        // 👉 Pass results to PgList or show directly
      })
      .catch((err) => console.error("Error searching apartments:", err));
  };

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

              {/* 🔹 Search Bar */}
              <Form className="d-flex justify-content-center mt-4">
                {/* Location Dropdown */}
                <Form.Select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-25 me-2 custom-input"
                >
                  <option value="">Select Location</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </Form.Select>

                {/* Search Input */}
                <div className="position-relative w-50 me-2">
                  <Form.Control
                    type="text"
                    placeholder="Search apartments..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="custom-input"
                  />
                  {/* 🔹 Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <ListGroup className="position-absolute w-100 shadow-sm">
                      {suggestions.map((item) => (
                        <ListGroup.Item
                          key={item.apartmentId}
                          action
                          onClick={() => {
                            setSearchText(item.apartmentName);
                            setSuggestions([]);
                          }}
                        >
                          {item.apartmentName} - {item.city}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </div>

                <Button
                  className="custom-btn-primary px-4"
                  onClick={handleSearch}
                >
                  Search
                </Button>
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
