import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddInventoryModal from "./add-inventory-modal";
import EditInventoryModal from "./edit-inventory-modal";
import NotificationModal from "../header/notification-modal";
import { fetchMaterials, deleteMaterial } from "../../redux/actions/material";

const InventoryPage = () => {
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [editInventory, setEditInventory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const loadMaterials = async () => {
    try {
      setLoading(true);
      const materials = await fetchMaterials();
      const normalizedMaterials = materials.map((material, index) => ({
        id: material.id || index + 1,
        name: material.name || "N/A",
        unitCost: material.unitCost || 0,
        quantityInStock: material.quantityInStock || 0,
        unit: material.unit || "N/A",
      }));
      setItems(normalizedMaterials);

      const lowStockNotifications = normalizedMaterials
        .filter((material) => material.quantityInStock < 20)
        .map((material) => ({
          id: `low-stock-${material.id}`,
          message: `Low in stock: ${material.name} has only ${material.quantityInStock} units left.`,
          date: "Just now",
        }));
      setNotifications(lowStockNotifications);
    } catch (error) {
      console.error("Error fetching materials:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <button className="notification-button" onClick={() => setShowNotificationModal(true)}>
          Notifications
        </button>

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
                onAddItem={loadMaterials}
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
                          onClick={() => deleteMaterial(item.id).then(loadMaterials)}
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
                onSave={loadMaterials}
              />
            )}
          </div>
        </div>
      </main>

      {showNotificationModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowNotificationModal(false)}
        />
      )}
    </div>
  );
};

export default InventoryPage;
