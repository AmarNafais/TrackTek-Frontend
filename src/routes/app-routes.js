import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/login/login.js";
import SignUp from "../components/login/sign-up.js"
import ForgotPassword from "../components/login/forgot-password.js"
import VerifyCode from "../components/login/verify-code.js"
import SetPassword from "../components/login/set-password.js"
import Dashboard from "../components/dashboard/index.js"
import User from "../components/user/index.js"
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/setpassword" element={<SetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;