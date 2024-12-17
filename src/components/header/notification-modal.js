import React from "react";
import { FiX } from "react-icons/fi";

const NotificationModal = ({ notifications, onClose }) => {
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
