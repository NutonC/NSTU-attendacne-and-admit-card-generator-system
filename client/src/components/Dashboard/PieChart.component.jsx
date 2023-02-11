import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const CircleChart = () => {
  const data = [
    { name: "Deaprtment", value: 30 },
    { name: "Courses", value: 200 },
    { name: "Teacher", value: 100 },
    { name: "Student", value: 300 },
    { name: "Hall", value: 10 },
  ];

  return (
    <ResponsiveContainer>
      <PieChart width={600} height={600}>
        <Pie
          style={{ fontFamily: "normal" }}
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CircleChart;
