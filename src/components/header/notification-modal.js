import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Frankie Sullivan commented on your post: 'This is looking great!'",
      date: "2 hours ago",
    },
    {
      id: 2,
      message: "Amélie Laurent followed you.",
      date: "10 hours ago",
    },
    {
      id: 3,
      message: "Mikah DiStefano uploaded 2 attachments.",
      date: "Yesterday",
    },
  ]);

  const handleDismissNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="notification-modal-container">
      <div className="notification-modal">
        <div className="notification-header-container">
          <h3 className="notification-header">Notifications</h3>
          <button className="close-notification-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
        {notifications.length > 0 ? (
          <ul className="notification-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-date">{notification.date}</span>
                </div>
                <button
                  className="dismiss-notification-btn"
                  onClick={() => handleDismissNotification(notification.id)}
                >
                  <FiX />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-notifications">No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;