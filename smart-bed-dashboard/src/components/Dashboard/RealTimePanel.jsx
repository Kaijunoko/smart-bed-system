// src/components/Dashboard/RealTimePanel.jsx

import React, { useEffect, useState } from 'react';
import { fetchSummary, fetchLatestAlerts } from '../../api/smartBedAPI';
import StatusCard        from './StatusCard';
import Loader            from '../common/Loader';
import TurnInfo          from './TurnInfo';
import PressureChart     from './PressureChart';
import AlertTable        from './AlertTable';
import AlertLogPanel     from './AlertLogPanel';
import AlertStatusPanel  from './AlertStatusPanel';

export default function RealTimePanel() {
  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummary()
      .then(res => setSummary(res.data))
      .catch(() => setError('無法取得統計'));

    fetchLatestAlerts()
      .then(res => setAlerts(res.data))
      .catch(() => setError('無法取得警報'));
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!summary || !Array.isArray(alerts) || alerts.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      {/* 狀態卡片 */}
      <section style={{ display: 'flex', gap: '1rem' }}>
        <StatusCard title="翻身次數"   value={summary.turned_count}       color="green"  />
        <StatusCard title="壓力異常"   value={summary.pressure_alerts}    color="red"    />
        <StatusCard title="離床次數"   value={summary.leave_bed_alerts}  color="orange" />
      </section>

      {/* 警報狀態卡片 */}
      <AlertStatusPanel latestAlert={alerts[0]} />

      {/* 翻身資訊 */}
      <TurnInfo
        count={summary.turned_count}
        lastTurned={summary.last_turned_timestamp}
      />

      {/* 壓力趨勢圖 */}
      <PressureChart
        data={alerts.map(a => ({ timestamp: a.timestamp, std: a.std }))}
      />

      {/* 警報紀錄表 & 匯出 */}
      <AlertTable alerts={alerts} />
      <AlertLogPanel alerts={alerts} />
    </div>
  );
}