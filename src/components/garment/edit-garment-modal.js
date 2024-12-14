import React, { useState } from "react";

const EditGarmentModal = ({ garment, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: garment.name,
        design: garment.design,
        category: garment.category,
        sizes: garment.sizes,
        price: garment.price,
        status: garment.status,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedGarment = {
            ...garment,
            name: formData.name,
            design: formData.design,
            category: formData.category,
            sizes: formData.sizes,
            price: formData.price,
            status: formData.status,
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
                        name="name"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="design"
                        placeholder="Design *"
                        value={formData.design}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-form-row">
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Casual">Casual</option>
                        <option value="Sportswear">Sportswear</option>
                        <option value="Formal">Formal</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                    <input
                        type="text"
                        name="sizes"
                        placeholder="Sizes *"
                        value={formData.sizes}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="price"
                        placeholder="Price *"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Discontinued">Discontinued</option>
                    </select>
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