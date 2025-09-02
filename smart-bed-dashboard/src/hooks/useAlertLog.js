import { useState, useCallback, useEffect } from 'react';

// 🔧《已修改》：新增紀錄開關與最大數量限制
const LOG_ENABLED = true; // ✅ 改成 false 可停用警報紀錄
const MAX_LOG_ENTRIES = 100; // ✅ 最多保留 100 筆紀錄

export function useAlertLog() {
  const [log, setLog] = useState([]);

  // 🔧《已修改》：從 localStorage 載入紀錄
  useEffect(() => {
    const saved = localStorage.getItem('alertLog');
    if (saved) setLog(JSON.parse(saved));
  }, []);

  // 🔧《已修改》：每次 log 更新時儲存到 localStorage
  useEffect(() => {
    localStorage.setItem('alertLog', JSON.stringify(log));
  }, [log]);

  // 🔧《已修改》：加入開關與最大數量限制
  const addLog = useCallback((entry) => {
    if (!LOG_ENABLED) return;
    setLog(prev => {
      const newLog = [...prev, { ...entry, id: Date.now() }];
      return newLog.slice(-MAX_LOG_ENTRIES); // ✅ 保留最新 100 筆
    });
  }, []);

  const clearLog = useCallback(() => {
    setLog([]);
    localStorage.removeItem('alertLog'); // 🔧《已修改》：清除 localStorage
  }, []);

  const deleteLog = useCallback((id) => {
    setLog(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const filterByType = useCallback((type) => {
    return log.filter(entry => entry.type === type);
  }, [log]);

  const exportToCSV = useCallback(() => {
    if (log.length === 0) return '';

    const headers = Object.keys(log[0]);
    const rows = log.map(entry =>
      headers.map(h => `"${String(entry[h]).replace(/"/g, '""')}"`).join(',')
    );

    return [headers.join(','), ...rows].join('\n');
  }, [log]);

  return {
    log,
    addLog,
    clearLog,
    deleteLog,
    filterByType,
    exportToCSV,
  };
}