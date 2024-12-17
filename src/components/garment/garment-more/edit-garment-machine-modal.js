import React, { useState, useEffect } from "react";
import { updateGarmentMachine } from "../../../redux/actions/garment-machine";
import { fetchMachines } from "../../../redux/actions/machine";

const EditGarmentMachineModal = ({ garmentMachine, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        garmentId: garmentMachine.garmentId,
        machineId: garmentMachine.machineId,
        hoursRequired: garmentMachine.hoursRequired,
        id: garmentMachine.id,
    });
    const [machines, setMachines] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadMachines = async () => {
            try {
                const machineData = await fetchMachines();
                setMachines(machineData);
            } catch (err) {
                setError("Failed to load machines. Please try again.");
            }
        };
        loadMachines();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        setLoading(true);
        setError("");
        try {
            const updatedGarmentMachine = {
                ...formData,
                machineId: parseInt(formData.machineId, 10),
                hoursRequired: parseInt(formData.hoursRequired, 10),
            };

            const response = await updateGarmentMachine(updatedGarmentMachine);
            onSave(response);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update garment machine. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Machine</h2>
                <p>ID - {formData.id}</p>
                <div className="edit-form-row">
                    <select
                        name="machineId"
                        value={formData.machineId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Machine</option>
                        {machines.map((machine) => (
                            <option key={machine.id} value={machine.id}>
                                {machine.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="edit-form-row">
                    <input
                        type="number"
                        name="hoursRequired"
                        placeholder="Hours Required *"
                        value={formData.hoursRequired}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="edit-modal-actions">
                    <button
                        className="btn-save"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
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

export default EditGarmentMachineModal;
