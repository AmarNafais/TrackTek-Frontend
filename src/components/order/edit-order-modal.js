import React, { useState } from "react";

const EditOrderModal = ({ order, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        customerName: order.customerName,
        garmentType: order.garmentType,
        quantity: order.quantity,
        status: order.status,
        date: order.date,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedOrder = {
            ...order,
            customerName: formData.customerName,
            garment: formData.garment,
            quantity: formData.quantity,
            status: formData.status,
            date: formData.date,
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
                    <input
                        type="text"
                        name="garmentType"
                        placeholder="Garment Type *"
                        value={formData.garmentType}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity *"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Completed">Completed</option>
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