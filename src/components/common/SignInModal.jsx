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

  // Countdown for resend OTP
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

      toast.success(`Login success: ${username}`, { theme: "colored" });

      switch (role) {
        case "SUPER_ADMIN":
          navigate("/admin/dashboard");
          break;
        case "MANAGER":
          navigate("/manager-dashboard");
          break;
        case "RESIDENT":
          navigate("/resident-dashboard");
          break;
        default:
          toast.error("Unknown role, cannot redirect");
      }

      handleClose();
    } catch (error) {
      toast.error(error.response?.data || "Login failed");
    }
    setLoading(false);
  };

  // ---- Trigger OTP Login ----
  const handleLoginOTP = async () => {
    if (!mobile) {
      toast.error("Please enter mobile number");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/login/otp/send", { mobile });
      toast.success(response.data.message || "OTP sent");
      setStep("otpLogin");
      setTimer(30);
    } catch (error) {
      toast.error(error.response?.data || "OTP sending failed");
    }
    setLoading(false);
  };

  // ---- Verify OTP ----
  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const otpValue = otp.join("");
      const response = await axios.post("/api/login/otp/verify", {
        mobile,
        otp: otpValue,
      });
      toast.success(response.data.message || "OTP verified, login success");
      handleClose();
    } catch (error) {
      toast.error(error.response?.data || "OTP verification failed");
    }
    setLoading(false);
  };

  // ---- Resend OTP ----
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await axios.post("/api/login/otp/send", { mobile });
      toast.success("New OTP sent", { theme: "colored" });
      setTimer(30);
      setOtp(new Array(6).fill(""));
    } catch (error) {
      toast.error(error.response?.data || "Failed to resend OTP");
    }
    setLoading(false);
  };

  // ---- OTP Input Handling ----
  const handleOtpChange = (val, index) => {
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      if (val && index < otp.length - 1) otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1].focus();
  };

  // ---- Forgot Password: Send OTP ----
  const handleSendOTP = async () => {
    if (!mobile) {
      toast.error("Please enter mobile number", { theme: "colored" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/forgot-password/send-otp", { mobile });
      toast.success("OTP sent to your registered mobile number");
      setStep("forgot2");
      setTimer(30);
    } catch (error) {
      toast.error(error.response?.data || "Failed to send OTP");
    }
    setLoading(false);
  };

  // ---- Forgot Password: Reset ----
  const handleResetPassword = async () => {
    if (!newPassword || otp.join("") === "") {
      toast.error("Please enter OTP and new password");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/forgot-password/reset", {
        mobile,
        otp: otp.join(""),
        newPassword,
      });
      toast.success("Password reset successful! Please login with new password.");
      setStep("login");
    } catch (error) {
      toast.error(error.response?.data || "Password reset failed");
    }
    setLoading(false);
  };

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
                    onClick={handleLoginOTP}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Login with OTP"}
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-fill"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
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

            {/* ---- OTP / Forgot password forms ---- */}
            {step === "otpLogin" && (
              <div className="d-flex justify-content-center gap-2 mb-3">
                {otp.map((digit, index) => (
                  <Form.Control
                    key={index}
                    type="text"
                    value={digit}
                    maxLength="1"
                    ref={(el) => (otpRefs.current[index] = el)}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{ width: "3rem", height: "3rem", textAlign: "center", fontSize: "1.25rem" }}
                  />
                ))}
                <Button variant="success" className="w-100 mt-2" onClick={handleVerifyOTP} disabled={loading}>
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>
              </div>
            )}

            {step === "forgot1" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSendOTP} className="w-100" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </>
            )}

            {step === "forgot2" && (
              <>
                <div className="d-flex justify-content-center gap-2 mb-3">
                  {otp.map((digit, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      value={digit}
                      maxLength="1"
                      ref={(el) => (otpRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      style={{ width: "3rem", height: "3rem", textAlign: "center", fontSize: "1.25rem" }}
                    />
                  ))}
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="success" className="w-100" onClick={handleResetPassword} disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </>
            )}
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
