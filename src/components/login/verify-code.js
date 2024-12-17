import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import phoneImage from "../../assets/verify-code-image.svg";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setError("Please enter the verification code.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      navigate("/setpassword", { state: { email, code } });
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-code-container">
      <div className="verify-code-left-section">
        <img src={bluetexLogo} alt="Bluetex Logo" className="logo" />
        <h1>Verify Code</h1>
        <p>An authentication code has been sent to <strong>{email}</strong>.</p>
        <form onSubmit={handleSubmit}>
          <div className="verify-code-form-group">
            <label htmlFor="code">Enter Code</label>
            <input
              type="text"
              id="code"
              className="input-container"
              placeholder="******"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading} className="verify-button">
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
      <div className="verify-code-right-section">
        <img src={phoneImage} alt="Phone Verification" />
      </div>
    </div>
  );
};

export default VerifyCode;
