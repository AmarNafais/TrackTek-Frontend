import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { fetchOrders } from "../../redux/actions/order";

const OrdersPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Pending", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
        hoverBackgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
      },
    ],
  });

  const statusMap = {
    1: "Pending",
    2: "InProgress",
    3: "Completed",
    4: "Cancelled",
  };

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const orders = await fetchOrders();
        const statusCounts = { Pending: 0, "InProgress": 0, Completed: 0, Cancelled: 0 };

        orders.forEach((order) => {
          const status = statusMap[order.orderStatus];
          if (status) {
            statusCounts[status]++;
          }
        });

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

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return ` ${value}`;
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
