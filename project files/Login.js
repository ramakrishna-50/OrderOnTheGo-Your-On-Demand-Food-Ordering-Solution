import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        const { field, message } = err.response.data;
        setErrors({ [field]: message });
      } else {
        setErrors({ email: "Login Failed" });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>

      <div className="auth-box">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        <form onSubmit={handleLogin}>
          
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

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-text" style={{ marginTop: "15px", textAlign: "center" }}>
            Don’t have an account?{" "}
            <span
              className="auth-link"
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer" }}
            >
              Register
            </span>
          </p>

          <p style={{ textAlign: "center" }}>
            <span
              className="auth-link"
              onClick={() => navigate("/forgot-password")}
              style={{ cursor: "pointer" }}
            >
              Forgot Password?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;