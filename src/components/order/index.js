import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddOrderModal from "./add-order-modal";
import EditOrderModal from "./edit-order-modal";
import { fetchOrders, deleteOrder } from "../../redux/actions/order"; 

const OrderPage = () => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const orderStatusMap = {
    0: "Pending",
    1: "InProgress",
    2: "Completed",
    3: "Cancelled",
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await fetchOrders();
      const normalizedOrders = ordersData.map((order) => ({
        id: order.id,
        customerName: order.customerName, 
        orderDate: order.orderDate.split("T")[0],
        dueDate: order.dueDate.split("T")[0], 
        orderStatus: order.orderStatus, 
        orderStatusLabel: orderStatusMap[order.orderStatus],
        garmentName: order.name,
        quantity: order.quantity,
        size: order.size,
        totalCost: `Rs. ${order.totalCost}`,
      }));
      setOrders(normalizedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleEditOrder = (order) => {
    const originalOrder = {
      id: order.id,
      customerId: order.customerName,
      orderDate: `${order.orderDate}T00:00:00.000Z`,
      dueDate: `${order.dueDate}T00:00:00.000Z`,
      orderStatus: order.orderStatus,
      garmentName: order.garmentName,
      quantity: order.quantity,
      size: order.size,
      totalCost: parseFloat(order.totalCost.replace("Rs. ", "")),
      userId: 0,
    };
    setEditOrder(originalOrder);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      loadOrders();
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  const handleAddOrder = () => {
    loadOrders();
  };

  const handleSaveOrder = () => {
    loadOrders();
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Orders</h2>
          <div className="users-table-container">
            <button
              className="add-user-button"
              onClick={() => setShowAddOrderModal(true)}
            >
              Add Order
            </button>
            {showAddOrderModal && (
              <AddOrderModal
                onClose={() => setShowAddOrderModal(false)}
                onAddOrder={handleAddOrder}
              />
            )}
            {loading ? (
              <p>Loading orders...</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Garment Name</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Total Cost</th>
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
                      <td>
                        <span
                          className={`status-label ${order.orderStatusLabel
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {order.orderStatusLabel}
                        </span>
                      </td>
                      <td>{order.garmentName}</td>
                      <td>{order.quantity}</td>
                      <td>{order.size}</td>
                      <td>{order.totalCost}</td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => handleEditOrder(order)}
                        >
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
            )}
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
