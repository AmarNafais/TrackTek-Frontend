import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddCustomerModal from "./add-customer-modal";
import EditCustomerModal from "./edit-customer-modal";
import { fetchCustomers, deleteCustomer } from "../../redux/actions/axios"; // Import the fetchCustomers and deleteCustomer API functions

const CustomersPage = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch customers from the API on component mount
  const loadCustomers = async () => {
    try {
      setLoading(true); // Start loading
      const customersData = await fetchCustomers(); // Fetch customers
      // Map API response to UI-compatible structure
      const normalizedCustomers = customersData.map((customer) => ({
        id: customer.id,
        name: customer.customerName,
        email: customer.customerEmail,
        number: customer.contactNumber,
        address: customer.address,
        status: customer.isActive ? "Active" : "Inactive",
      }));
      setCustomers(normalizedCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id); // Call the deleteCustomer API
      loadCustomers(); // Reload customers after deletion
    } catch (error) {
      console.error("Error deleting customer:", error.message);
    }
  };

  const handleAddCustomer = (newCustomer) => {
    loadCustomers(); // Reload customers after adding
  };

  const handleSaveCustomer = (updatedCustomer) => {
    loadCustomers(); // Reload customers after updating
  };

  const handleToggleCustomerStatus = async (id) => {
    try {
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === id) {
          const newStatus = customer.status === "Active" ? "Inactive" : "Active";
          return { ...customer, status: newStatus };
        }
        return customer;
      });
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error toggling customer status:", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Customers</h2>
          <div className="users-table-container">
            <button
              className="add-user-button"
              onClick={() => setShowAddCustomerModal(true)}
            >
              Add Customer
            </button>
            {showAddCustomerModal && (
              <AddCustomerModal
                onClose={() => setShowAddCustomerModal(false)}
                onAddCustomer={handleAddCustomer}
              />
            )}
            {loading ? (
              <p>Loading customers...</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.number}</td>
                      <td>{customer.address}</td>
                      <td>
                        <button
                          className={`status-button ${customer.status.toLowerCase()}`}
                          onClick={() => handleToggleCustomerStatus(customer.id)}
                        >
                          {customer.status}
                        </button>
                      </td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => setEditCustomer(customer)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {editCustomer && (
              <EditCustomerModal
                customer={editCustomer}
                onClose={() => setEditCustomer(null)}
                onSave={handleSaveCustomer}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomersPage;
