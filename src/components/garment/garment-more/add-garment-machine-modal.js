import React, { useState } from "react";

const AddGarmentMachineModal = ({ onClose, onAddGarmentMachine }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddGarmentMachine = () => {

    const newGarmentMachine = {
      name: formData.name,
    };
    onAddGarmentMachine(newGarmentMachine);
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
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="High Speed">High Speed</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="add-user-modal-button" onClick={handleAddGarmentMachine}>
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

export default AddGarmentMachineModal;