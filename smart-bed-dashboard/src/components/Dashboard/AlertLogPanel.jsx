import React from 'react';

// 📋 警示紀錄面板元件：接收 alerts 陣列並顯示警示事件
export default function AlertLogPanel({ alerts }) {
  return (
    <div style={{
      // 🧱 外框樣式：灰色邊框、內距、圓角、底部間距、背景色
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '2rem',
      backgroundColor: '#f4f4f4',
    }}>
      <h3>📋 警示紀錄</h3>

      {/* 🟡 若沒有警示事件，顯示提示文字 */}
      {alerts.length === 0 ? (
        <p>目前沒有警示事件。</p>
      ) : (
        // 🟢 有警示事件時，顯示表格
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* 🕒 時間欄位 */}
              <th style={{ borderBottom: '1px solid #aaa', textAlign: 'left' }}>時間</th>
              {/* 🔔 類型欄位（如壓力異常、離床） */}
              <th style={{ borderBottom: '1px solid #aaa', textAlign: 'left' }}>類型</th>
              {/* 📝 描述欄位（完整訊息） */}
              <th style={{ borderBottom: '1px solid #aaa', textAlign: 'left' }}>描述</th>
            </tr>
          </thead>
          <tbody>
            {/* 🔁 對每筆警示事件進行渲染 */}
            {alerts.map((alert, i) => {
              const isBedExit = alert.type === "bed_exit";
              return (
                <tr key={i} style={{ backgroundColor: isBedExit ? '#ffe6e6' : 'transparent' }}>
                  {/* 🕒 從 message 中擷取時間（格式：在 HH:MM） */}
                  <td>{alert.message.match(/在 (\d{2}:\d{2})/)?.[1] || '—'}</td>
                  {/* 🔔 顯示警示類型（離床事件加上圖示） */}
                  <td style={{ color: isBedExit ? '#b30000' : '#333' }}>
                    {isBedExit ? '🚨 離床警示' : alert.type}
                  </td>
                  {/* 📝 顯示完整訊息描述 */}
                  <td>{alert.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}