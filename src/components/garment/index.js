import React, { useState } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddGarmentModal from "./add-garment-modal";
import EditGarmentModal from "./edit-garment-modal";

const GarmentsPage = () => {
  const [showAddGarmentModal, setShowAddGarmentModal] = useState(false);
  const [editGarment, setEditGarment] = useState(null);
  const [garments, setGarments] = useState([
    { id: 1, type: "Shirts", size: "5", color: "Red", quantity: 15, image: "www.shirts.com" },
    { id: 2, type: "Socks", size: "L", color: "Blue", quantity: 20, image: "www.socks.com" },
    { id: 3, type: "Socks", size: "CM", color: "Yellow", quantity: 25, image: "www.socks.com" },
    { id: 4, type: "Pants", size: "34", color: "Black", quantity: 17, image: "www.pants.com" },
    { id: 5, type: "Kids Socks", size: "XS", color: "Pink", quantity: 25, image: "www.kidssocks.com" },
  ]);

  const handleDelete = (id) => {
    const updatedGarments = garments.filter((garment) => garment.id !== id);
    setGarments(updatedGarments);
  };

  const handleAddGarment = (newGarment) => {
    setGarments([...garments, newGarment]);
  };

  const handleSaveGarment = (updatedGarment) => {
    const updatedGarments = garments.map((garment) =>
      garment.id === updatedGarment.id ? updatedGarment : garment
    );
    setGarments(updatedGarments);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Garments</h2>
          <div className="users-table-container">
            <button className="add-user-button" onClick={() => setShowAddGarmentModal(true)}>
              Add Garment
            </button>
            {showAddGarmentModal && (
              <AddGarmentModal
                onClose={() => setShowAddGarmentModal(false)}
                onAddGarment={handleAddGarment}
              />
            )}
            <table className="users-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {garments.map((garment) => (
                  <tr key={garment.id}>
                    <td>{garment.id}</td>
                    <td>{garment.type}</td>
                    <td>{garment.size}</td>
                    <td>{garment.color}</td>
                    <td>{garment.quantity}</td>
                    <td>{garment.image}</td>
                    <td>
                      <button className="action-button edit-button" onClick={() => setEditGarment(garment)}>
                        <FaEdit />
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(garment.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editGarment && (
              <EditGarmentModal
                garment={editGarment}
                onClose={() => setEditGarment(null)}
                onSave={handleSaveGarment}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GarmentsPage;