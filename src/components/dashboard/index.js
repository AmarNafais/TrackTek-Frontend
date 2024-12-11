import React from 'react';
import Sidebar from '../side-nav';
import Header from '../header';
import { HiMiniUsers } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";
import ordersChart from '../../assets/orders-chart.svg';
import productLogChart from '../../assets/product-log-chart.svg';
import orderPerformanceChart from '../../assets/order-performance-chart.svg';


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
            <img src={ordersChart} alt="Orders Chart" className="chart-placeholder" />
          </div>
          <div className="product-log-chart-card">
            <img src={productLogChart} alt="Product Log Chart" className="chart-placeholder" />
          </div>
          <div className="order-performance-chart-card">
            <img src={orderPerformanceChart} alt="Order Performance Chart" className="chart-placeholder" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;