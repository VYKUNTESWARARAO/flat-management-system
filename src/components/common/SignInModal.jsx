// SignInModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const SignInModal = ({ show, handleClose, switchToSignUp }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login");
  const [timer, setTimer] = useState(0); // countdown in seconds

  const otpRefs = useRef([]);

  // Auto countdown for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ---- Normal Login ----
const handleSubmit = async () => {
  setLoading(true);
  try {
    const response = await axios.post("http://localhost:2002/auth/login", {
      phoneNumber: mobile,
      password,
    });

    const { token, role } = response.data;

    // Save JWT token
    localStorage.setItem("token", token);

    alert("Login success: " + response.data.username);

    // Redirect based on role
    switch(role) {
      case "SUPER_ADMIN":
        window.location.href = "admin/dashboard";
        break;
      case "MANAGER":
        window.location.href = "/manager-dashboard";
        break;
      case "RESIDENT":
        window.location.href = "/resident-dashboard";
        break;
      default:
        alert("Unknown role, cannot redirect");
    }

    handleClose();
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
  setLoading(false);
};




  // ---- Trigger OTP Login ----
  const handleLoginOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login/otp/send", { mobile });
      alert(response.data.message || "OTP sent");
      setStep("otpLogin");
      setTimer(30); // start countdown
    } catch (error) {
      alert(error.response?.data?.message || "OTP sending failed");
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
      alert(response.data.message || "OTP verified, login success");
      handleClose();
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
    setLoading(false);
  };

  // ---- Resend OTP ----
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await axios.post("/api/login/otp/send", { mobile });
      alert("New OTP sent");
      setTimer(30); // reset timer
      setOtp(new Array(6).fill(""));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    }
    setLoading(false);
  };

  // ---- OTP Input Handling ----
  const handleOtpChange = (val, index) => {
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      if (val && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // ---- Forgot Password: Send OTP ----
  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await axios.post("/api/forgot-password/send-otp", { mobile });
      alert("OTP sent to your registered mobile number");
      setStep("forgot2");
      setTimer(30); // start countdown
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  // ---- Forgot Password: Reset ----
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await axios.post("/api/forgot-password/reset", {
        mobile,
        otp: otp.join(""),
        newPassword,
      });
      alert("Password reset successful! Please login with new password.");
      setStep("login");
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed");
    }
    setLoading(false);
  };

  return (
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

          {/* ---- Step 2: OTP Login ---- */}
          {step === "otpLogin" && (
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
                    style={{
                      width: "3rem",
                      height: "3rem",
                      textAlign: "center",
                      fontSize: "1.25rem",
                    }}
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                  />
                ))}
              </div>

              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </Button>

              <div className="text-center">
                {timer > 0 ? (
                  <span className="text-muted">Resend OTP in {timer}s</span>
                ) : (
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </>
          )}

          {/* ---- Step 3: Forgot Password (Send OTP) ---- */}
          {step === "forgot1" && (
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

              <div className="text-center mt-2">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none"
                  onClick={() => setStep("login")}
                >
                  Back to Login
                </Button>
              </div>
            </>
          )}

          {/* ---- Step 4: Forgot Password (Reset with OTP) ---- */}
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
                    style={{
                      width: "3rem",
                      height: "3rem",
                      textAlign: "center",
                      fontSize: "1.25rem",
                    }}
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                  />
                ))}
              </div>

              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <div className="text-center">
                {timer > 0 ? (
                  <span className="text-muted">Resend OTP in {timer}s</span>
                ) : (
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={handleSendOTP}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>

              <div className="text-center mt-2">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none"
                  onClick={() => setStep("login")}
                >
                  Back to Login
                </Button>
              </div>
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
  );
};

export default SignInModal;
