import React, { useState } from "react";
import { updateCustomer } from "../../redux/actions/axios"; // Import the updateCustomer API function

const EditCustomerModal = ({ customer, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: customer.name,
        email: customer.email,
        number: customer.number,
        address: customer.address,
        status: customer.status,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        // Validate form data
        if (
            !formData.name ||
            !formData.email ||
            !formData.number ||
            !formData.address ||
            !formData.status
        ) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const updatedCustomerData = {
                id: customer.id,
                customerName: formData.name,
                customerEmail: formData.email,
                contactNumber: formData.number,
                address: formData.address,
                isActive: formData.status === "Active",
            };

            const updatedCustomer = await updateCustomer(updatedCustomerData); // Call the API to update the customer
            onSave({
                id: updatedCustomer.id,
                name: updatedCustomer.customerName,
                email: updatedCustomer.customerEmail,
                number: updatedCustomer.contactNumber,
                address: updatedCustomer.address,
                status: updatedCustomer.isActive ? "Active" : "Inactive",
            }); // Normalize the updated customer data for the parent
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update customer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Customer</h2>
                <p>ID - {customer.id}</p>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="name"
                        placeholder="Customer Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="tel"
                        name="number"
                        placeholder="Phone Number *"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address *"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-form-row">
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
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

export default EditCustomerModal;
