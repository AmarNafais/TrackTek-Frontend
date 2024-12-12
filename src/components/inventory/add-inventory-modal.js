import React, { useState } from "react";

const AddInventoryModal = ({ onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    stockLevel: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = () => {

    const newItem = {
      itemName: formData.itemName,
      quantity: formData.quantity,
      stockLevel: formData.stockLevel+"%"
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
              name="itemName"
              placeholder="Item Name *"
              value={formData.itemName}
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
            <input
              type="number"
              name="stockLevel"
              placeholder="StockLevel *"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
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