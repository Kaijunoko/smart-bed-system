import React from 'react';
import { useAlertLog } from '../hooks/useAlertLog';

export default function AlertLogPanel() {
  const {
    log,
    addLog,
    clearLog,
    deleteLog,
    filterByType,
    exportToCSV,
  } = useAlertLog();

  const pressureAlerts = filterByType('pressure');

  const handleExport = () => {
    const csv = exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'alert_log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>壓力異常紀錄</h2>
      {pressureAlerts.length === 0 ? (
        <p>目前沒有壓力異常紀錄。</p>
      ) : (
        <ul>
          {pressureAlerts.map(alert => (
            <li key={alert.id}>
              <strong>{alert.timestamp}</strong> - {alert.message}
              <button onClick={() => deleteLog(alert.id)} style={{ marginLeft: '1rem' }}>
                刪除
              </button>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={clearLog}>清除全部</button>
        <button onClick={handleExport} style={{ marginLeft: '1rem' }}>
          匯出 CSV
        </button>
      </div>
    </div>
  );
}