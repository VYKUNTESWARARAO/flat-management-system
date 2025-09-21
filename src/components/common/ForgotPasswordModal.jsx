import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await axios.post("/api/forgot-password/send-otp", { mobile });
      alert("OTP sent to your registered mobile number");
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await axios.post("/api/forgot-password/reset", {
        mobile,
        otp,
        newPassword,
      });
      alert("Password reset successful!");
      handleClose(); // close modal after success
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed");
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-warning">Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Enter Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleSendOTP}
                className="w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                onClick={handleResetPassword}
                className="w-100"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
