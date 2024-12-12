import React from "react";
import signUpImage from "../../assets/sign-up-image.svg";
import bluetexLogo from "../../assets/bluetex-logo.svg";

const SignUp = () => {
  return (
    <div className="sign-up-container">
      <div className="sign-up-wrapper">
        {/* Left Section */}
        <div className="sign-up-left-section">
          <img src={signUpImage} alt="Sign-Up Illustration" />
        </div>

        {/* Right Section */}
        <div className="sign-up-right-section">
          <div className="sign-up-form">
            <img src={bluetexLogo} alt="Bluetex Logo" />
            <h1>Sign up</h1>
            <p>Let’s get you all set up so you can access your personal account.</p>
            <form>
              <div className="sign-up-row">
                <div className="sign-up-form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" className="sign-up-input"/>
                </div>
                <div className="sign-up-form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" className="sign-up-input"/>
                </div>
              </div>
              <div className="sign-up-row">
                <div className="sign-up-form-group">
                  <label>Email</label>
                  <input type="email" placeholder="john.doe@gmail.com" className="sign-up-input"/>
                </div>
                <div className="sign-up-form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1234567890" className="sign-up-input"/>
                </div>
              </div>
              <div className="sign-up-form-group">
                <label>Password</label>
                <input type="password" placeholder="************" className="sign-up-input"/>
              </div>
              <div className="sign-up-form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="************" className="sign-up-input"/>
              </div>
              <div class="sign-up-privacy-policy-container">
                <input type="checkbox" id="privacyPolicy" />
                <label for="privacyPolicy">
                  I agree to all the <a href="#" class="sign-up-terms-link">Terms and Privacy Policies</a>
                </label>
              </div>

              <button type="submit" className="sign-up-create-account-button">
                Create account
              </button>
            </form>
            <div className="sign-up">
              Already have an account?{" "}
              <a href="/" className="sign-up-link">
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