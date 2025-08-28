// src/components/Dashboard/Dashboard.jsx

import React, { useState } from 'react';
import RealTimePanel from './RealTimePanel';
import HistoryPanel from './HistoryPanel';
import ViewSwitcher from './ViewSwitcher';

function Dashboard() {
  const [view, setView] = useState('realtime'); // 'realtime' or 'history'

  return (
    <div style={{ padding: '1rem' }}>
      <h1>智慧病床監控系統</h1>
      <ViewSwitcher view={view} setView={setView} />
      {view === 'realtime' ? <RealTimePanel /> : <HistoryPanel />}
    </div>
  );
}

export default Dashboard;