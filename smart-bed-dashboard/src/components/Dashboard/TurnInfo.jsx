import React from 'react';

const StatusCard = ({ title, value, icon, color }) => (
  <div style={{
    border: `2px solid ${color}`,
    padding: '1rem',
    borderRadius: '8px'
  }}>
    <h3>{title}</h3>
    <p style={{ fontSize: '1.5rem' }}>{value}</p>
    {icon && <span>{icon}</span>}
  </div>
);

export default StatusCard;