import React, { useState } from "react";
import { updateOrder } from "../../redux/actions/axios"; // Import the updateOrder API function

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
        customerId: order.customerId,
        orderDate: formatDate(order.orderDate),
        dueDate: formatDate(order.dueDate),
        totalCost: order.totalCost || 0,
        orderStatus: order.orderStatus,
        userId: order.userId,
        garmentId: order.garmentId,
        quantity: order.quantity || 0,
        size: order.size || "",
        id: order.id,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        setError("");
        setLoading(true);

        try {
            const updatedOrder = {
                ...formData,
                totalCost: parseFloat(formData.totalCost),
                quantity: parseInt(formData.quantity, 10),
            };

            const result = await updateOrder(updatedOrder); // Call the API to update the order
            onSave(result); // Pass the updated order to the parent component
            onClose(); // Close the modal
        } catch (err) {
            setError(err.message || "Failed to update order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Order</h2>
                <p>ID - {formData.id}</p>
                <div className="edit-form-row">
                    <input
                        type="number"
                        name="customerId"
                        placeholder="Customer ID *"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                    />
                    <div className="date-input-container">
                        <input
                            type="date"
                            name="orderDate"
                            value={formData.orderDate}
                            onChange={handleChange}
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
                            required
                        />
                        <label className="date-placeholder">Select Due Date</label>
                    </div>
                    <select
                        name="orderStatus"
                        value={formData.orderStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="1">Pending</option>
                        <option value="2">In Progress</option>
                        <option value="3">Completed</option>
                        <option value="4">Canceled</option>
                    </select>
                </div>
                <div className="edit-form-row">
                    <input
                        type="number"
                        name="garmentId"
                        placeholder="Garment ID *"
                        value={formData.garmentId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity *"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="size"
                        placeholder="Size *"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="number"
                        name="totalCost"
                        placeholder="Total Cost *"
                        value={formData.totalCost}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="userId"
                        placeholder="User ID *"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="edit-modal-actions">
                    <button
                        className="btn-save"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        className="btn-cancel"
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

export default EditOrderModal;
