import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddSupplierModal from "./add-supplier-modal";
import EditSupplierModal from "./edit-supplier-modal";
import { fetchSuppliers, deleteSupplier } from "../../redux/actions/supplier";

const SuppliersPage = () => {
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const suppliersData = await fetchSuppliers();
      const normalizedSuppliers = suppliersData.map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        address: supplier.address,
      }));
      setSuppliers(normalizedSuppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      loadSuppliers();
    } catch (error) {
      console.error("Error deleting supplier:", error.message);
    }
  };

  const handleAddSupplier = () => {
    loadSuppliers();
  };

  const handleSaveSupplier = () => {
    loadSuppliers();
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Suppliers</h2>
          <div className="users-table-container">
            <button
              className="add-user-button"
              onClick={() => setShowAddSupplierModal(true)}
            >
              Add Supplier
            </button>
            {showAddSupplierModal && (
              <AddSupplierModal
                onClose={() => setShowAddSupplierModal(false)}
                onAddSupplier={handleAddSupplier}
              />
            )}
            {loading ? (
              <p>Loading suppliers...</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>{supplier.id}</td>
                      <td>{supplier.name}</td>
                      <td>{supplier.contact}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.address}</td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => setEditSupplier(supplier)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDelete(supplier.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {editSupplier && (
              <EditSupplierModal
                supplier={editSupplier}
                onClose={() => setEditSupplier(null)}
                onSave={handleSaveSupplier}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuppliersPage;
