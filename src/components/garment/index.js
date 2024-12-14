import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import AddGarmentModal from "./add-garment-modal";
import EditGarmentModal from "./edit-garment-modal";

const GarmentsPage = () => {
  const [showAddGarmentModal, setShowAddGarmentModal] = useState(false);
  const [editGarment, setEditGarment] = useState(null);
  const navigate = useNavigate();
  const [garments, setGarments] = useState([
    { id: 1, name: "Shirt", design: "www.shirts.com", category: "Casual", sizes: "1-9", price: "Rs. 100", status: "Available" },
    { id: 2, name: "Pant", design: "www.shirts.com", category: "Sportswear", sizes: "1-9", price: "Rs. 500", status: "Available" },
    { id: 3, name: "Skirt", design: "www.shirts.com", category: "Formal", sizes: "1-9", price: "Rs. 200", status: "Discontinued" },
    { id: 4, name: "Socks", design: "www.shirts.com", category: "Accessories", sizes: "XS, S, M, L, XL", price: "Rs. 120", status: "Available" },
    { id: 5, name: "Kids Socks", design: "www.shirts.com", category: "Casual", sizes: "1-9", price: "Rs. 150", status: "Discontinued" },
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

  const handleMoreGarment = () => {
    navigate('/garment-more');
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
                  <th>Name</th>
                  <th>Design</th>
                  <th>Category</th>
                  <th>Sizes</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {garments.map((garment) => (
                  <tr key={garment.id}>
                    <td>{garment.id}</td>
                    <td>{garment.name}</td>
                    <td>{garment.design}</td>
                    <td>{garment.category}</td>
                    <td>{garment.sizes}</td>
                    <td>{garment.price}</td>
                    <td>{garment.status}</td>
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
                      <button className="action-button more-button" onClick={handleMoreGarment}>
                        <SlOptionsVertical />
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