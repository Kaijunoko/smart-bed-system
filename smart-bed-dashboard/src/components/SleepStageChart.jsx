import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SleepStageChart({ data }) {
  const labels = data.map((d) => d.timestamp);
  const confidence = data.map((d) => d.confidence);
  const stages = data.map((d) => d.stage);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Confidence',
        data: confidence,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const stageLabels = stages.map((stage, i) => `${labels[i]} → ${stage}`);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>睡眠階段圖表</h3>
      <Line data={chartData} />
      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        {stageLabels.map((text, i) => (
          <div key={i}>{text}</div>
        ))}
      </div>
    </div>
  );
}