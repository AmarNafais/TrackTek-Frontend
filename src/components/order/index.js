import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddOrderModal from "./add-order-modal";
import EditOrderModal from "./edit-order-modal";
import { fetchOrders, deleteOrder } from "../../redux/actions/axios"; // Import fetchOrders and deleteOrder APIs

const OrderPage = () => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from the API on component mount
  const loadOrders = async () => {
    try {
      setLoading(true); // Start loading
      const ordersData = await fetchOrders(); // Fetch orders
      // Normalize API response for UI display
      const normalizedOrders = ordersData.map((order) => ({
        id: order.id,
        customerName: `Customer #${order.customerId}`, // Replace with actual customer name if available
        orderDate: order.orderDate.split("T")[0], // Format date
        dueDate: order.dueDate.split("T")[0], // Format date
        status: mapOrderStatus(order.orderStatus), // Map numeric status to string
        createdBy: `Garment #${order.garmentId}`, // Replace with actual garment details if available
        quantity: order.quantity,
        size: order.size,
        totalCost: `Rs. ${order.totalCost}`,
      }));
      setOrders(normalizedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    loadOrders(); // Load orders on component mount
  }, []);

  const mapOrderStatus = (status) => {
    const statusMap = {
      1: "Pending",
      2: "In Progress",
      3: "Completed",
      4: "Cancelled",
    };
    return statusMap[status] || "Unknown";
  };
  const statusMap = {
    1: "Pending",
    2: "In Progress",
    3: "Completed",
    4: "Cancelled",
  };

  const handleEditOrder = (order) => {
    const originalOrder = {
      id: order.id,
      customerId: parseInt(order.customerName.replace("Customer #", ""), 10), // Extract ID
      orderDate: `${order.orderDate}T00:00:00.000Z`, // Add time for ISO format
      dueDate: `${order.dueDate}T00:00:00.000Z`,
      orderStatus: Object.keys(statusMap).find(
        (key) => statusMap[key] === order.status
      ), // Map status back to numeric
      garmentId: parseInt(order.createdBy.replace("Garment #", ""), 10), // Extract garment ID
      quantity: order.quantity,
      size: order.size,
      totalCost: parseFloat(order.totalCost.replace("Rs. ", "")), // Remove "Rs." and convert to float
      userId: 0, // Assuming a placeholder or value
    };
    setEditOrder(originalOrder);
  };


  const handleDelete = async (id) => {
    try {
      await deleteOrder(id); // Call the deleteOrder API
      loadOrders(); // Reload orders after deletion
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  const handleAddOrder = (newOrder) => {
    loadOrders(); // Reload orders after adding
  };

  const handleSaveOrder = (updatedOrder) => {
    loadOrders(); // Reload orders after updating
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
                    <th>Garment Info</th>
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
                        <span className={`status-label ${order.status.toLowerCase().replace(" ", "-")}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.createdBy}</td>
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
