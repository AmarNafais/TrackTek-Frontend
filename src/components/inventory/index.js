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
    { id: 1, itemName: "Nike Socks", quantity: 4, stockLevel: "56%" },
    { id: 2, itemName: "Addidas Socks", quantity: 7, stockLevel: "84%" },
    { id: 3, itemName: "Pedlar Shirts", quantity: 8, stockLevel: "5%" },
    { id: 4, itemName: "Mariyul Uniforms", quantity: 4, stockLevel: "32%" },
    { id: 5, itemName: "Pedlar Socks", quantity: 8, stockLevel: "66%" },
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
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Stock Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.stockLevel}</td>
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