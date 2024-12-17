import React, { useState, useEffect } from "react";
import { addOrder } from "../../redux/actions/order";
import { fetchCustomers } from "../../redux/actions/customer";
import { fetchGarments } from "../../redux/actions/garment";

const AddOrderModal = ({ onClose, onAddOrder }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    orderDate: "",
    dueDate: "",
    garmentId: "",
    quantity: "",
    size: "",
  });

  const [customers, setCustomers] = useState([]);
  const [garments, setGarments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [customersData, garmentsData] = await Promise.all([
          fetchCustomers(),
          fetchGarments(),
        ]);
        setCustomers(customersData);
        setGarments(garmentsData);
      } catch (err) {
        setError("Failed to load dropdown data. Please try again.");
      }
    };
    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrder = async () => {
    if (
      !formData.customerId ||
      !formData.orderDate ||
      !formData.dueDate ||
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
        garmentId: parseInt(formData.garmentId, 10),
        quantity: parseInt(formData.quantity, 10),
        size: formData.size,
      };

      const addedOrder = await addOrder(newOrder);
      onAddOrder(addedOrder);
      onClose();
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
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Customer *</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.customerName}
                </option>
              ))}
            </select>
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
            <select
              name="garmentId"
              value={formData.garmentId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Garment *</option>
              {garments.map((garment) => (
                <option key={garment.id} value={garment.id}>
                  {garment.name}
                </option>
              ))}
            </select>
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
