// src/components/AlertHistory/ExportButton.jsx

import React from 'react';

function ExportButton({ alerts }) {
  const exportCSV = () => {
    const rows = alerts.map(alert => ({
      Type: alert.type,
      Message: alert.message,
      Time: new Date(alert.timestamp).toLocaleString(),
    }));

    const csv = [
      ['Type', 'Message', 'Time'],
      ...rows.map(r => [r.Type, r.Message, r.Time]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alert_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportCSV}>
      📤 匯出 CSV
    </button>
  );
}

export default ExportButton;