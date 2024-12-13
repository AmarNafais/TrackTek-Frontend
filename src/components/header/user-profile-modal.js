import React, { useState } from "react";

const UserProfileModal = ({ onClose, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber);
  const [role, setRole] = useState(user.role);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const predefinedPictures = [
    "https://i.imgur.com/KfATw32.png",
    "https://i.imgur.com/I00VY6z.png",
    "https://i.imgur.com/96G5Zhm.png",
    "https://i.imgur.com/m7YqBpt.png",
    "https://i.imgur.com/fkUDUns.png",
    "https://i.imgur.com/ltaz9eM.png",
    "https://i.imgur.com/FUz08kT.png",
    "https://i.imgur.com/PW7nzjO.png",
  ];

  const handlePictureSelect = (picture) => {
    setProfilePicture(picture);
  };

  const handleSaveChanges = () => {
    const updatedUser = {
      name,
      email,
      mobileNumber,
      role,
      profilePicture,
    };
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="user-profile-modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h3>User Profile</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="profile-picture">
            <img src={profilePicture} alt="Selected Profile" />
            <p>Choose a Profile Picture</p>
            <div className="profile-picture-grid">
              {predefinedPictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture}
                  alt={`Profile ${index}`}
                  className={`profile-option ${
                    profilePicture === picture ? "selected" : ""
                  }`}
                  onClick={() => handlePictureSelect(picture)}
                />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
