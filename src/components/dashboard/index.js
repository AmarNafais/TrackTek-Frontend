import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { HiMiniUsers } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";
import OrdersChart from "./orders-pie-chart";
import ProductLogPieChart from "./product-log-pie-chart";
import OrderPerformanceLineChart from "./order-performance-line-chart";
import { fetchUsers } from "../../redux/actions/user";
import { fetchMachines } from "../../redux/actions/machine";
import { fetchOrders } from "../../redux/actions/order";

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [activeMachines, setActiveMachines] = useState(0);
  const [totalMachines, setTotalMachines] = useState(0);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        const activeCount = usersData.filter((user) => user.isActive).length;
        setActiveUsers(activeCount);
        setTotalUsers(usersData.length);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    const loadOrders = async () => {
      try {
        const ordersData = await fetchOrders();
        const pendingCount = ordersData.filter(
          (order) => order.orderStatus === 1
        ).length;
        setPendingOrders(pendingCount);
        setTotalOrders(ordersData.length);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    const loadMachines = async () => {
      try {
        const machinesData = await fetchMachines();
        const activeCount = machinesData.filter(
          (machine) => machine.machineStatus === "Active"
        ).length;
        setActiveMachines(activeCount);
        setTotalMachines(machinesData.length);
      } catch (error) {
        console.error("Error fetching machines:", error.message);
      }
    };

    loadUsers();
    loadOrders();
    loadMachines();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="dashboard-overview">
          <div className="stats-summary">
            <div className="stat-card">
              <i className="stat-icon">
                <HiMiniUsers />
              </i>
              <div className="stat-text">
                <span>Active Users</span>
                <h3>{activeUsers}</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <HiMiniUsers />
              </i>
              <div className="stat-text">
                <span>Total Users</span>
                <h3>{totalUsers}</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <FaTasks />
              </i>
              <div className="stat-text">
                <span>Pending Orders</span>
                <h3>{pendingOrders}</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <FaTasks />
              </i>
              <div className="stat-text">
                <span>Total Orders</span>
                <h3>{totalOrders}</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <GiSewingMachine />
              </i>
              <div className="stat-text">
                <span>Active Machines</span>
                <h3>{activeMachines}</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <GiSewingMachine />
              </i>
              <div className="stat-text">
                <span>Total Machines</span>
                <h3>{totalMachines}</h3>
              </div>
            </div>
          </div>
          <div className="orders-chart-card">
            <OrdersChart />
          </div>
          <div className="product-log-chart-card">
            <ProductLogPieChart />
          </div>
          <div className="order-performance-chart-card">
            <OrderPerformanceLineChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
