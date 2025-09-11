import React from 'react';

/**
 * @param {string} label
 * @param {boolean} active
 * @param {string} type
 */
const AlertStatusCard = ({ label, active, type }) => {
  const style = {
    padding: '1rem',
    borderRadius: '8px',
    border: active ? '2px solid red' : '1px solid #ccc',
    backgroundColor: active ? '#ffe6e6' : '#f9f9f9',
    color: active ? '#b30000' : '#333',
    boxShadow: active ? '0 0 10px rgba(255,0,0,0.5)' : 'none',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    width: '150px',
  };

  return (
    <div style={style}>
      <h4>{label}</h4>
      <p>{active ? '⚠️ 警報觸發' : '✅ 正常'}</p>
    </div>
  );
};

export default AlertStatusCard;