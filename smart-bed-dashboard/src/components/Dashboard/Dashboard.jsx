import React, { useState } from 'react';
import RealTimePanel from './RealTimePanel';
import HistoryPanel from './HistoryPanel';
import ViewSwitcher from '../common/ViewSwitcher';
import { evaluateAlerts } from '../../utils/alertEngine'; // ✅ 引入警報邏輯

/** 系統主控元件：智慧病床監控系統 */
function Dashboard() {
  const [view, setView] = useState('realtime'); // 'realtime' or 'history'

  // ✅ 測試資料（模擬病床狀態）
  const testAlerts = evaluateAlerts({
    pressure: 85,
    lastTurnTime: Date.now() - 3 * 60 * 60 * 1000,
    bedExit: true
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h1>智慧病床監控系統</h1>

      {/* 🔀 視圖切換器：即時 / 歷史 */}
      <ViewSwitcher view={view} setView={setView} />

      {/* 📡 即時監控面板 or 📜 歷史紀錄面板 */}
      {view === 'realtime' ? <RealTimePanel /> : <HistoryPanel />}

      {/* 🧪 測試區塊：顯示 evaluateAlerts 結果 */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>🧪 警報邏輯測試結果</h3>
        <ul>
          {testAlerts.map((a, i) => (
            <li key={i}>
              <strong>{a.type}</strong>: {a.message} ({a.timestamp})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;