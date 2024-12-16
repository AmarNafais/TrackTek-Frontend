import React, { useState } from "react";
import { addCustomer } from "../../redux/actions/axios"; // Import the addCustomer API function

const AddCustomerModal = ({ onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCustomer = async () => {
    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.address ||
      !formData.status
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newCustomerData = {
        customerName: formData.name,
        customerEmail: formData.email,
        contactNumber: formData.number,
        address: formData.address,
        isActive: formData.status === "Active",
      };

      const addedCustomer = await addCustomer(newCustomerData); // Call the API to add the customer
      onAddCustomer({
        id: addedCustomer.id, // Use the returned ID from the backend
        name: addedCustomer.customerName,
        email: addedCustomer.customerEmail,
        number: addedCustomer.contactNumber,
        address: addedCustomer.address,
        status: addedCustomer.isActive ? "Active" : "Inactive",
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add Customer</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Customer Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="number"
              placeholder="Phone Number *"
              value={formData.number}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address *"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddCustomer}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Customer"}
          </button>
          <button className="cancel-button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
