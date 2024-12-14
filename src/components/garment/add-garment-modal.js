import React, { useState } from "react";

const AddGarmentModal = ({ onClose, onAddGarment }) => {
  const [formData, setFormData] = useState({
    name: "",
    design: "",
    category: "",
    sizes: "",
    price: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddGarment = () => {

    const newGarment = {
      name: formData.name,
      design: formData.design,
      category: formData.category,
      sizes: formData.sizes,
      price: formData.price,
      status: formData.status,
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
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="design"
              placeholder="Design *"
              value={formData.design}
              onChange={handleInputChange}
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Casual">Casual</option>
              <option value="Sportswear">Sportswear</option>
              <option value="Formal">Formal</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input
              type="text"
              name="sizes"
              placeholder="Sizes *"
              value={formData.sizes}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price *"
              value={formData.price}
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
              <option value="Available">Available</option>
              <option value="Discontinued">Discontinued</option>
            </select>
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