// SmallSparkline.jsx
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import "../styles/admin.css";

const SmallSparkline = ({ data = [] }) => {
  // data: array of numbers or objects [{value: 10},...]
  const parsed = data.map((v, i) => (typeof v === "number" ? { v } : v));
  return (
    <div style={{ width: "100%", height: 50 }}>
      <ResponsiveContainer>
        <LineChart data={parsed}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            strokeOpacity={0.85}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SmallSparkline;
