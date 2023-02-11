import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarCharts = () => {
  const data = [
    {
      name: "Department",
      uv: 30,
      pv: 25,
      amt: 20,
    },
    {
      name: "Courses",
      uv: 200,
      pv: 100,
      amt: 110,
    },
    {
      name: "Student",
      uv: 300,
      pv: 150,
      amt: 160,
    },
    {
      name: "Teacher",
      uv: 100,
      pv: 90,
      amt: 95,
    },
    {
      name: "Hall",
      uv: 10,
      pv: 9,
      amt: 8,
    },
  ];

  return (
    <AreaChart
      style={{ fontFamily: "normal" }}
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default BarCharts;
