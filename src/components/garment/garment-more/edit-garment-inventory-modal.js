import React, { useState } from "react";

const EditGarmentInventoryModal = ({ garmentInventory, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: garmentInventory.name,
        requiredQuantity: garmentInventory.requiredQuantity,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedGarmentInventory = {
            ...garmentInventory,
            name: formData.name,
            requiredQuantity: formData.requiredQuantity,
        };
        onSave(updatedGarmentInventory);
        onClose();
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Item</h2>
                <p>ID - {garmentInventory.id}</p>
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
                        type="number"
                        name="requiredQuantity"
                        placeholder="Required Quantity *"
                        value={formData.requiredQuantity}
                        onChange={handleChange}
                        required
                    />
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

export default EditGarmentInventoryModal;