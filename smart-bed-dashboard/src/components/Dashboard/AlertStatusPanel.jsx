import React from 'react';

/**
 * @param {Array} alerts
 */
const AlertLogPanel = ({ alerts }) => {
  if (!Array.isArray(alerts) || alerts.length === 0) {
    return (
      <div style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}>
        <h3>警報紀錄</h3>
        <p>尚無警報資料。</p>
      </div>
    );
  }

  const filtered = alerts.filter(a =>
    Object.values(a.alerts || {}).some(v => v)
  );

  const exportCsv = () => {
    const header = ['時間', '病床', '警報類型'];
    const rows = filtered.map(a => [
      new Date(a.timestamp * 1000).toLocaleString(),
      a.bed_id,
      Object.keys(a.alerts).filter(k => a.alerts[k]).join(', ')
    ]);
    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
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
    <div style={{
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '8px'
    }}>
      <h3>警報紀錄</h3>
      {filtered.length === 0 ? (
        <p>目前沒有警報紀錄。</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>時間</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>病床</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>警報類型</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={i}>
                  <td>{new Date(a.timestamp * 1000).toLocaleString()}</td>
                  <td>{a.bed_id}</td>
                  <td>{Object.keys(a.alerts).filter(k => a.alerts[k]).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={exportCsv}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            匯出 CSV
          </button>
        </>
      )}
    </div>
  );
};

export default AlertLogPanel;