import React, { useState } from "react";
import { addMaterial } from "../../redux/actions/material";

const AddInventoryModal = ({ onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    unitCost: "",
    quantityInStock: "",
    unit: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = async () => {
    if (!formData.name || !formData.unitCost || !formData.quantityInStock || !formData.unit) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newMaterial = {
        name: formData.name,
        unitCost: parseFloat(formData.unitCost),
        quantityInStock: parseInt(formData.quantityInStock, 10),
        unit: formData.unit,
      };

      const addedMaterial = await addMaterial(newMaterial);
      onAddItem(addedMaterial);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add Item</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="unitCost"
              placeholder="Unit Cost *"
              value={formData.unitCost}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="quantityInStock"
              placeholder="Quantity *"
              value={formData.quantityInStock}
              onChange={handleInputChange}
              required
            />
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Unit of Measurement</option>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="mg">mg</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddItem}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
          <button
            className="cancel-button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInventoryModal;
