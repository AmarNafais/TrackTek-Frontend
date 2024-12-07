import React from "react";
import lockImage from "../../assets/forgot-password-image.svg";
import bluetexLogo from "../../assets/bluetex-logo.svg";

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left-section">
        <img src={bluetexLogo} alt="Bluetex Logo" className="logo" />
        <a href="/" className="forgot-password-back-to-login"> &lt; Back to login</a>
        <h1>Forgot your password?</h1>
        <p>
          Don’t worry, happens to all of us. Enter your email below to recover
          your password.
        </p>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="john.doe@gmail.com" />
          </div>
          <button type="submit" className="submit-button" ahref="/verifycode">Submit</button>
        </form>
      </div>

      {/* Right Section */}
      <div className="forgot-password-right-section">
        <img src={lockImage} alt="Lock Illustration" />
      </div>
    </div>
  );
};

export default ForgotPassword;