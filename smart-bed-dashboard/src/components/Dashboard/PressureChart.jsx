import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const PressureChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h3>壓力標準差趨勢</h3>
        <p>尚無壓力資料可顯示。</p>
      </div>
    );
  }

  const formatted = data.map(d => ({
    timestamp: d.timestamp,
    std: d.std,
  }));

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px'
    }}>
      <h3>壓力標準差趨勢</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={t => new Date(t * 1000).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="std" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PressureChart;