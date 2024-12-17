import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../side-nav";
import Header from "../../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditGarmentInventoryModal from "./edit-garment-inventory-modal";
import AddGarmentMachineModal from "./add-garment-machine-modal";
import EditGarmentMachineModal from "./edit-garment-machine-modal";
import AddGarmentInventoryModal from "./add-garment-inventory-modal";
import { fetchMachines } from "../../../redux/actions/machine";
import { fetchMaterials } from "../../../redux/actions/material";
import { fetchGarmentMachines,deleteGarmentMachine } from "../../../redux/actions/garment-machine";
import { deleteGarmentInventory,fetchGarmentInventory } from "../../../redux/actions/garment-inventory";

const GarmentMorePage = () => {
  const { garmentId } = useParams();
  const [showAddGarmentInventoryModal, setShowAddGarmentInventoryModal] = useState(false);
  const [showAddGarmentMachineModal, setShowAddGarmentMachineModal] = useState(false);
  const [editGarmentInventory, setEditGarmentInventory] = useState(null);
  const [editGarmentMachine, setEditGarmentMachine] = useState(null);
  const [garmentInventorys, setGarmentInventorys] = useState([]);
  const [garmentMachines, setGarmentMachines] = useState([]);
  const [machines, setMachines] = useState([]);
  const [materials, setMaterials] = useState([]);
  const loadGarmentDetails = async () => {
    try {
      const [machinesData, garmentMachinesData, garmentInventoryData, materialsData] =
        await Promise.all([
          fetchMachines(),
          fetchGarmentMachines(),
          fetchGarmentInventory(),
          fetchMaterials(),
        ]);

      setMachines(machinesData);
      setMaterials(materialsData);

      setGarmentMachines(
        garmentMachinesData.filter((machine) => machine.garmentId === parseInt(garmentId))
      );
      setGarmentInventorys(
        garmentInventoryData.filter((item) => item.garmentId === parseInt(garmentId))
      );
    } catch (error) {
      console.error("Error loading garment details:", error.message);
    }
  };

  useEffect(() => {
    loadGarmentDetails();
  }, [garmentId]);

  const getMachineName = (machineId) => {
    const machine = machines.find((m) => m.id === machineId);
    return machine ? machine.name : "Unknown";
  };

  const getMaterialName = (materialId) => {
    const material = materials.find((m) => m.id === materialId);
    return material ? material.name : "Unknown";
  };

  const handleDeleteGarmentMachine = async (id) => {
    try {
      await deleteGarmentMachine(id);
      await loadGarmentDetails();
    } catch (error) {
      console.error("Error deleting garment machine:", error.message);
    }
  };

  const handleDeleteGarmentInventory = async (id) => {
    try {
      await deleteGarmentInventory(id);
      await loadGarmentDetails();
    } catch (error) {
      console.error("Error deleting garment inventory:", error.message);
    }
  };

  const handleAddGarmentInventory = async (newGarmentInventory) => {
    await loadGarmentDetails();
  };

  const handleAddGarmentMachine = async (newGarmentMachine) => {
    await loadGarmentDetails();
  };

  const handleSaveGarmentInventory = async (updatedGarmentInventory) => {
    await loadGarmentDetails();
  };

  const handleSaveGarmentMachine = async (updatedGarmentMachine) => {
    await loadGarmentDetails();
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="garment-more-page">
          <div className="garment-tables-container">
            <div className="garment-table-column">
              <div className="garment-machine-table-container">
                <h3>Machine</h3>
                <button
                  className="add-garment-machine-button"
                  onClick={() => setShowAddGarmentMachineModal(true)}
                >
                  Add Machine
                </button>
                {showAddGarmentMachineModal && (
                  <AddGarmentMachineModal
                    onClose={() => setShowAddGarmentMachineModal(false)}
                    onAddGarmentMachine={handleAddGarmentMachine}
                  />
                )}
                <table className="garment-machine-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Machine Name</th>
                      <th>Hours Required</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {garmentMachines.map((garmentMachine) => (
                      <tr key={garmentMachine.id}>
                        <td>{garmentMachine.machineId}</td>
                        <td>{getMachineName(garmentMachine.machineId)}</td>
                        <td>{garmentMachine.hoursRequired}</td>
                        <td>
                          <button
                            className="garment-machine-action-button garment-machine-edit-button"
                            onClick={() => setEditGarmentMachine(garmentMachine)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="garment-machine-action-button garment-machine-delete-button"
                            onClick={() => handleDeleteGarmentMachine(garmentMachine.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {editGarmentMachine && (
                  <EditGarmentMachineModal
                    garmentMachine={editGarmentMachine}
                    onClose={() => setEditGarmentMachine(null)}
                    onSave={handleSaveGarmentMachine}
                  />
                )}
              </div>
            </div>

            <div className="garment-table-column">
              <div className="garment-inventory-table-container">
                <h3>Inventory</h3>
                <button
                  className="add-garment-inventory-button"
                  onClick={() => setShowAddGarmentInventoryModal(true)}
                >
                  Add Item
                </button>
                {showAddGarmentInventoryModal && (
                  <AddGarmentInventoryModal
                    onClose={() => setShowAddGarmentInventoryModal(false)}
                    onAddGarmentInventory={handleAddGarmentInventory}
                  />
                )}
                <table className="garment-inventory-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Material Name</th>
                      <th>Required Quantity</th>
                      <th>Unit</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {garmentInventorys.map((garmentInventory) => (
                      <tr key={garmentInventory.id}>
                        <td>{garmentInventory.materialId}</td>
                        <td>{getMaterialName(garmentInventory.materialId)}</td>
                        <td>{garmentInventory.requiredQuantity}</td>
                        <td>{garmentInventory.unitOfMeasurement}</td>
                        <td>
                          <button
                            className="garment-inventory-action-button garment-inventory-edit-button"
                            onClick={() => setEditGarmentInventory(garmentInventory)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="garment-inventory-action-button garment-inventory-delete-button"
                            onClick={() => handleDeleteGarmentInventory(garmentInventory.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {editGarmentInventory && (
                  <EditGarmentInventoryModal
                    garmentInventory={editGarmentInventory}
                    onClose={() => setEditGarmentInventory(null)}
                    onSave={handleSaveGarmentInventory}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GarmentMorePage;
