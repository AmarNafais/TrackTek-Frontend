import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const OrderPerformanceLineChart = () => {
    const data = {
        labels: ["Oct 2024", "Nov 2024", "Dec 2024", "Jan 2024", "Feb 2024", "Mar 2024"],
        datasets: [
            {
                label: "Achieved",
                data: [4, 6, 5, 7, 6, 5],
                borderColor: "#ff6b6b",
                backgroundColor: "rgba(255, 107, 107, 0.2)",
                tension: 0.4,
                pointBackgroundColor: "#ff6b6b",
                pointBorderColor: "#fff",
                pointRadius: 6,
            },
            {
                label: "Target",
                data: [3, 4, 2, 5, 7, 4],
                borderColor: "#6c5ce7",
                backgroundColor: "rgba(108, 92, 231, 0.2)",
                tension: 0.4,
                pointBackgroundColor: "#6c5ce7",
                pointBorderColor: "#fff",
                pointRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 15,
                    color: "#333",
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return ` ${tooltipItem.raw} Orders`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    return (
        <div className="order-performance-line-chart-container">
            <h3 className="order-performance-line-chart-title">Order Performance</h3>
            <div className="order-performance-line-chart-wrapper">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default OrderPerformanceLineChart;