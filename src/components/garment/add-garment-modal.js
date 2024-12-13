import React, { useState } from "react";

const AddGarmentModal = ({ onClose, onAddGarment }) => {
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    color: "",
    quantity: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddGarment = () => {

    const newGarment = {
      type: formData.type,
      size: formData.size,
      color: formData.color,
      quantity: formData.quantity,
      image: formData.image,
    };
    onAddGarment(newGarment);
    onClose();
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add Garment</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="text"
              name="type"
              placeholder="Type *"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="size"
              placeholder="Size *"
              value={formData.size}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="color"
              placeholder="Color *"
              value={formData.color}
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
              type="text"
              name="image"
              placeholder="Image *"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="add-user-modal-button" onClick={handleAddGarment}>
            Add Garment
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGarmentModal;