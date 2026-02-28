import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

   const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if (!gmailPattern.test(email)) {
  setErrors({ email: "Please enter valid Gmail address " });
  return;
}

    if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
      });

      navigate("/login");

    } catch (err) {
      if (err.response && err.response.data) {
        const { field, message } = err.response.data;
        setErrors({ [field]: message });
      } else {
        setErrors({ email: "Registration Failed" });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>

      <div className="auth-box">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <form onSubmit={handleRegister}>
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>

          <p className="register-text" style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span
              className="auth-link"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;