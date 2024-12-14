import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const OrdersPieChart = () => {
  // Sample data for the chart
  const chartData = {
    labels: ["Completed", "On Hold", "On Progress", "Pending"],
    datasets: [
      {
        data: [32, 25, 25, 18],
        backgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
        hoverBackgroundColor: ["#1abc9c", "#5b57d9", "#48c9f1", "#e74c3c"],
      },
    ],
  };

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
            return ` ${value}%`;
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
