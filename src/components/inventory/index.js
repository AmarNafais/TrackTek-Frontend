import React, { useState } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddInventoryModal from "./add-inventory-modal";
import EditInventoryModal from "./edit-inventory-modal";

const InventoryPage = () => {
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [editInventory, setEditInventory] = useState(null);
  const [items, setItems] = useState([
    { id: 1, name: "Cotton", unitCost: "Rs. 100", quantity: 5, unitOfMeasurement: "cm" },
    { id: 2, name: "Yarn", unitCost: "Rs. 120", quantity: 15, unitOfMeasurement: "g" },
    { id: 3, name: "Nilon", unitCost: "Rs. 75", quantity: 8, unitOfMeasurement: "kg" },
    { id: 4, name: "Rubber", unitCost: "Rs. 150", quantity: 6, unitOfMeasurement: "mm" },
    { id: 5, name: "Cotton", unitCost: "Rs. 200", quantity: 4, unitOfMeasurement: "m" },
  ]);

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleSaveItem = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Inventory</h2>
          <div className="users-table-container">
            <button className="add-user-button" onClick={() => setShowAddInventoryModal(true)}>
              Add Item
            </button>
            {showAddInventoryModal && (
              <AddInventoryModal
                onClose={() => setShowAddInventoryModal(false)}
                onAddItem={handleAddItem}
              />
            )}
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
                    <td>{item.unitCost}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitOfMeasurement}</td>
                    <td>
                      <button className="action-button edit-button" onClick={() => setEditInventory(item)}>
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