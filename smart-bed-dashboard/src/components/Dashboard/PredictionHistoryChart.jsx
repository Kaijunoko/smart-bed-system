import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function PredictionHistoryChart({ history }) {
  if (!history || history.length === 0) return <p>尚無推論紀錄。</p>;

  // 折線圖：信心值 vs 時間
  const lineData = {
    labels: history.map(h => new Date(h.timestamp).toLocaleTimeString()),
    datasets: [{
      label: '信心值',
      data: history.map(h => h.confidence),
      fill: false,
      borderColor: '#1976d2',
      tension: 0.3,
    }],
  };

  // 圓餅圖：各階段出現次數
  const stageCount = {};
  history.forEach(h => {
    stageCount[h.stage] = (stageCount[h.stage] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(stageCount),
    datasets: [{
      data: Object.values(stageCount),
      backgroundColor: ['#f44336', '#ff9800', '#4caf50', '#2196f3'],
    }],
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <h3>📈 信心值趨勢</h3>
        <Line data={lineData} />
      </div>
      <div style={{ flex: 1, minWidth: 300 }}>
        <h3>🥧 睡眠階段分布</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}