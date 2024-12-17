import React, { useState } from "react";
import { updateSupplier } from "../../redux/actions/supplier";

const EditSupplierModal = ({ supplier, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        address: supplier.address,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (!formData.name || !formData.contact || !formData.email || !formData.address) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const updatedSupplierData = {
                id: supplier.id,
                name: formData.name,
                contact: formData.contact,
                email: formData.email,
                address: formData.address,
            };

            const updatedSupplier = await updateSupplier(updatedSupplierData);
            onSave({
                id: updatedSupplier.id,
                name: updatedSupplier.name,
                contact: updatedSupplier.contact,
                email: updatedSupplier.email,
                address: updatedSupplier.address,
            });
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update supplier. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Supplier</h2>
                <p>ID - {supplier.id}</p>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="name"
                        placeholder="Supplier Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="contact"
                        placeholder="Contact Number *"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
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

export default EditSupplierModal;
