import React from 'react';

export default function SleepSummaryCard({ data }) {
  const total = data.length;

  const deepSleep = data.filter((d) => d.stage === 'deep').length;
  const remSleep = data.filter((d) => d.stage === 'REM').length;
  const awake = data.filter((d) => d.stage === 'awake').length;

  const avgConfidence =
    data.reduce((sum, d) => sum + d.confidence, 0) / total;

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '2rem',
      backgroundColor: '#f9f9f9',
    }}>
      <h3>睡眠品質摘要</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li>🟢 深睡時間：{deepSleep} 分鐘</li>
        <li>🔵 REM 次數：{remSleep} 次</li>
        <li>🔴 清醒時間：{awake} 分鐘</li>
        <li>🟡 平均信心值：{avgConfidence.toFixed(2)}</li>
      </ul>
    </div>
  );
}