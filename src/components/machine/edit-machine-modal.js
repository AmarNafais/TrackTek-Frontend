import React, { useState } from "react";
import { updateMachine } from "../../redux/actions/machine";

const EditMachineModal = ({ machine, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: machine.name,
    machineType: machine.machineType,
    machineStatus: machine.machineStatus,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.machineType || !formData.machineStatus) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const updatedMachineData = {
        id: machine.id,
        name: formData.name,
        machineType: formData.machineType,
        machineStatus: formData.machineStatus,
      };
      const updatedMachine = await updateMachine(updatedMachineData);
      onSave(updatedMachine);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update the machine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h2>Edit Machine</h2>
        <p>ID - {machine.id}</p>
        <div className="edit-form-row">
          <input
            type="text"
            name="name"
            placeholder="Machine Name *"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="edit-form-row">
          <select
            name="machineType"
            value={formData.machineType}
            onChange={handleChange}
          >
            <option value="">Select Machine Type</option>
            <option value="Normal">Normal</option>
            <option value="High Speed">High Speed</option>
          </select>
          <select
            name="machineStatus"
            value={formData.machineStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="edit-modal-actions">
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Updating..." : "Edit Machine"}
          </button>
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMachineModal;
