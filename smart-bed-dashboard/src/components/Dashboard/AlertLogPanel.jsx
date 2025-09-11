import React from 'react';

export default function AlertLogPanel({ alerts }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '2rem',
      backgroundColor: '#f4f4f4',
    }}>
      <h3>📋 警示紀錄</h3>
      {alerts.length === 0 ? (
        <p>目前沒有警示事件。</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #aaa', textAlign: 'left' }}>時間</th>
              <th style={{ borderBottom: '1px solid #aaa', textAlign: 'left' }}>類型</th>
              <th style={{ borderBottom: '1px solid #aaa', textAlign: 'left' }}>描述</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, i) => (
              <tr key={i}>
                <td>{alert.message.match(/在 (\d{2}:\d{2})/)?.[1] || '—'}</td>
                <td>{alert.type}</td>
                <td>{alert.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}