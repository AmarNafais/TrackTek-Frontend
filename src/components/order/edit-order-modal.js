import React, { useState } from "react";

const formatDate = (date) => {
    if (!date) return ""; // Handle empty date
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(d.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day}`;
};

const EditOrderModal = ({ order, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        customerName: order.customerName,
        orderDate: formatDate(order.orderDate),
        dueDate: formatDate(order.dueDate),
        status: order.status,
        createdBy: order.createdBy,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedOrder = {
            ...order,
            customerName: formData.customerName,
            orderDate: formData.orderDate,
            dueDate: formData.dueDate,
            status: formData.status,
            createdBy: formData.createdBy,
        };
        onSave(updatedOrder);
        onClose();
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Order</h2>
                <p>ID - {order.id}</p>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name *"
                        value={formData.customerName}
                        onChange={handleChange}
                    />
                    <div className="date-input-container">
                        <input
                            type="date"
                            name="orderDate"
                            value={formData.orderDate}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label className="date-placeholder">Select Order Date</label>
                    </div>
                </div>
                <div className="edit-form-row">
                    <div className="date-input-container">
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label className="date-placeholder">Select Due Date</label>
                    </div>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="edit-modal-actions">
                    <button className="btn-save" onClick={handleSave}>
                        Edit Order
                    </button>
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditOrderModal;