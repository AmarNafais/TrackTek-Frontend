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
    { id: 1, customerName: "Lindsey Shroud", orderDate: "2024-03-15", dueDate: "2024-03-15", status: "Pending", createdBy: "Mark" },
    { id: 2, customerName: "Sarah Brown", orderDate: "2024-03-15", dueDate: "2024-03-15", status: "Completed", createdBy: "Sam"  },
    { id: 3, customerName: "Michael Owen", orderDate: "2024-03-15", dueDate: "2024-03-15", status: "In Progress", createdBy: "Henry"  },
    { id: 4, customerName: "Mary Jane", orderDate: "2024-03-15", dueDate: "2024-03-15", status: "Pending", createdBy: "Gotham"  },
    { id: 5, customerName: "Peter Doodle", orderDate: "2024-03-15", dueDate: "2024-03-15", status: "Cancelled", createdBy: "George"  },
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
                  <th>Order Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.dueDate}</td>
                    <td>{order.status}</td>
                    <td>{order.createdBy}</td>
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