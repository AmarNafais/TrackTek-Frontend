import React, { useState } from "react";
import { updateUser } from "../../redux/actions/user";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: user.fullName.split(" ")[0],
    lastName: user.fullName.split(" ").slice(1).join(" "),
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    const updatedUser = {
      id: user.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      isActive: formData.isActive,
    };

    try {
      const response = await updateUser(updatedUser);
      onSave(response);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h2>Edit User</h2>
        <p>ID - {user.id}</p>
        <div className="edit-form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-form-row">
          <input
            type="email"
            name="email"
            placeholder="Email ID *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role Type</option>
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="Manager">Manager</option>
            <option value="Inventory Manager">Inventory Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="edit-modal-actions">
          <button className="btn-save" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Edit User"}
          </button>
          <button className="btn-cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;