import React from 'react';

export default function PredictionStageBlock({ stage, confidence }) {
  const colorMap = {
    awake: '#f44336',      // 紅色：清醒
    light: '#ff9800',      // 橘色：淺睡
    deep: '#4caf50',       // 綠色：深睡
    REM: '#2196f3',        // 藍色：快速動眼期
  };

  const labelMap = {
    awake: '清醒',
    light: '淺層睡眠',
    deep: '深層睡眠',
    REM: '快速動眼期',
  };

  return (
    <div style={{
      backgroundColor: colorMap[stage] || '#ccc',
      padding: '1rem',
      borderRadius: '8px',
      color: '#fff',
      marginTop: '1rem',
      textAlign: 'center',
    }}>
      <h3>🧠 AI 推論結果</h3>
      <p>目前狀態：<strong>{labelMap[stage] || '未知'}</strong></p>
      <p>信心值：{confidence.toFixed(2)}</p>
    </div>
  );
}