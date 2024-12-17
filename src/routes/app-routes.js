import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/login/index.js";
import ForgotPassword from "../components/login/forgot-password.js";
import VerifyCode from "../components/login/verify-code.js";
import SetPassword from "../components/login/set-password.js";
import Dashboard from "../components/dashboard/index.js";
import User from "../components/user/index.js";
import Inventory from "../components/inventory/index.js";
import Order from "../components/order/index.js";
import Customer from "../components/customer/index.js";
import Supplier from "../components/supplier/index.js";
import Garment from "../components/garment/index.js";
import GarmentMore from "../components/garment/garment-more/garment-more.js";
import Machine from "../components/machine/index.js";
import Cost from "../components/cost/index.js";
import Report from "../components/report/index.js";
import ProtectedRoute from "./protected-route.js";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/setpassword" element={<SetPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Supplier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/garment"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Garment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/garment-more/:garmentId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <GarmentMore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/machine"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Machine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cost"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Report />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
