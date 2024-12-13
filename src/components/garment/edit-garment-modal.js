import React, { useState } from "react";

const EditGarmentModal = ({ garment, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        type: garment.type,
        size: garment.size,
        color: garment.color,
        quantity: garment.quantity,
        image: garment.image,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedGarment = {
            ...garment,
            type: formData.type,
            size: formData.size,
            color: formData.color,
            quantity: formData.quantity,
            image: formData.image,
        };
        onSave(updatedGarment);
        onClose();
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Garment</h2>
                <p>ID - {garment.id}</p>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="type"
                        placeholder="Type *"
                        value={formData.type}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="size"
                        placeholder="Size *"
                        value={formData.size}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="color"
                        placeholder="Color *"
                        value={formData.color}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity *"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="image"
                        placeholder="Image *"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-modal-actions">
                    <button className="btn-save" onClick={handleSave}>
                        Edit Garment
                    </button>
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditGarmentModal;