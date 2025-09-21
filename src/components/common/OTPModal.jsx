import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const OTPModal = ({ show, handleClose, mobile }) => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // Autofill using WebOTP API (only works on Chrome Mobile + HTTPS)
  useEffect(() => {
    if ("OTPCredential" in window) {
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: new AbortController().signal,
        })
        .then((otpCredential) => {
          if (otpCredential && otpCredential.code) {
            setOtp(otpCredential.code.split("")); // Autofill inputs
            handleVerifyOtp(otpCredential.code);
          }
        })
        .catch((err) => console.log("WebOTP not available:", err));
    }
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = async (code = otp.join("")) => {
    try {
      const response = await axios.post("/api/login/verify-otp", {
        mobile,
        otp: code,
      });
      alert("Login Successful!");
      handleClose();
      window.location.href = "/admin"; // redirect to admin dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="mb-3">
          OTP has been sent to <strong>{mobile}</strong>
        </p>

        <div className="d-flex justify-content-center gap-2 mb-3">
          {otp.map((digit, i) => (
            <Form.Control
              key={i}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={(e) => handleChange(e.target.value, i)}
              className="text-center fw-bold"
              style={{ width: "50px", fontSize: "1.5rem" }}
            />
          ))}
        </div>

        <Button
          variant="success"
          className="w-100"
          onClick={() => handleVerifyOtp()}
        >
          Verify & Login
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default OTPModal;
