import React, { useState } from "react";
import { updateMachine } from "../../redux/actions/axios"; // Import the updateMachine API function

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

    setError(""); // Clear any previous error messages
    setLoading(true); // Show loading state

    try {
      // Prepare the updated machine data
      const updatedMachineData = {
        id: machine.id, // Retain the original ID
        name: formData.name,
        machineType: formData.machineType,
        machineStatus: formData.machineStatus,
      };

      // Call the API to update the machine
      const updatedMachine = await updateMachine(updatedMachineData);

      // Pass the updated machine to the parent component's onSave function
      onSave(updatedMachine);
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message || "Failed to update the machine. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
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
