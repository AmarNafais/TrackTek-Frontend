import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import lockImage from "../../assets/forgot-password-image.svg";
import { requestPasswordReset } from "../../redux/actions/login";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await requestPasswordReset(email);
      navigate("/verifycode", { state: { email } });
    } catch (err) {
      setError(err.message || "Failed to send password reset request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left-section">
        <img src={bluetexLogo} alt="Bluetex Logo" className="logo" />
        <a href="/" className="forgot-password-back-to-login">&lt; Back to login</a>
        <h1>Forgot your password?</h1>
        <p>
          Don’t worry, happens to all of us. Enter your email below to recover your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="forgot-password-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="forgot-password-right-section">
        <img src={lockImage} alt="Lock Illustration" />
      </div>
    </div>
  );
};

export default ForgotPassword;
