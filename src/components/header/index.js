import React, { useState, useEffect } from "react";
import bluetexLogo from "../../assets/bluetex-logo.svg";
import { CiSearch, CiBellOn } from "react-icons/ci";
import UserProfileModal from "./user-profile-modal";
import NotificationModal from "./notification-modal";
import { fetchMaterials } from "../../redux/actions/material";
import { fetchOrders } from "../../redux/actions/order";

const Header = () => {
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Your name",
    email: "yourname@gmail.com",
    mobileNumber: "+44 77 859 6598",
    role: "Manager",
    profilePicture: "https://i.imgur.com/KfATw32.png",
  });

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");

    if (userName && userEmail) {
      setCurrentUser((prev) => ({
        ...prev,
        name: userName,
        email: userEmail,
        role: userRole,
      }));
    }
  }, []);

  const fetchLowStockNotifications = async () => {
    try {
      const materials = await fetchMaterials();
      const lowStock = materials
        .filter((material) => material.quantityInStock < 20)
        .map((material) => ({
          id: `low-stock-${material.id}`,
          message: `Low stock: ${material.name} has only ${material.quantityInStock} units left.`,
          date: new Date().toLocaleString(),
        }));
      return lowStock;
    } catch (error) {
      console.error("Error fetching low stock notifications:", error.message);
      return [];
    }
  };

  const fetchOrderNotifications = async () => {
    try {
      const orders = await fetchOrders();
      const recentOrder = orders[orders.length - 1];
      if (recentOrder) {
        return [
          {
            id: `order-${recentOrder.id}`,
            message: `New Order Created: Order ID ${recentOrder.id} for Customer ${recentOrder.customerName}.`,
            date: new Date().toLocaleString(),
          },
        ];
      }
      return [];
    } catch (error) {
      console.error("Error fetching order notifications:", error.message);
      return [];
    }
  };

  const loadNotifications = async () => {
    const lowStockNotifications = await fetchLowStockNotifications();
    const orderNotifications = await fetchOrderNotifications();
    setNotifications([...lowStockNotifications, ...orderNotifications]);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleAvatarClick = () => {
    setShowUserProfileModal(true);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <img src={bluetexLogo} alt="Bluetex Logo" className="header-logo" />
      </div>
      <div className="header-right">
        <div className="search-container">
          <i className="search-icon">
            <CiSearch />
          </i>
          <input
            type="text"
            placeholder="Search for anything..."
            className="search-bar"
          />
        </div>
        <div className="notification-icon" onClick={toggleNotifications}>
          <CiBellOn />
          {notifications.length > 0 && (
            <span className="notification-dot"></span>
          )}
        </div>
        {showNotifications && (
          <NotificationModal
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
          />
        )}
        <div className="user-info">
          <span className="user-name">{currentUser.name}</span>
          <span className="user-location">{currentUser.email}</span>
          <div className="avatar-container" onClick={handleAvatarClick}>
            <img
              src={currentUser.profilePicture}
              alt="User Profile"
              className="user-profile-img"
            />
          </div>
          {showUserProfileModal && (
            <UserProfileModal
              onClose={() => setShowUserProfileModal(false)}
              user={currentUser}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
