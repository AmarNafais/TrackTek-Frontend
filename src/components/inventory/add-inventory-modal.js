import React, { useState } from "react";

const AddInventoryModal = ({ onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    unitCost: "",
    quantity: "",
    unitOfMeasurement: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = () => {

    const newItem = {
      name: formData.name,
      unitCost: formData.unitCost,
      quantity: formData.quantity,
      unitOfMeasurement: formData.unitOfMeasurement,
    };
    onAddItem(newItem);
    onClose();
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
              name="quantity"
              placeholder="Quantity *"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
            <select
              name="unitOfMeasurement"
              value={formData.unitOfMeasurement}
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
        </div>
        <div className="modal-footer">
          <button className="add-user-modal-button" onClick={handleAddItem}>
            Add Item
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInventoryModal;