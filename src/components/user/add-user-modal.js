import React, { useState } from "react";
import { addUser } from "../../redux/actions/user";

const AddUserModal = ({ onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      setLoading(true);
      setError("");

      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        isActive: true,
      };

      const response = await addUser(newUser);
      onAddUser(response);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add User</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID *"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role Type</option>
              <option value="SuperAdmin">Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="InventoryManager">Inventory Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddUser}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
          <button className="cancel-button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;