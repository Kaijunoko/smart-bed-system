// src/components/AlertHistory/AlertTimeline.jsx

import React from 'react';

function AlertTimeline({ alerts }) {
  if (alerts.length === 0) {
    return <p>目前無警報記錄</p>;
  }

  return (
    <ul>
      {alerts.map((alert, index) => (
        <li key={index} style={{ marginBottom: '0.5rem' }}>
          <strong>{alert.type.toUpperCase()}</strong> - {alert.message} <br />
          <small>{new Date(alert.timestamp).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}

export default AlertTimeline;