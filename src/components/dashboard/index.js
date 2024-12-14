import React from 'react';
import Sidebar from '../side-nav';
import Header from '../header';
import { HiMiniUsers } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";
import OrdersChart from './orders-pie-chart';
import ProductLogPieChart from './product-log-pie-chart';
import OrderPerformanceLineChart from './order-performance-line-chart';


const Dashboard = () => {
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
                <h3>8</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <HiMiniUsers />
              </i>
              <div className="stat-text">
                <span>Total Users</span>
                <h3>25</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <FaTasks />
              </i>
              <div className="stat-text">
                <span>New Orders</span>
                <h3>25</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <FaTasks />
              </i>
              <div className="stat-text">
                <span>Total Orders</span>
                <h3>25</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <GiSewingMachine />
              </i>
              <div className="stat-text">
                <span>Active Machines</span>
                <h3>10</h3>
              </div>
            </div>
            <div className="stat-card">
              <i className="stat-icon">
                <GiSewingMachine />
              </i>
              <div className="stat-text">
                <span>Total Machines</span>
                <h3>12</h3>
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