import React, { useState } from "react";
import { addSupplier } from "../../redux/actions/supplier";

const AddSupplierModal = ({ onClose, onAddSupplier }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSupplier = async () => {
    if (!formData.name || !formData.contact || !formData.email || !formData.address) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newSupplierData = {
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        address: formData.address,
      };

      const addedSupplier = await addSupplier(newSupplierData);
      onAddSupplier({
        id: addedSupplier.id,
        name: addedSupplier.name,
        contact: addedSupplier.contact,
        email: addedSupplier.email,
        address: addedSupplier.address,
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add Supplier</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Supplier Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number *"
              value={formData.contact}
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
              type="text"
              name="address"
              placeholder="Address *"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddSupplier}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Supplier"}
          </button>
          <button className="cancel-button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierModal;
