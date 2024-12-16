import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { fetchGarments } from "../../redux/actions/axios"; // Import the fetchGarments API

const ProductLogPieChart = () => {
  const [data, setData] = useState([]);
  const COLORS = ['#FF6B6B', '#FFD166', '#6FCF97', '#4F4F4F'];

  // Define garment categories
  const categories = ["Casual", "Formal", "Sportswear", "Accessories"];

  // Fetch garment data and calculate counts
  useEffect(() => {
    const loadGarmentData = async () => {
      try {
        const garments = await fetchGarments(); // Fetch garment data
        const categoryCounts = categories.map((category) => ({
          name: category,
          value: garments.filter((garment) => garment.categoryType === category).length,
        }));
        
        setData(categoryCounts); // Update state with category counts
      } catch (error) {
        console.error("Error fetching garment data for chart:", error.message);
      }
    };

    loadGarmentData();
  }, []);

  return (
    <div className="w-full max-w-md">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={450}
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
          />
          <text
            x="50%"
            y="5%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={16}
            fontWeight="bold"
          >
            Product Log
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductLogPieChart;
