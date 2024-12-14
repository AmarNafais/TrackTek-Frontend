import React, { useState } from "react";

const AddGarmentInventoryModal = ({ onClose, onAddGarmentInventory }) => {
  const [formData, setFormData] = useState({
    name: "",
    requiredQuantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddGarmentInventory = () => {

    const newGarmentInventory = {
      name: formData.name,
      requiredQuantity: formData.requiredQuantity,
    };
    onAddGarmentInventory(newGarmentInventory);
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
              type="number"
              name="requiredQuantity"
              placeholder="Required Quantity *"
              value={formData.requiredQuantity}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="add-user-modal-button" onClick={handleAddGarmentInventory}>
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

export default AddGarmentInventoryModal;