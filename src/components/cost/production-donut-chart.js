import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { fetchOrders } from "../../redux/actions/order";

const DonutChartComponent = () => {
  const [data, setData] = useState({
    labels: ["Total Pending", "Total In Progress", "Total Completed", "Total Cancelled"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#007bff", "#ffc107", "#28a745", "#dc3545"],
        hoverBackgroundColor: ["#0056b3", "#e0a800", "#218838", "#c82333"],
        borderWidth: 0,
      },
    ],
  });

  const [totals, setTotals] = useState({
    totalPending: 0,
    totalInProgress: 0,
    totalCompleted: 0,
    totalCancelled: 0,
  });

  const statusMap = {
    1: "Pending",
    2: "In Progress",
    3: "Completed",
    4: "Cancelled",
  };

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const orders = await fetchOrders();
        const totalPending = orders.filter((order) => order.orderStatus === 1).length;
        const totalInProgress = orders.filter((order) => order.orderStatus === 2).length;
        const totalCompleted = orders.filter((order) => order.orderStatus === 3).length;
        const totalCancelled = orders.filter((order) => order.orderStatus === 4).length;

        setData({
          labels: ["Total Pending", "Total In Progress", "Total Completed", "Total Cancelled"],
          datasets: [
            {
              data: [totalPending, totalInProgress, totalCompleted, totalCancelled],
              backgroundColor: ["#007bff", "#ffc107", "#28a745", "#dc3545"],
              hoverBackgroundColor: ["#0056b3", "#e0a800", "#218838", "#c82333"],
              borderWidth: 0,
            },
          ],
        });

        setTotals({
          totalPending,
          totalInProgress,
          totalCompleted,
          totalCancelled,
        });
      } catch (error) {
        console.error("Error fetching orders for chart:", error.message);
      }
    };

    loadOrderData();
  }, []);

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.raw}`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="production-donut-chart-container">
      <div className="production-donut-chart-header">
        <h3>Orders</h3>
        <button className="production-donut-chart-filter-button">Today</button>
      </div>
      <div className="production-donut-chart-content">
        <Doughnut data={data} options={options} />
        <div className="production-donut-chart-legend">
          <div className="production-donut-chart-legend-item">
            <span className="production-donut-chart-legend-dot" style={{ backgroundColor: "#007bff" }}></span>
            <span>Total Pending</span>
            <span className="production-donut-chart-percentage">{totals.totalPending}</span>
          </div>
          <div className="production-donut-chart-legend-item">
            <span className="production-donut-chart-legend-dot" style={{ backgroundColor: "#ffc107" }}></span>
            <span>Total In Progress</span>
            <span className="production-donut-chart-percentage">{totals.totalInProgress}</span>
          </div>
          <div className="production-donut-chart-legend-item">
            <span className="production-donut-chart-legend-dot" style={{ backgroundColor: "#28a745" }}></span>
            <span>Total Completed</span>
            <span className="production-donut-chart-percentage">{totals.totalCompleted}</span>
          </div>
          <div className="production-donut-chart-legend-item">
            <span className="production-donut-chart-legend-dot" style={{ backgroundColor: "#dc3545" }}></span>
            <span>Total Cancelled</span>
            <span className="production-donut-chart-percentage">{totals.totalCancelled}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChartComponent;
