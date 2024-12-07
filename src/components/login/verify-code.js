import React, { useState } from "react";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import phoneImage from "../../assets/verify-code-image.svg";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [isCodeVisible, setCodeVisible] = useState(false);

  return (
    <div className="verify-code-container">
      {/* Left Section */}
      <div className="verify-code-left-section">
        <img src={bluetexLogo} alt="Bluetex Logo" className="logo" />
        <a href="/" className="verify-code-back-to-login">&lt; Back to login</a>
        <h1>Verify code</h1>
        <p>An authentication code has been sent to your email.</p>
        <form>
          <div className="form-group">
            <label htmlFor="code">Enter Code</label>
            <div className="input-container">
              <input type="number" id="number" placeholder="******" />
            </div>
          </div>
          <div className="resend-container">
            <p>
              Didn’t receive a code? <a href="#" className="resend-link">Resend</a>
            </p>
          </div>
          <button type="submit" className="verify-button">Verify</button>
        </form>
      </div>

      {/* Right Section */}
      <div className="verify-code-right-section">
        <img src={phoneImage} alt="Phone Verification" />
      </div>
    </div>
  );
};

export default VerifyCode;