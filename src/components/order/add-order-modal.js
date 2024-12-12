import React, { useState } from "react";

const AddOrderModal = ({ onClose, onAddOrder }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    garmentType: "",
    quantity: "",
    status: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrder = () => {

    const newOrder = {
      customerName: formData.customerName,
      garmentType: formData.garmentType,
      quantity: formData.quantity,
      status: formData.status,
      date: formData.date,
    };
    onAddOrder(newOrder);
    onClose();
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add Order</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name *"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="garmentType"
              placeholder="Garment Type *"
              value={formData.garmentType}
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
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              name="date"
              placeholder="Date *"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="add-user-modal-button" onClick={handleAddOrder}>
            Add Order
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrderModal;