// SignInModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignInModal = ({ show, handleClose, switchToSignUp }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login");
  const [timer, setTimer] = useState(0);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ---- Normal Login ----
  const handleSubmit = async () => {
    if (!mobile || !password) {
      toast.error("Please enter mobile number and password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:2002/auth/login", {
        phoneNumber: mobile,
        password,
      });

      const { token, role, username } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success(`Welcome, ${username}`, {
        theme: "colored",
        position: "top-center",
        autoClose: 1000,
        onClose: () => {
          if (role === "SUPER_ADMIN") {
            navigate("/admin/dashboard");
          } else if (role === "MANAGER") {
            navigate("/manager/dashboard");
          } else if (role === "RESIDENT") {
            navigate("/resident/dashboard");
          } else {
            toast.error("Unknown role, cannot redirect");
          }
          handleClose();
        },
      });
    } catch (error) {
      let msg = "Login failed";
      if (error.response?.data) {
        msg =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || msg;
      }
      toast.error(msg, { theme: "colored", position: "top-center" });
    }
    setLoading(false);
  };

  // (OTP login, Forgot Password code stays same as you already wrote...)

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-warning">
            {step === "login" && "Sign In"}
            {step === "otpLogin" && "Enter OTP"}
            {step === "forgot1" && "Forgot Password"}
            {step === "forgot2" && "Reset Password"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* ---- Step 1: Normal Login ---- */}
            {step === "login" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex gap-2 mb-3">
                  <Button
                    variant="primary"
                    className="flex-fill"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Sign In"}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={() => setStep("forgot1")}
                  >
                    Forgot Password?
                  </Button>
                </div>
              </>
            )}

            {/* Other steps (otpLogin, forgot1, forgot2) remain as in your existing code */}
          </Form>
        </Modal.Body>

        {step === "login" && (
          <Modal.Footer className="justify-content-center border-0">
            <Button
              variant="light"
              className="w-100"
              onClick={() => {
                handleClose();
                switchToSignUp();
              }}
            >
              Create your Account
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default SignInModal;
