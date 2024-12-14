import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const ProductLogPieChart = () => {
  const data = [
    { name: 'Socks', value: 40 },
    { name: 'Shirts', value: 30 },
    { name: 'Kids Socks', value: 20 },
    { name: 'Pants', value: 10 }
  ];

  const COLORS = ['#FF6B6B', '#FFD166', '#6FCF97', '#4F4F4F'];

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
          <text x={0} y={20} fontSize={16} fontWeight="bold">
            Product Log
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductLogPieChart;