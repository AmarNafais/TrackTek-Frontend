import React, { useState } from "react";

const EditInventoryModal = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: item.name,
        unitCost: item.unitCost,
        quantity: item.quantity,
        unitOfMeasurement: item.unitOfMeasurement,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedItem = {
            ...item,
            name: formData.name,
            unitCost: formData.unitCost,
            quantity: formData.quantity,
            unitOfMeasurement: formData.unitOfMeasurement,
        };
        onSave(updatedItem);
        onClose();
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
                        name="quantity"
                        placeholder="Quantity *"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="unitOfMeasurement"
                        value={formData.unitOfMeasurement}
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
                <div className="edit-modal-actions">
                    <button className="btn-save" onClick={handleSave}>
                        Edit Item
                    </button>
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditInventoryModal;