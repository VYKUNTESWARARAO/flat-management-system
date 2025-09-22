import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ResidentProfile = () => {
  const [resident, setResident] = useState({
    name: "",
    email: "",
    phone: "",
    flatNumber: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load resident data from localStorage or API
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setResident({
        name: savedUser.name || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
        flatNumber: savedUser.flatNumber || "",
        address: savedUser.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setResident({ ...resident, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Call backend API to save updated resident info
      // Example:
      // await axios.put(`/api/residents/${resident.id}`, resident);

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Optionally update localStorage
      localStorage.setItem("user", JSON.stringify(resident));
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Profile</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-3">
            <Form>
              <Form.Group className="mb-3" controlId="residentName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={resident.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="residentEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={resident.email}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="residentPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={resident.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="residentFlat">
                <Form.Label>Flat Number</Form.Label>
                <Form.Control
                  type="text"
                  name="flatNumber"
                  value={resident.flatNumber}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="residentAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={resident.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                {isEditing ? (
                  <>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResidentProfile;
