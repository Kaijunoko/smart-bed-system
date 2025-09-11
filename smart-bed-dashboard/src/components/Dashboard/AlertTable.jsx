import React from 'react';

const AlertTable = ({ alerts }) => (
  <table>
    <thead>
      <tr>
        <th>時間</th>
        <th>病床</th>
        <th>警報類型</th>
      </tr>
    </thead>
    <tbody>
      {alerts.map((a, i) => (
        <tr key={i}>
          <td>{new Date(a.timestamp * 1000).toLocaleString()}</td>
          <td>{a.bed_id}</td>
          <td>
            {Object.keys(a.alerts || {})
              .filter(k => a.alerts[k])
              .join(', ')
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AlertTable;