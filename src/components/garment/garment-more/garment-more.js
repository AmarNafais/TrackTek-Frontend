import React, { useState } from "react";
import Sidebar from "../../side-nav";
import Header from "../../header";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditGarmentInventoryModal from "./edit-garment-inventory-modal";
import AddGarmentMachineModal from "./add-garment-machine-modal";
import EditGarmentMachineModal from "./edit-garment-machine-modal";
import AddGarmentInventoryModal from "./add-garment-inventory-modal";

const GarmentMorePage = () => {
    const [showAddGarmentInventoryModal, setShowAddGarmentInventoryModal] = useState(false);
    const [showAddGarmentMachineModal, setShowAddGarmentMachineModal] = useState(false);
    const [editGarmentInventory, setEditGarmentInventory] = useState(null);
    const [editGarmentMachine, setEditGarmentMachine] = useState(null);
    const navigate = useNavigate();
    const [garmentInventorys, setGarmentInventorys] = useState([
        { id: 1, name: "Nilon", requiredQuantity: 15 },
        { id: 2, name: "Cotton", requiredQuantity: 20 },
        { id: 3, name: "Yarn", requiredQuantity: 30 },
        { id: 4, name: "Rubber", requiredQuantity: 85 },
    ]);

    const [garmentMachines, setGarmentMachines] = useState([
        { id: 1, name: "High Speed" },
        { id: 2, name: "Normal" },
        { id: 3, name: "High Speed" },
        { id: 4, name: "Normal" },
    ]);

    const handleDeleteGarmentMachine = (id) => {
        setGarmentMachines(garmentMachines.filter((garmentMachine) => garmentMachine.id !== id));
    };

    const handleDeleteGarmentInventory = (id) => {
        setGarmentInventorys(garmentInventorys.filter((garmentInventory) => garmentInventory.id !== id));
    };

    const handleAddGarmentInventory = (newGarmentInventory) => {
        setGarmentInventorys([...garmentInventorys, newGarmentInventory]);
    };

    const handleAddGarmentMachine = (newGarmentMachine) => {
        setGarmentMachines([...garmentMachines, newGarmentMachine]);
    };

    const handleSaveGarmentInventory = (updatedGarmentInventory) => {
        const updatedGarmentInventorys = garmentInventorys.map((garmentInventory) =>
            garmentInventory.id === updatedGarmentInventory.id ? updatedGarmentInventory : garmentInventory
        );
        setGarmentInventorys(updatedGarmentInventorys);
    };

    const handleSaveGarmentMachine = (updatedGarmentMachine) => {
        const updatedGarmentMachines = garmentMachines.map((garmentMachine) =>
            garmentMachine.id === updatedGarmentMachine.id ? updatedGarmentMachine : garmentMachine
        );
        setGarmentMachines(updatedGarmentMachines);
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
                                <button className="add-garment-machine-button" onClick={() => setShowAddGarmentMachineModal(true)}>
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
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {garmentMachines.map((garmentMachine) => (
                                            <tr key={garmentMachine.id}>
                                                <td>{garmentMachine.id}</td>
                                                <td>{garmentMachine.name}</td>
                                                <td>
                                                    <button className="garment-machine-action-button garment-machine-edit-button" onClick={() => setEditGarmentMachine(garmentMachine)}>
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
                                <button className="add-garment-inventory-button" onClick={() => setShowAddGarmentInventoryModal(true)}>
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
                                            <th>Name</th>
                                            <th>Required Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {garmentInventorys.map((garmentInventory) => (
                                            <tr key={garmentInventory.id}>
                                                <td>{garmentInventory.id}</td>
                                                <td>{garmentInventory.name}</td>
                                                <td>{garmentInventory.requiredQuantity}</td>
                                                <td>
                                                    <button className="garment-inventory-action-button garment-inventory-edit-button" onClick={() => setEditGarmentInventory(garmentInventory)}>
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

