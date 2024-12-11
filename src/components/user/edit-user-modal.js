import React, { useState } from "react";

const EditUserModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: user.fullName.split(" ")[0],
        lastName: user.fullName.split(" ").slice(1).join(" "),
        email: user.email,
        role: user.role,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedUser = {
            ...user,
            fullName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            role: formData.role,
        };
        onSave(updatedUser);
        onClose();
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
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email ID *"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Select Role Type</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                        <option value="Stock Manager">Stock Manager</option>
                    </select>
                </div>
                <div className="edit-modal-actions">
                    <button className="btn-save" onClick={handleSave}>
                        Edit User
                    </button>
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;