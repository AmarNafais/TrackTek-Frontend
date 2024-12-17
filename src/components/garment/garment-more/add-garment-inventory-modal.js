import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addGarmentInventory } from "../../../redux/actions/garment-inventory";
import { fetchMaterials } from "../../../redux/actions/material";

const AddGarmentInventoryModal = ({ onClose, onAddGarmentInventory }) => {
  const { garmentId } = useParams();
  const [formData, setFormData] = useState({
    materialId: "",
    requiredQuantity: "",
    unitOfMeasurement: "",
  });

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const materialsData = await fetchMaterials();
        setMaterials(materialsData);
      } catch (err) {
        setError("Failed to load materials. Please try again.");
      }
    };

    loadMaterials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddGarmentInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const newGarmentInventory = {
        garmentId: parseInt(garmentId, 10),
        materialId: parseInt(formData.materialId, 10),
        requiredQuantity: parseInt(formData.requiredQuantity, 10),
        unitOfMeasurement: formData.unitOfMeasurement,
      };

      const response = await addGarmentInventory(newGarmentInventory);
      onAddGarmentInventory(response);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add garment inventory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add Item</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="number"
              name="garmentId"
              placeholder="Garment ID *"
              value={garmentId}
              readOnly
              required
            />
            <select
              name="materialId"
              value={formData.materialId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Material *</option>
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
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="unitOfMeasurement"
              placeholder="Unit of Measurement *"
              value={formData.unitOfMeasurement}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddGarmentInventory}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Item"}
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
