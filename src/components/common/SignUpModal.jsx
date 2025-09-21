// SignUpModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const SignUpModal = ({ show, handleClose, switchToSignIn }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/signup", form); // 🔹 adjust endpoint
      alert(res.data.message || "Account created successfully!");
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-warning">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number *</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="mb-3">
            <Form.Check
              inline
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              checked={form.gender === "Male"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              checked={form.gender === "Female"}
              onChange={handleChange}
            />
          </div>

          <Button variant="primary" className="w-100" onClick={handleSubmit}>
            Continue
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-0">
        Already have an account?{" "}
        <Button
          variant="link"
          className="p-0 text-decoration-none text-primary"
          onClick={() => {
            handleClose();
            switchToSignIn();
          }}
        >
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;
