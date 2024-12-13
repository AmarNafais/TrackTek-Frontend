import React, { useState } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddMachineModal from "./add-machine-modal";
import EditMachineModal from "./edit-machine-modal";

const MachinePage = () => {
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [editMachine, setEditMachine] = useState(null);
  const [machines, setMachines] = useState([
    { id: 1, type: "High Speed", status: "In Use", availability: "2 hours" },
    { id: 2, type: "Normal", status: "Not In Use", availability: "Available" },
    { id: 3, type: "High Speed", status: "In Use", availability: "2 hours" },
    { id: 4, type: "Normal", status: "Not In Use", availability: "Available" },
    { id: 5, type: "High Speed", status: "In Use", availability: "2 hours" },
  ]);

  const handleDelete = (id) => {
    const updatedMachines = machines.filter((machine) => machine.id !== id);
    setMachines(updatedMachines);
  };

  const handleAddMachine = (newMachine) => {
    setMachines([...machines, newMachine]);
  };

  const handleSaveMachine = (updatedMachine) => {
    const updatedMachines = machines.map((machine) =>
      machine.id === updatedMachine.id ? updatedMachine : machine
    );
    setMachines(updatedMachines);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Machines</h2>
          <div className="users-table-container">
            <button className="add-user-button" onClick={() => setShowAddMachineModal(true)}>
              Add Machine
            </button>
            {showAddMachineModal && (
              <AddMachineModal
                onClose={() => setShowAddMachineModal(false)}
                onAddMachine={handleAddMachine}
              />
            )}
            <table className="users-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine) => (
                  <tr key={machine.id}>
                    <td>{machine.id}</td>
                    <td>{machine.type}</td>
                    <td>{machine.status}</td>
                    <td>{machine.availability}</td>
                    <td>
                      <button className="action-button edit-button" onClick={() => setEditMachine(machine)}>
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