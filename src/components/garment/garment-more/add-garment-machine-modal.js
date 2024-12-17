import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addGarmentMachine } from "../../../redux/actions/garment-machine";
import { fetchMachines } from "../../../redux/actions/machine";

const AddGarmentInventoryModal = ({ onClose, onAddGarmentMachine }) => {
  const { garmentId } = useParams();

  const [formData, setFormData] = useState({
    machineId: "",
    hoursRequired: "",
  });

  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMachines = async () => {
      try {
        const machineData = await fetchMachines();
        setMachines(machineData);
      } catch (err) {
        setError("Failed to fetch machines. Please try again.");
      }
    };

    loadMachines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddGarmentMachine = async () => {
    try {
      setLoading(true);
      setError("");

      const newGarmentMachine = {
        garmentId: parseInt(garmentId, 10),
        machineId: parseInt(formData.machineId, 10),
        hoursRequired: parseInt(formData.hoursRequired, 10),
      };

      const response = await addGarmentMachine(newGarmentMachine);
      onAddGarmentMachine(response);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add garment machine. Please try again.");
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
              name="garmentId"
              value={garmentId}
              readOnly
              placeholder="Garment ID"
            />
            <select
              name="machineId"
              value={formData.machineId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Machine</option>
              {machines.map((machine) => (
                <option key={machine.id} value={machine.id}>
                  {machine.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="hoursRequired"
              placeholder="Hours Required *"
              value={formData.hoursRequired}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddGarmentMachine}
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

export default AddGarmentInventoryModal;
