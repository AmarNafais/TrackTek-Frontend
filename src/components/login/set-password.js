import React, { useState } from "react";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import setPasswordImage from "../../assets/set-password-image.svg";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successful!");
  };

  return (
    <div className="set-password-container">
      {/* Left Section */}
      <div className="set-password-left-section">
        <img src={bluetexLogo} alt="Bluetex Logo" className="logo" />
        <a href="/" className="set-password-back-to-login">&lt; Back to login</a>
        <h1>Set a password</h1>
        <p>Your previous password has been reset. Please set a new password for your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Create Password</label>
            <div className="input-container">
              <input type="password" placeholder="************" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Re-enter Password</label>
            <div className="input-container">
              <input type="password" placeholder="************" />
            </div>
          </div>
          <button type="submit" className="set-password-button">Set password</button>
        </form>
      </div>

      {/* Right Section */}
      <div className="set-password-right-section">
        <img src={setPasswordImage} alt="Lock Reset" />
      </div>
    </div>
  );
};

export default SetPassword;