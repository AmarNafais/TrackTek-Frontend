import React, { useState } from "react";
import { updateGarment } from "../../redux/actions/axios"; // Import the updateGarment API function

const EditGarmentModal = ({ garment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: garment.name,
    design: garment.design,
    categoryType: garment.categoryType,
    sizes: garment.sizes.join(", "), // Convert array to comma-separated string
    basePrice: garment.basePrice,
    garmentStatus: garment.garmentStatus,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    // Validate required fields
    if (
      !formData.name ||
      !formData.design ||
      !formData.categoryType ||
      !formData.sizes ||
      !formData.basePrice ||
      !formData.garmentStatus
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const updatedGarmentData = {
        id: garment.id,
        name: formData.name,
        design: formData.design,
        categoryType: formData.categoryType,
        sizes: formData.sizes.split(",").map((size) => size.trim()), // Convert comma-separated sizes to an array
        basePrice: parseFloat(formData.basePrice),
        garmentStatus: formData.garmentStatus,
      };

      // Call the API to update the garment
      const updatedGarment = await updateGarment(updatedGarmentData);

      // Call onSave to update parent component state
      onSave(updatedGarment);
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message || "Failed to update garment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h2>Edit Garment</h2>
        <p>ID - {garment.id}</p>
        <div className="edit-form-row">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="design"
            placeholder="Design URL *"
            value={formData.design}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-form-row">
          <select
            name="categoryType"
            value={formData.categoryType}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Casual">Casual</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Formal">Formal</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input
            type="text"
            name="sizes"
            placeholder="Sizes (comma-separated) *"
            value={formData.sizes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-form-row">
          <input
            type="number"
            name="basePrice"
            placeholder="Base Price *"
            value={formData.basePrice}
            onChange={handleChange}
            required
          />
          <select
            name="garmentStatus"
            value={formData.garmentStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
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

export default EditGarmentModal;
