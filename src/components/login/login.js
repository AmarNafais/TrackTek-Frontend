import React from "react";
import loginImage from "../../assets/login-image.svg";
import bluetexLogo from "../../assets/bluetex-logo.svg";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left-section">
          <div className="login-form">
            <img src={bluetexLogo} alt="Bluetex Logo" />
            <h1>Login</h1>
            <p>Login to access your bluetex account</p>
            <form>
              <div className="login-form-group">
                <label>Email</label>
                <input type="email" placeholder="example@gmail.com" className="login-input"/>
              </div>
              <div className="login-form-group">
                <label>Password</label>
                <input type="password" placeholder="************" className="login-input"/>
              </div>
              <div className="login-button-group">
                <div class="login-remember-me-container">
                  <input type="checkbox" id="rememberMe" />
                  <label for="rememberMe">Remember me</label>
                </div>
                <a href="/forgotpassword" className="login-forget-password-link">
                  Forgot Password?
                </a>
              </div>
              <button className="login-button" type="submit">Login</button>
            </form>
            <div className="login-signup">
              Don’t have an account? <a href="/signup" className="login-sign-up-link">Sign up</a>
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