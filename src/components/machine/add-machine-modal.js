import React, { useState } from "react";
import { addMachine } from "../../redux/actions/machine";

const AddMachineModal = ({ onClose, onAddMachine }) => {
  const [formData, setFormData] = useState({
    name: "",
    machineType: "",
    machineStatus: "InActive",
    hourlyRate: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMachine = async () => {
    if (!formData.name || !formData.machineType || !formData.hourlyRate) {
      setError("All fields except status are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newMachine = await addMachine({
        name: formData.name,
        machineType: formData.machineType,
        machineStatus: formData.machineStatus,
        hourlyRate: parseFloat(formData.hourlyRate),
      });

      onAddMachine(newMachine);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add the machine. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <input
              type="text"
              name="name"
              placeholder="Machine Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <select
              name="machineType"
              value={formData.machineType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Machine Type</option>
              <option value="Normal">Normal</option>
              <option value="High Speed">High Speed</option>
            </select>
            <input
              type="number"
              name="hourlyRate"
              placeholder="Hourly Rate *"
              value={formData.hourlyRate}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="machineStatus"
              value={formData.machineStatus}
              readOnly
            />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddMachine}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Machine"}
          </button>
          <button className="cancel-button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMachineModal;
