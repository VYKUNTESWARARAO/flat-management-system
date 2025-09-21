// TrafficChart.jsx
import React from "react";
import "../src/styles/admin.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const TrafficChart = ({ data }) => {
  return (
    <div className="chart-card p-3">
      <h5>Traffic</h5>
      <small className="text-muted">January - July 2023</small>
      <div style={{ width: "100%", height: 360 }} className="mt-3">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#2b2b2b" />
            <XAxis dataKey="month" tick={{ fill: "#bfc7d1" }} />
            <YAxis tick={{ fill: "#bfc7d1" }} />
            <Tooltip />
            <Legend wrapperStyle={{ color: "#bfc7d1" }} />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#4dabf7"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#80e27e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="amt"
              stroke="#ffb74d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;
