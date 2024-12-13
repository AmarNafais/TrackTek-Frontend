import React, { useState } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddOrderModal from "./add-order-modal";
import EditOrderModal from "./edit-order-modal";

const OrderPage = () => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [orders, setOrder] = useState([
    { id: 1, customerName: "Lindsey Shroud", garmentType: "Uniforms", quantity: 5, status: "Pending", date: "20-03-2024" },
    { id: 2, customerName: "Sarah Brown", garmentType: "Socks", quantity: 25, status: "Completed", date: "20-03-2024"  },
    { id: 3, customerName: "Michael Owen", garmentType: "Shirts", quantity: 15, status: "Dispatched", date: "20-03-2024"  },
    { id: 4, customerName: "Mary Jane", garmentType: "Shirts", quantity: 10, status: "Pending", date: "20-03-2024"  },
    { id: 5, customerName: "Peter Doodle", garmentType: "Uniforms", quantity: 8, status: "Completed", date: "20-03-2024"  },
  ]);

  const handleDelete = (id) => {
    const updatedOrder = orders.filter((order) => order.id !== id);
    setOrder(updatedOrder);
  };

  const handleAddOrder = (newOrder) => {
    setOrder([...orders, newOrder]);
  };

  const handleSaveOrder = (updatedOrder) => {
    const updatedOrders = orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrder(updatedOrders);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Orders</h2>
          <div className="users-table-container">
            <button className="add-user-button" onClick={() => setShowAddOrderModal(true)}>
              Add Order
            </button>
            {showAddOrderModal && (
              <AddOrderModal
                onClose={() => setShowAddOrderModal(false)}
                onAddOrder={handleAddOrder}
              />
            )}
            <table className="users-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Customer Name</th>
                  <th>Garment Type</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.garmentType}</td>
                    <td>{order.quantity}</td>
                    <td>{order.status}</td>
                    <td>{order.date}</td>
                    <td>
                      <button className="action-button edit-button" onClick={() => setEditOrder(order)}>
                        <FaEdit />
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editOrder && (
              <EditOrderModal
                order={editOrder}
                onClose={() => setEditOrder(null)}
                onSave={handleSaveOrder}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderPage;