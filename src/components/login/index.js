import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.svg";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import { loginUser, fetchUsers } from "../../redux/actions/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
      setLoading(true);
      setError("");
      const loginResponse = await loginUser(email, password);

      if (loginResponse.token) {
        localStorage.setItem("authToken", loginResponse.token);

        const users = await fetchUsers();
        const currentUser = users.find((user) => user.email === email);

        if (currentUser) {
          const userName = `${currentUser.firstName} ${currentUser.lastName}`.trim();
          localStorage.setItem("userName", userName);
          localStorage.setItem("userEmail", currentUser.email);
          localStorage.setItem("userRole", currentUser.role);
        }

        navigate("/dashboard");
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="************"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-button-group">
                <a href="/forgotpassword" className="login-forget-password-link">
                  Forgot Password?
                </a>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button className="login-button" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
        <div className="login-right-section">
          <img src={loginImage} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
