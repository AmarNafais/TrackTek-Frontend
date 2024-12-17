import React, { useState, useEffect } from "react";
import { fetchCustomers } from "../../redux/actions/customer";
import { fetchGarments } from "../../redux/actions/garment";
import { updateOrder } from "../../redux/actions/order";

const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const EditOrderModal = ({ order, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        customerId: order.customerId,
        garmentId: order.garmentId,
        orderDate: formatDate(order.orderDate),
        dueDate: formatDate(order.dueDate),
        totalCost: order.totalCost || 0,
        orderStatus: order.orderStatus,
        quantity: order.quantity || 0,
        size: order.size || "",
        id: order.id,
    });

    const [customers, setCustomers] = useState([]);
    const [garments, setGarments] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadDropdownData = async () => {
            try {
                const [customersData, garmentsData] = await Promise.all([
                    fetchCustomers(),
                    fetchGarments(),
                ]);
                setCustomers(customersData);
                setGarments(garmentsData);
            } catch (err) {
                console.error("Error fetching dropdown data:", err.message);
            }
        };

        loadDropdownData();
    }, []);

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

            const result = await updateOrder(updatedOrder);
            onSave(result);
            onClose();
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
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Customer</option>
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
                        <option value="0">Pending</option>
                        <option value="1">In Progress</option>
                        <option value="2">Completed</option>
                        <option value="3">Canceled</option>
                    </select>
                </div>
                <div className="edit-form-row">
                    <select
                        name="garmentId"
                        value={formData.garmentId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Garment</option>
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
