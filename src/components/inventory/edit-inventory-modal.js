import React, { useState } from "react";

const EditInventoryModal = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        itemName: item.itemName,
        quantity: item.quantity,
        stockLevel: item.stockLevel,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedItem = {
            ...item,
            itemName: formData.itemName,
            quantity: formData.quantity,
            stockLevel: formData.stockLevel,
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
                        name="itemName"
                        placeholder="Item Name *"
                        value={formData.itemName}
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
                        name="stockLevel"
                        placeholder="StockLevel *"
                        value={formData.stockLevel}
                        onChange={handleChange}
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

export default EditInventoryModal;