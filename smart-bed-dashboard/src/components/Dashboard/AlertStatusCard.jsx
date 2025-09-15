import React from 'react';

/**
 * AlertStatusCard - 顯示單一警示狀態卡片
 * @param {string} label - 顯示的標題（例如：壓力異常、離床警示）
 * @param {boolean} active - 是否處於警示狀態（true = 警報觸發）
 * @param {string} type - 警示類型（目前未使用，可擴充用途）
 */
const AlertStatusCard = ({ label, active, type }) => {
  // 🎨 根據 active 狀態動態設定樣式
  const style = {
    padding: '1rem',                    // 內距
    borderRadius: '8px',               // 圓角
    border: active ? '2px solid red' : '1px solid #ccc', // 警示狀態用紅框
    backgroundColor: active ? '#ffe6e6' : '#f9f9f9',      // 背景色：警示用淡紅
    color: active ? '#b30000' : '#333',                   // 文字顏色：警示用深紅
    boxShadow: active ? '0 0 10px rgba(255,0,0,0.5)' : 'none', // 警示時加陰影
    transition: 'all 0.3s ease',       // 動畫過渡效果
    textAlign: 'center',               // 文字置中
    width: '150px',                    // 固定寬度
  };

  return (
    <div style={style}>
      {/* 🏷️ 顯示警示標籤（例如：壓力異常） */}
      <h4>{label}</h4>

      {/* ⚠️ 根據 active 狀態顯示警報或正常文字 */}
      <p>{active ? '⚠️ 警報觸發' : '✅ 正常'}</p>
    </div>
  );
};

export default AlertStatusCard;