import React, { useState, useEffect } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import Topbar from "../Topbar.jsx";
import axios from "axios";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingApartment, setEditingApartment] = useState(null);
  const [formData, setFormData] = useState({
    apartmentName: "",
    managerName: "",
    managerContact: "",
    location: "",
    city: "",
    averageRent: "",
    description: "",
    images: "",
  });

  // Fetch Apartments from backend
  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/apartments");
      setApartments(res.data);
    } catch (err) {
      console.error("Error fetching apartments:", err);
    }
  };

  // Open modal for Add or Edit
  const handleShow = (apartment = null) => {
    setEditingApartment(apartment);
    if (apartment) {
      setFormData({
        ...apartment,
        images: apartment.images.join(", "),
      });
    } else {
      setFormData({
        apartmentName: "",
        managerName: "",
        managerContact: "",
        location: "",
        city: "",
        averageRent: "",
        description: "",
        images: "",
      });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save Apartment (Add / Update)
  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        images: formData.images.split(",").map((img) => img.trim()),
      };

      if (editingApartment) {
        await axios.put(
          `http://localhost:8080/api/apartments/${editingApartment.apartmentId}`,
          payload
        );
      } else {
        await axios.post("http://localhost:8080/api/apartments", payload);
      }

      fetchApartments();
      handleClose();
    } catch (err) {
      console.error("Error saving apartment:", err);
    }
  };

  // Delete Apartment
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Apartment?")) {
      try {
        await axios.delete(`http://localhost:8080/api/apartments/${id}`);
        fetchApartments();
      } catch (err) {
        console.error("Error deleting apartment:", err);
      }
    }
  };

  return (
    <>
      <Topbar />
      <Card className="shadow-sm mt-3">
        <Card.Header>Manage Apartments</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={() => handleShow()}>
              + Add Apartment
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Apartment Name</th>
                <th>Manager</th>
                <th>Contact</th>
                <th>City</th>
                <th>Rent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
                <tr key={apartment.apartmentId}>
                  <td>{apartment.apartmentId}</td>
                  <td>{apartment.apartmentName}</td>
                  <td>{apartment.managerName}</td>
                  <td>{apartment.managerContact}</td>
                  <td>{apartment.city}</td>
                  <td>₹{apartment.averageRent}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="me-2"
                      onClick={() => handleShow(apartment)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(apartment.apartmentId)}
                    >
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingApartment ? "Edit Apartment" : "Add Apartment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Apartment Name</Form.Label>
              <Form.Control
                type="text"
                name="apartmentName"
                value={formData.apartmentName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Manager Name</Form.Label>
              <Form.Control
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Manager Contact</Form.Label>
              <Form.Control
                type="text"
                name="managerContact"
                value={formData.managerContact}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Average Rent</Form.Label>
              <Form.Control
                type="number"
                name="averageRent"
                value={formData.averageRent}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Images (comma separated URLs)</Form.Label>
              <Form.Control
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Apartments;
