import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddInventoryModal from "./add-inventory-modal";
import EditInventoryModal from "./edit-inventory-modal";
import { fetchMaterials, deleteMaterial } from "../../redux/actions/axios"; // Import fetchMaterials and deleteMaterial API functions

const InventoryPage = () => {
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [editInventory, setEditInventory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch materials from the API
  const loadMaterials = async () => {
    try {
      setLoading(true); // Start loading
      const materials = await fetchMaterials(); // Fetch materials
      // Normalize material data for display
      const normalizedMaterials = materials.map((material, index) => ({
        id: material.id || index + 1, // Use material ID if available
        name: material.name || "N/A",
        unitCost: material.unitCost || 0, // Keep numeric value for unitCost
        quantityInStock: material.quantityInStock || 0,
        unit: material.unit || "N/A",
      }));
      setItems(normalizedMaterials);
    } catch (error) {
      console.error("Error fetching materials:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Load materials on component mount
  useEffect(() => {
    loadMaterials();
  }, []);

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      await deleteMaterial(id); // Call the delete API
      await loadMaterials(); // Reload the table after deletion
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  // Handle item addition
  const handleAddItem = async (newItem) => {
    try {
      await loadMaterials(); // Reload the table after addition
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  // Handle item update
  const handleSaveItem = async (updatedItem) => {
    try {
      await loadMaterials(); // Reload the table after update
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Inventory</h2>
          <div className="users-table-container">
            <button
              className="add-user-button"
              onClick={() => setShowAddInventoryModal(true)}
            >
              Add Item
            </button>
            {showAddInventoryModal && (
              <AddInventoryModal
                onClose={() => setShowAddInventoryModal(false)}
                onAddItem={handleAddItem}
              />
            )}
            {loading ? (
              <p>Loading materials...</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Unit Cost</th>
                    <th>Quantity</th>
                    <th>Unit of Measurement</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>Rs. {item.unitCost}</td>
                      <td>{item.quantityInStock}</td>
                      <td>{item.unit}</td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => setEditInventory(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {editInventory && (
              <EditInventoryModal
                item={editInventory}
                onClose={() => setEditInventory(null)}
                onSave={handleSaveItem}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
