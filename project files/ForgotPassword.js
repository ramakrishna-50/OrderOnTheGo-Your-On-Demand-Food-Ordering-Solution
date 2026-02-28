import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/send-otp",
        { email }
      );

      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/verify-otp",
        { email, otp }
      );

      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/reset-password",
        { email, newPassword }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>

      <div className="auth-box">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="login-btn" onClick={handleSendOTP}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="input-field"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button className="login-btn" onClick={handleVerifyOTP}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="form-group">
              <input
                type="password"
                placeholder="New Password"
                className="input-field"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-btn" onClick={handleResetPassword}>
              Reset Password
            </button>
          </>
        )}

        {message && <p className="error-text">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;