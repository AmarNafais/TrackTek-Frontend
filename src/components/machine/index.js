import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddMachineModal from "./add-machine-modal";
import EditMachineModal from "./edit-machine-modal";
import { fetchMachines, updateMachine, deleteMachine } from "../../redux/actions/axios"; // Import update and delete functions

const MachinePage = () => {
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [editMachine, setEditMachine] = useState(null);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMachines = async () => {
    try {
      setLoading(true); // Start loading state
      const machineData = await fetchMachines(); // Fetch machines from the API
      setMachines(machineData);
    } catch (error) {
      console.error("Error fetching machines:", error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    loadMachines(); // Fetch machines on component mount
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMachine(id); // Call the API to delete the machine
      await loadMachines(); // Refresh the table data
    } catch (error) {
      console.error("Error deleting machine:", error.message);
    }
  };

  const handleAddMachine = async (newMachine) => {
    try {
      await loadMachines(); // Refresh the table data
    } catch (error) {
      console.error("Error adding machine:", error.message);
    }
  };

  const handleSaveMachine = async (updatedMachine) => {
    try {
      await loadMachines(); // Refresh the table data
    } catch (error) {
      console.error("Error updating machine:", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Machines</h2>
          <div className="users-table-container">
            <button
              className="add-user-button"
              onClick={() => setShowAddMachineModal(true)}
            >
              Add Machine
            </button>
            {showAddMachineModal && (
              <AddMachineModal
                onClose={() => setShowAddMachineModal(false)}
                onAddMachine={handleAddMachine}
              />
            )}
            {loading ? (
              <p>Loading machines...</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((machine) => (
                    <tr key={machine.id}>
                      <td>{machine.id}</td>
                      <td>{machine.name}</td>
                      <td>{machine.machineType}</td>
                      <td>{machine.machineStatus}</td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => setEditMachine(machine)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDelete(machine.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {editMachine && (
              <EditMachineModal
                machine={editMachine}
                onClose={() => setEditMachine(null)}
                onSave={handleSaveMachine}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MachinePage;
