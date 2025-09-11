import React from 'react';

/**
 * 顯示統計數字的卡片元件
 * @param {string} title - 標題
 * @param {string|number} value - 數值
 * @param {string} icon - 可選圖示
 * @param {string} color - 邊框顏色
 */
const StatusCard = ({ title, value, icon, color }) => (
  <div style={{
    border: `2px solid ${color}`,
    padding: '1rem',
    borderRadius: '8px',
    minWidth: '150px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  }}>
    <h3>{title}</h3>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
    {icon && <div style={{ fontSize: '1.2rem' }}>{icon}</div>}
  </div>
);

export default StatusCard;