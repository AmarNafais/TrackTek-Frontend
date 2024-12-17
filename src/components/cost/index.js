import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import ProductionDonutChart from "./production-donut-chart.js";
import EarningSummaryChart from "./earning-summary-chart.js";
import { fetchOrders } from "../../redux/actions/order";
import { fetchCosts } from "../../redux/actions/cost";

const CostsPage = () => {
    const [expensesTotal, setExpensesTotal] = useState(0);
    const [orders, setOrders] = useState([]);
    const [loadingCosts, setLoadingCosts] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const orderStatusMap = {
        0: "Pending",
        1: "In Progress",
        2: "Completed",
        3: "Cancelled",
    };

    const loadCosts = async () => {
        try {
            setLoadingCosts(true);
            const costs = await fetchCosts();
            const totalExpenses = costs.reduce((sum, cost) => sum + cost.totalCost, 0);
            setExpensesTotal(totalExpenses);
        } catch (error) {
            console.error("Error fetching costs:", error.message);
        } finally {
            setLoadingCosts(false);
        }
    };

    const loadOrders = async () => {
        try {
            setLoadingOrders(true);
            const ordersData = await fetchOrders();
            const normalizedOrders = ordersData.map((order) => ({
                id: order.id,
                customerName: order.customerName,
                status: orderStatusMap[order.orderStatus],
                payment: `Rs. ${order.totalCost + 1000}`,
            }));
            setOrders(normalizedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        loadCosts();
        loadOrders();
    }, []);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="cost-content-container">
                    <h2>Costs</h2>
                    <p className="cost-date">Tue, 14 Nov, 2022, 11:30 AM</p>

                    <div className="cost-content-sections">
                        <div className="cost-stats-container">
                            <div className="cost-stat-card">
                                <h3>Income</h3>
                                <div className="cost-value">
                                    Rs.43,000 <span className="cost-change down">&#x2193; 1.5%</span>
                                </div>
                                <p className="cost-details">Compared to Rs. 30,000 yesterday</p>
                                <p className="cost-details">Last week income: Rs. 450,000</p>
                            </div>

                            <div className="cost-stat-card">
                                <h3>Expenses</h3>
                                <div className="cost-value">
                                    {loadingCosts ? "Loading..." : `Rs.${expensesTotal}`}{" "}
                                    <span className="cost-change up">&#x2191; 2.5%</span>
                                </div>
                                <p className="cost-details">Compared to Rs. 20,000 yesterday</p>
                                <p className="cost-details">Last week expenses: Rs. 230,000</p>
                            </div>

                            <div className="cost-production-chart">
                                <ProductionDonutChart />
                            </div>
                        </div>

                        <div className="cost-report-container">
                            <div className="cost-filter-section">
                                <select>
                                    <option>Order Number</option>
                                </select>
                                <input type="date" defaultValue="2022-11-20" />
                                <button className="cost-check-button">Check</button>
                            </div>

                            <div className="cost-customer-status">
                                <h3>Live Order Status</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Status</th>
                                            <th>Payment</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingOrders ? (
                                            <tr>
                                                <td colSpan="5">Loading...</td>
                                            </tr>
                                        ) : (
                                            orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{order.customerName}</td>
                                                    <td>
                                                        <span
                                                            className={`cost-status ${order.status
                                                                .toLowerCase()
                                                                .replace(" ", "-")}`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td>{order.payment}</td>
                                                    <td>
                                                        <button className="cost-details-button">Details</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cost-earning-summary">
                                <EarningSummaryChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostsPage;
