import React from 'react';
import bluetexLogo from "../../assets/bluetex-logo.svg";
import { CiSearch, CiBellOn } from "react-icons/ci";
import UserProfileModal from './user-profile-modal.js';

const Header = () => {
  const [showUserProfileModal, setShowUserProfileModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Your name',
    email: 'yourname@gmail.com',
    mobileNumber: '+44 77 859 6598',
    role: 'Manager',
    profilePicture: 'https://i.imgur.com/KfATw32.png',
  });

  const handleAvatarClick = () => {
    setShowUserProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowUserProfileModal(false);
  };

  const handleSaveUserProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
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
        <div className="notification-icon">
          <CiBellOn />
        </div>
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
              onClose={handleCloseModal}
              user={currentUser}
              onSave={handleSaveUserProfile}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;