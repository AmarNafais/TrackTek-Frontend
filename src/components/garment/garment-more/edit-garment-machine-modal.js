import React, { useState } from "react";

const EditGarmentMachineModal = ({ garmentMachine, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: garmentMachine.name,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedGarmentMachine = {
            ...garmentMachine,
            name: formData.name,
        };
        onSave(updatedGarmentMachine);
        onClose();
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Machine</h2>
                <p>ID - {garmentMachine.id}</p>
                <div className="edit-form-row">
                    <select
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="High Speed">High Speed</option>
                        <option value="Normal">Normal</option>
                    </select>
                </div>
                <div className="edit-modal-actions">
                    <button className="btn-save" onClick={handleSave}>
                        Edit Machine
                    </button>
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditGarmentMachineModal;