import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateGarmentInventory } from "../../../redux/actions/garment-inventory";
import { fetchMaterials } from "../../../redux/actions/material";

const EditGarmentInventoryModal = ({ garmentInventory, onClose, onSave }) => {
    const { garmentId } = useParams();
    const [materials, setMaterials] = useState([]);
    const [formData, setFormData] = useState({
        materialId: garmentInventory.materialId,
        requiredQuantity: garmentInventory.requiredQuantity,
        unitOfMeasurement: garmentInventory.unitOfMeasurement,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMaterials = async () => {
            try {
                const materialsData = await fetchMaterials();
                setMaterials(materialsData);
            } catch (err) {
                setError("Failed to fetch materials.");
            }
        };
        loadMaterials();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setError("");

            const updatedGarmentInventory = {
                id: garmentInventory.id,
                garmentId: parseInt(garmentId, 10),
                materialId: parseInt(formData.materialId, 10),
                requiredQuantity: parseInt(formData.requiredQuantity, 10),
                unitOfMeasurement: formData.unitOfMeasurement,
            };

            const response = await updateGarmentInventory(updatedGarmentInventory);
            onSave(response);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update garment inventory. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <h2>Edit Item</h2>
                <p>ID - {garmentInventory.id}</p>
                {error && <p className="error-message">{error}</p>}
                <div className="edit-form-row">
                    <select
                        name="materialId"
                        value={formData.materialId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Material</option>
                        {materials.map((material) => (
                            <option key={material.id} value={material.id}>
                                {material.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="requiredQuantity"
                        placeholder="Required Quantity *"
                        value={formData.requiredQuantity}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="unitOfMeasurement"
                        placeholder="Unit of Measurement *"
                        value={formData.unitOfMeasurement}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-modal-actions">
                    <button className="btn-save" onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Edit Item"}
                    </button>
                    <button className="btn-cancel" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditGarmentInventoryModal;
