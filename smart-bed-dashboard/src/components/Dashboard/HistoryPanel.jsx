// src/components/history/RealTimePanel.jsx
import React from 'react';
import AlertStatus from './AlertStatus';

export default function RealTimePanel() {
  return (
    <div>
      <h2>即時警報狀態</h2>
      <AlertStatus />
    </div>
  );
}