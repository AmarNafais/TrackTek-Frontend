import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const DonutChartComponent = () => {
  const data = {
    labels: ["Total Production", "Total Pending", "Total Damaged"],
    datasets: [
      {
        data: [54, 20, 26],
        backgroundColor: ["#007bff", "#28a745", "#dc3545"],
        hoverBackgroundColor: ["#0056b3", "#218838", "#c82333"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.raw}%`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="production-donut-chart-container">
      <div className="production-donut-chart-header">
        <h3>Production</h3>
        <button className="production-donut-chart-filter-button">Today</button>
      </div>
      <div className="production-donut-chart-content">
        <Doughnut data={data} options={options} />
        <div className="production-donut-chart-legend">
          <div className="production-donut-chart-legend-item">
            <span className="production-donut-chart-legend-dot" style={{ backgroundColor: "#007bff" }}></span>
            <span>Total Production</span>
            <span className="production-donut-chart-percentage">54% <span className="production-donut-chart-arrow-up">&#8593;</span></span>
          </div>
          <div className="production-donut-chart-legend-item">
            <span className="production-donut-chart-legend-dot" style={{ backgroundColor: "#28a745" }}></span>
            <span>Total Pending</span>
            <span className="production-donut-chart-percentage">20% <span className="production-donut-chart-arrow-up">&#8593;</span></span>
          </div>
          <div className="production-donut-chart-legend-item">
            <span className="production-donut-chart-legend-dot" style={{ backgroundColor: "#dc3545" }}></span>
            <span>Total Damaged</span>
            <span className="production-donut-chart-percentage">26% <span className="production-donut-chart-arrow-down">&#8595;</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChartComponent;