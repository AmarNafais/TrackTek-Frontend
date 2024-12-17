import React, { useState } from "react";
import { addGarment } from "../../redux/actions/garment";

const AddGarmentModal = ({ onClose, onAddGarment }) => {
  const [formData, setFormData] = useState({
    name: "",
    design: "",
    categoryType: "",
    sizes: "",
    basePrice: "",
    garmentStatus: "",
    laborHoursPerUnit: "",
    hourlyLaborRate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddGarment = async () => {
    if (
      !formData.name ||
      !formData.design ||
      !formData.categoryType ||
      !formData.sizes ||
      !formData.basePrice ||
      !formData.garmentStatus ||
      !formData.laborHoursPerUnit ||
      !formData.hourlyLaborRate
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const sizesArray = formData.sizes.split(",").map((size) => size.trim());
      if (sizesArray.length === 0) {
        throw new Error("Sizes cannot be empty.");
      }

      const garmentData = {
        name: formData.name,
        design: formData.design,
        categoryType: formData.categoryType,
        sizes: sizesArray,
        basePrice: parseFloat(formData.basePrice),
        garmentStatus: formData.garmentStatus,
        laborHoursPerUnit: parseFloat(formData.laborHoursPerUnit),
        hourlyLaborRate: parseFloat(formData.hourlyLaborRate),
      };

      const newGarment = await addGarment(garmentData);
      if (newGarment) {
        onAddGarment(newGarment);
        onClose();
      }
    } catch (err) {
      console.error("Error adding garment:", err);
      setError(err.message || "Failed to add garment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-modal">
      <div className="add-modal-overlay" onClick={onClose}></div>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Add Garment</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-modal-body">
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="design"
              placeholder="Design URL *"
              value={formData.design}
              onChange={handleInputChange}
              required
            />
            <select
              name="categoryType"
              value={formData.categoryType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Casual">Casual</option>
              <option value="SportsWear">SportsWear</option>
              <option value="Formal">Formal</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma-separated) *"
              value={formData.sizes}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="basePrice"
              placeholder="Base Price *"
              value={formData.basePrice}
              onChange={handleInputChange}
              required
            />
            <select
              name="garmentStatus"
              value={formData.garmentStatus}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            <input
              type="number"
              name="laborHoursPerUnit"
              placeholder="Labor Hours Per Unit *"
              value={formData.laborHoursPerUnit}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="hourlyLaborRate"
              placeholder="Hourly Labor Rate *"
              value={formData.hourlyLaborRate}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button
            className="add-user-modal-button"
            onClick={handleAddGarment}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Garment"}
          </button>
          <button className="cancel-button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGarmentModal;
