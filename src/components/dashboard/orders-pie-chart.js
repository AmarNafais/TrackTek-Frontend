import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { fetchOrders } from "../../redux/actions/axios"; // Import the fetchOrders API

const OrdersPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Pending", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        data: [0, 0, 0, 0], // Initialize with 0 counts for each status
        backgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
        hoverBackgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
      },
    ],
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
        const statusCounts = { Pending: 0, "In Progress": 0, Completed: 0, Cancelled: 0 };

        // Count orders by status
        orders.forEach((order) => {
          const status = statusMap[order.orderStatus];
          if (status) {
            statusCounts[status]++;
          }
        });

        // Update chart data with the computed status counts
        setChartData({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              data: Object.values(statusCounts),
              backgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
              hoverBackgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching order data for chart:", error.message);
      }
    };

    loadOrderData();
  }, []);

  // Chart configuration options
  const options = {
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return ` ${value}`; // Display count for each status
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="orders-pie-chart-container">
      <h3 className="orders-pie-chart-title">Orders</h3>
      <div className="orders-pie-chart-wrapper">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OrdersPieChart;
