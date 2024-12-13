import React from 'react';
import Sidebar from "../side-nav";
import Header from "../header";
import productionChart from "../../assets/production-chart.svg";
import earningSummaryChart from "../../assets/earning-summary-chart.svg";
import "./styles.css";

const CostsPage = () => {
    return (
        <div className='dashboard-container'>
            <Sidebar />
            <div className='main-content'>
                <Header />
                <div className="content-container">
                    <h2>Costs</h2>
                    <p className="date">Tue, 14 Nov, 2022, 11:30 AM</p>

                    <div className="content-sections">
                        <div className="stats-container">
                            <div className="stat-card">
                                <h3>Income</h3>
                                <div className="value">
                                    Rs.43,000 <span className="change down">&#x2193; 1.5%</span>
                                </div>
                                <p className="details">Compared to Rs. 30,000 yesterday</p>
                                <p className="details">Last week income: Rs. 450,000</p>
                            </div>

                            <div className="stat-card">
                                <h3>Expenses</h3>
                                <div className="value">
                                    Rs.13,000 <span className="change up">&#x2191; 2.5%</span>
                                </div>
                                <p className="details">Compared to Rs. 20,000 yesterday</p>
                                <p className="details">Last week expenses: Rs. 230,000</p>
                            </div>

                            <div className="production-chart">
                                <img src={productionChart} alt="Production Chart" className="chart-image" />
                            </div>
                        </div>

                        <div className="cost-report-container">
                            <div className="filter-section">
                                <select>
                                    <option>Order Number</option>
                                </select>
                                <input type="date" defaultValue="2022-11-20" />
                                <button className="check-button">Check</button>
                            </div>

                            <div className="customer-status">
                                <h3>Live Customer Status</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>ID</th>
                                            <th>Driver</th>
                                            <th>Status</th>
                                            <th>Payment</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td>6465</td>
                                            <td>Alex Noman</td>
                                            <td><span className="status completed">Completed</span></td>
                                            <td>Rs. 15,000</td>
                                            <td><button className="details-button">Details</button></td>
                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td>5665</td>
                                            <td>Razib Rahman</td>
                                            <td><span className="status pending">Pending</span></td>
                                            <td>Rs. 20,000</td>
                                            <td><button className="details-button">Details</button></td>
                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td>1755</td>
                                            <td>Luke Norton</td>
                                            <td><span className="status pending">Pending</span></td>
                                            <td>Rs. 75,000</td>
                                            <td><button className="details-button">Details</button></td>
                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td>1755</td>
                                            <td>Luke Norton</td>
                                            <td><span className="status completed">Completed</span></td>
                                            <td>Rs. 75,000</td>
                                            <td><button className="details-button">Details</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="earning-summary">
                                <img src={earningSummaryChart} alt="Earning Summary Chart" className="chart-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostsPage;