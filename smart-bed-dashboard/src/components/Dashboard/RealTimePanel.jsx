// src/components/Dashboard/RealTimePanel.jsx

import React from 'react';
import PressureChart from '../PressureChart';
import TurnInfo from '../TurnInfo';
import AlertStatus from '../AlertStatus';

function RealTimePanel() {
  return (
    <div>
      <PressureChart />
      <TurnInfo />
      <AlertStatus />
    </div>
  );
}

export default RealTimePanel;