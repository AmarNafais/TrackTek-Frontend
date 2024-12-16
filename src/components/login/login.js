import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.svg";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import { loginUser } from "../../redux/actions/axios"; // Import login service

const Login = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate(); // Navigation hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Basic Validation
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true); // Set loading state
      setError(""); // Clear any previous errors

      // Call login service
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("authToken", data.token); // Save token to localStorage
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message); // Display error
    } finally {
      setLoading(false); // Clear loading state
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left-section">
          <div className="login-form">
            <img src={bluetexLogo} alt="Bluetex Logo" />
            <h1>Login</h1>
            <p>Login to access your Bluetex account</p>
            <form onSubmit={handleLogin}>
              <div className="login-form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>
              <div className="login-form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="************"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
              </div>
              <div className="login-button-group">
                <div className="login-remember-me-container">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="/forgotpassword" className="login-forget-password-link">
                  Forgot Password?
                </a>
              </div>
              {error && <p className="error-message">{error}</p>} {/* Display error */}
              <button className="login-button" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="login-signup">
              Don’t have an account?{" "}
              <a href="/signup" className="login-sign-up-link">
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="login-right-section">
          <img src={loginImage} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
