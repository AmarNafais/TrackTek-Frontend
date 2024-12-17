import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import setPasswordImage from "../../assets/set-password-image.svg";
import { resetPassword } from "../../redux/actions/login";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || "");
      setCode(location.state.code || "");
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await resetPassword({ email, newPassword: password, confirmPassword, code });
      alert("Password reset successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-password-container">
      <div className="set-password-left-section">
        <img src={bluetexLogo} alt="Bluetex Logo" className="logo" />
        <h1>Set a Password</h1>
        <p>Set a new password for your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="set-password-form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="input-container"
              id="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="set-password-form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              className="input-container"
              id="confirm-password"
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading} className="set-password-button">
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
      </div>
      <div className="set-password-right-section">
        <img src={setPasswordImage} alt="Set Password" />
      </div>
    </div>
  );
};

export default SetPassword;
