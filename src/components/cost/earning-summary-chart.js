import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EarningsChart = () => {
  // Sample data
  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], // X-axis labels
    datasets: [
      {
        label: "Last 6 months", // Blue line
        data: [150, 220, 170, 240, 260, 230], // Y-axis values
        borderColor: "#4285F4", // Blue line color
        backgroundColor: "rgba(66, 133, 244, 0.2)", // Blue fill
        tension: 0.4, // Smooth curve
        fill: true,
        pointRadius: 3,
      },
      {
        label: "Same period last year", // Gray dashed line
        data: [130, 180, 150, 200, 210, 190],
        borderColor: "#BDBDBD", // Gray line color
        borderDash: [5, 5], // Dashed line
        tension: 0.4,
        fill: false,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Earning Summary",
        align: "start",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Remove X-axis grid lines
      },
      y: {
        beginAtZero: true,
        grid: { color: "#E0E0E0" },
        ticks: {
          callback: function (value) {
            return `Rs. ${value}k`;
          },
        },
      },
    },
  };

  return (
    <div className="earning-summary-chart-container">
      <div className="earning-summary-chart-header">
        <h3>Earning Summary</h3>
        <p>Mar 2022 - Oct 2022</p>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default EarningsChart;