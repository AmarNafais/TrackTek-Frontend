import React from "react";
import signUpImage from "../../assets/sign-up-image.svg";
import bluetexLogo from "../../assets/bluetex-logo.svg";

const SignUp = () => {
  return (
    <div className="container">
      <div className="login-wrapper">
        {/* Left Section */}
        <div className="sign-up-left-section">
          <img src={signUpImage} alt="Sign-Up Illustration" />
        </div>

        {/* Right Section */}
        <div className="sign-up-right-section">
          <div className="signup-form">
            <img src={bluetexLogo} alt="Bluetex Logo" />
            <h1>Sign up</h1>
            <p>Let’s get you all set up so you can access your personal account.</p>
            <form>
              <div className="row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" className="sign-up-input"/>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" className="sign-up-input"/>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="john.doe@gmail.com" className="sign-up-input"/>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1234567890" className="sign-up-input"/>
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="************" className="sign-up-input"/>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="************" className="sign-up-input"/>
              </div>
              <div class="privacy-policy-container">
                <input type="checkbox" id="privacyPolicy" />
                <label for="privacyPolicy">
                  I agree to all the <a href="#" class="terms-link">Terms and Privacy Policies</a>
                </label>
              </div>

              <button type="submit" className="create-account-button">
                Create account
              </button>
            </form>
            <div className="signup">
              Already have an account?{" "}
              <a href="/" className="link">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;