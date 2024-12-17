import React, { useState } from "react";
import { updateMaterial } from "../../redux/actions/material";

const EditInventoryModal = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: item.name,
        unitCost: item.unitCost,
        quantityInStock: item.quantityInStock,
        unit: item.unit,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (!formData.name || !formData.unitCost || !formData.quantityInStock || !formData.unit) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const updatedMaterial = {
                id: item.id,
                name: formData.name,
                unitCost: parseFloat(formData.unitCost),
                quantityInStock: parseInt(formData.quantityInStock, 10),
                unit: formData.unit,
            };

            const result = await updateMaterial(updatedMaterial);
            onSave(result);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Item</h2>
                <p>ID - {item.id}</p>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="unitCost"
                        placeholder="Unit Cost *"
                        value={formData.unitCost}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="number"
                        name="quantityInStock"
                        placeholder="Quantity *"
                        value={formData.quantityInStock}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Unit of Measurement</option>
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="m">m</option>
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
                {error && <div className="error-message">{error}</div>}
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

export default EditInventoryModal;