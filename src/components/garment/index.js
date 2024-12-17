import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import AddGarmentModal from "./add-garment-modal";
import EditGarmentModal from "./edit-garment-modal";
import { fetchGarments, deleteGarment } from "../../redux/actions/garment";

const GarmentsPage = () => {
  const [showAddGarmentModal, setShowAddGarmentModal] = useState(false);
  const [editGarment, setEditGarment] = useState(null);
  const [garments, setGarments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadGarments = async () => {
    try {
      setLoading(true);
      const garmentsData = await fetchGarments();
      setGarments(garmentsData);
    } catch (error) {
      console.error("Error fetching garments:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGarments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteGarment(id);
      await loadGarments();
    } catch (error) {
      console.error("Error deleting garment:", error.message);
    }
  };

  const handleAddGarment = async (newGarment) => {
    try {
      await loadGarments();
    } catch (error) {
      console.error("Error adding garment:", error.message);
    }
  };

  const handleSaveGarment = async (updatedGarment) => {
    try {
      await loadGarments();
    } catch (error) {
      console.error("Error updating garment:", error.message);
    }
  };

  const handleMoreGarment = (garmentId) => {
    navigate(`/garment-more/${garmentId}`);
  };

  const handleToggleGarmentStatus = async (id) => {
    const updatedGarments = garments.map((garment) => {
      if (garment.id === id) {
        const newStatus =
          garment.garmentStatus === "Available" ? "Discontinued" : "Available";
        return { ...garment, garmentStatus: newStatus };
      }
      return garment;
    });
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
            <button
              className="add-user-button"
              onClick={() => setShowAddGarmentModal(true)}
            >
              Add Garment
            </button>
            {showAddGarmentModal && (
              <AddGarmentModal
                onClose={() => setShowAddGarmentModal(false)}
                onAddGarment={handleAddGarment}
              />
            )}
            {loading ? (
              <p>Loading garments...</p>
            ) : (
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
                      <td>
                        <a href={garment.design} target="_blank" rel="noreferrer">
                          View Design
                        </a>
                      </td>
                      <td>{garment.category}</td>
                      <td>{(garment.sizes?.join(", ")) || "N/A"}</td>
                      <td>Rs. {garment.basePrice}</td>
                      <td>
                        <button
                          className={`status-button ${(garment.garmentStatus?.toLowerCase()) || "unknown"}`}
                          onClick={() => handleToggleGarmentStatus(garment.id)}
                        >
                          {garment.garmentStatus}
                        </button>
                      </td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => setEditGarment(garment)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDelete(garment.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        <button
                          className="action-button more-button"
                          onClick={() => handleMoreGarment(garment.id)}
                        >
                          <SlOptionsVertical />
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
