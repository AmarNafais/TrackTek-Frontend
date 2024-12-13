import React, { useState } from "react";

const AddMachineModal = ({ onClose, onAddMachine }) => {
    const [formData, setFormData] = useState({
        type: "",
        status: "",
        availability: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddMachine = () => {

        const newMachine = {
            type: formData.type,
            status: formData.status,
            availability: formData.availability,
        };
        onAddMachine(newMachine);
        onClose();
    };

    return (
        <div className="add-user-modal">
            <div className="add-modal-overlay" onClick={onClose}></div>
            <div className="add-modal-content">
                <div className="add-modal-header">
                    <h3>Add Machine</h3>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="add-modal-body">
                    <div className="form-grid">
                    <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Machine Type</option>
                            <option value="Normal">Normal</option>
                            <option value="High Speed">High Speed</option>
                        </select>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="In Use">In Use</option>
                            <option value="Not In Use">Not In Use</option>
                        </select>
                        <input
                            type="text"
                            name="availability"
                            placeholder="Availability *"
                            value={formData.availability}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="add-user-modal-button" onClick={handleAddMachine}>
                        Add Machine
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMachineModal;