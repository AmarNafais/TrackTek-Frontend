import React, { useState } from "react";
import { addOrder } from "../../redux/actions/axios"; // Import the addOrder API function

const AddOrderModal = ({ onClose, onAddOrder }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    orderDate: "",
    dueDate: "",
    totalCost: 0,
    orderStatus: "",
    userId: "",
    garmentId: "",
    quantity: "",
    size: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrder = async () => {
    // Validate required fields
    if (
      !formData.customerId ||
      !formData.orderDate ||
      !formData.dueDate ||
      !formData.orderStatus ||
      !formData.userId ||
      !formData.garmentId ||
      !formData.quantity ||
      !formData.size
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newOrder = {
        customerId: parseInt(formData.customerId, 10),
        orderDate: formData.orderDate,
        dueDate: formData.dueDate,
        totalCost: parseFloat(formData.totalCost),
        orderStatus: formData.orderStatus,
        userId: parseInt(formData.userId, 10),
        garmentId: parseInt(formData.garmentId, 10),
        quantity: parseInt(formData.quantity, 10),
        size: formData.size,
      };

      const addedOrder = await addOrder(newOrder); // Call the API to add the order
      onAddOrder(addedOrder); // Pass the added order back to the parent component
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message || "Failed to add order. Please try again.");
    } finally {
      setLoading(false);
    }
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
              type="number"
              name="customerId"
              placeholder="Customer ID *"
              value={formData.customerId}
              onChange={handleInputChange}
              required
            />
            <div className="date-input-container">
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
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
                required
              />
              <label className="date-placeholder">Select Due Date</label>
            </div>
            <input
              type="number"
              name="totalCost"
              placeholder="Total Cost"
              value={formData.totalCost}
              onChange={handleInputChange}
              required
            />
            <select
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Order Status</option>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
            <input
              type="number"
              name="userId"
              placeholder="User ID *"
              value={formData.userId}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="garmentId"
              placeholder="Garment ID *"
              value={formData.garmentId}
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
              name="size"
              placeholder="Size *"
              value={formData.size}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddOrder}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Order"}
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

export default AddOrderModal;
