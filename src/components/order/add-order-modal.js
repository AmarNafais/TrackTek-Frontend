import React, { useState } from "react";

const AddOrderModal = ({ onClose, onAddOrder }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    orderDate: "",
    dueDate: "",
    status: "",
    createdBy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrder = () => {

    const newOrder = {
      customerName: formData.customerName,
      orderDate: formData.orderDate,
      dueDate: formData.dueDate,
      status: formData.status,
      createdBy: formData.createdBy,
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
            <div className="date-input-container">
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
                placeholder=" "
                required
              />
              <label className="date-placeholder">Select Order Date</label>
            </div>
            <div className="date-input-container">
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                placeholder=" "
                required
              />
              <label className="date-placeholder">Select Due Date</label>
            </div>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
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