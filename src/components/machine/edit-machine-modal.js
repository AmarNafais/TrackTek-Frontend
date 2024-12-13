import React, { useState } from "react";

const EditMachineModal = ({ machine, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        type: machine.type,
        status: machine.status,
        availability: machine.availability,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedMachine = {
            ...machine,
            type: formData.type,
            status: formData.status,
            availability: formData.availability,
        };
        onSave(updatedMachine);
        onClose();
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Machine</h2>
                <p>ID - {machine.id}</p>
                <div className="edit-form-row">
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="">Select Machine Type</option>
                        <option value="Normal">Normal</option>
                        <option value="High Speed">High Speed</option>
                    </select>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">Select Status</option>
                        <option value="In Use">In Use</option>
                        <option value="Not In Use">Not In Use</option>
                    </select>
                </div>
                <div className="edit-form-row">
                    <input
                        type="text"
                        name="availability"
                        placeholder="Availability *"
                        value={formData.availability}
                        onChange={handleChange}
                    />
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

export default EditMachineModal;