// src/components/AlertHistory/AlertHistory.jsx

import React, { useState, useEffect } from 'react';
import FilterBar from './FilterBar';
import AlertTimeline from './AlertTimeline';
import ExportButton from './ExportButton';
import DateRangePicker from './DateRangePicker'; // ✅ 新增：引入時間範圍篩選元件

function AlertHistory() {
  const [history, setHistory] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [range, setRange] = useState({ start: null, end: null }); // ✅ 新增：時間範圍狀態

  useEffect(() => {
    const stored = localStorage.getItem('alertHistory');
    if (stored) {
      const parsed = JSON.parse(stored);
      const sorted = parsed.sort((a, b) => b.timestamp - a.timestamp);
      setHistory(sorted);
    }
  }, []);

  // ✅ 修改：加入時間範圍條件
  const filtered = history.filter(alert => {
    const matchType = filterType === 'all' || alert.type === filterType;
    const matchTime =
      !range.start || !range.end ||
      (alert.timestamp >= range.start.getTime() &&
       alert.timestamp <= range.end.getTime());
    return matchType && matchTime;
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h2>警報歷史記錄</h2>
      <FilterBar filterType={filterType} setFilterType={setFilterType} />
      <DateRangePicker range={range} setRange={setRange} /> {/* ✅ 新增：插入時間範圍選擇器 */}
      <ExportButton alerts={filtered} />
      <AlertTimeline alerts={filtered} />
    </div>
  );
}

export default AlertHistory;