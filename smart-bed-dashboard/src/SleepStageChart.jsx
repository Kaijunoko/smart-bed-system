import React from 'react';
import { Line } from 'react-chartjs-2';

export default function SleepStageChart({ data }) {
  const labels = data.map((d) => d.timestamp);
  const stages = data.map((d) => d.stage);
  const confidence = data.map((d) => d.confidence);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Confidence',
        data: confidence,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h3>睡眠階段信心值折線圖</h3>
      <Line data={chartData} />
      <div style={{ marginTop: '1rem' }}>
        {stages.map((stage, i) => (
          <span key={i} style={{ marginRight: '1rem' }}>
            {labels[i]} → {stage}
          </span>
        ))}
      </div>
    </div>
  );
}