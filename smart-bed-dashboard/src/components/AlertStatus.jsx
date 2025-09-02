import React, { useEffect, useContext, useRef, useState } from 'react';
import { AlertContext } from '../context/AlertContext';
import { useAlertEngine } from '../hooks/useAlertEngine';
import { useAlertLog } from '../hooks/useAlertLog';

function AlertStatus() {
  const { alerts, setAlerts } = useContext(AlertContext);
  const alertRef = useRef(null);
  const [showHistory, setShowHistory] = useState(false);
  const { log, addLog, clearLog } = useAlertLog();

  // 🔧《已修改》：新增音效開關與播放控制
  const ALERT_SOUND_ENABLED = false; // ✅ 改成 true 可啟用音效
  const alertSoundRef = useRef(new Audio('/alert.mp3')); // ✅ 建立一次音效實例
  const lastPlayedRef = useRef(0); // ✅ 記錄上次播放時間

  // 🔧《已修改》：播放警報音效（加上開關與節流）
  const playAlertSound = () => {
    if (!ALERT_SOUND_ENABLED) return;
    const now = Date.now();
    if (now - lastPlayedRef.current > 3000) {
      alertSoundRef.current.play().catch(() => {});
      lastPlayedRef.current = now;
    }
  };

  // 初始模擬資料（可改成 props 傳入或 API 取得）
  const simulatedData = {
    pressure: 85,
    lastTurnTime: Date.now() - 3 * 60 * 60 * 1000,
    bedExit: true,
  };

  // 使用 hook 產生警報
  const evaluatedAlerts = useAlertEngine(simulatedData);

  // 每次警報更新時：儲存到 localStorage、播放音效、觸發閃爍動畫
  useEffect(() => {
    if (evaluatedAlerts?.length > 0) {
      setAlerts(evaluatedAlerts);
      evaluatedAlerts.forEach(alert => addLog(alert));
      playAlertSound(); // 🔧《已修改》：使用改寫後的函式

      if (alertRef?.current instanceof HTMLElement) {
        alertRef.current.classList.add('flash');
        setTimeout(() => {
          if (alertRef.current) {
            alertRef.current.classList.remove('flash');
          }
        }, 1000);
      }
    }
  }, [evaluatedAlerts, setAlerts, addLog]);

  // 分組警報
  const groupedAlerts = alerts.reduce((acc, alert) => {
    const { type } = alert;
    if (!acc[type]) acc[type] = [];
    acc[type].push(alert);
    return acc;
  }, {});

  const alertTypes = [
    { key: 'pressure', label: '壓力異常', icon: '💢', color: '#d32f2f' },
    { key: 'turn', label: '翻身異常', icon: '⏰', color: '#f57c00' },
    { key: 'exit', label: '離床警示', icon: '🚨', color: '#1976d2' },
  ];

  const clearAlertsByType = (type) => {
    const filtered = alerts.filter(alert => alert.type !== type);
    setAlerts(filtered);
  };

  const clearAllAlerts = () => {
    setAlerts([]);
    clearLog();
  };

  const alertHistory = log;

  return (
    <div ref={alertRef} style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Alert Status</h2>

      <button onClick={clearAllAlerts} style={buttonStyle('#444')}>🧹 全部清除警報</button>
      <button onClick={() => setShowHistory(prev => !prev)} style={buttonStyle('#888')}>
        📜 {showHistory ? '關閉歷史紀錄' : '查看歷史紀錄'}
      </button>

      {alertTypes.map(({ key, label, icon, color }) => {
        const typeAlerts = groupedAlerts[key] || [];
        const latestTime = typeAlerts.length > 0
          ? new Date(typeAlerts[typeAlerts.length - 1].timestamp).toLocaleString()
          : null;

        return (
          <div
            key={key}
            style={{
              marginBottom: '1.5rem',
              backgroundColor: typeAlerts.length > 0 ? `${color}22` : 'transparent',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ color }}>
              <span className={key === 'exit' && typeAlerts.length > 0 ? 'blinking' : ''}>
                {icon}
              </span> {label}
            </h3>

            {latestTime && (
              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                最新警報時間：{latestTime}
              </p>
            )}

            {typeAlerts.length > 0 ? (
              <>
                <ul>
                  {typeAlerts.map((alert, index) => (
                    <li key={index}>
                      {alert.message} <br />
                      <small>{new Date(alert.timestamp).toLocaleString()}</small>
                    </li>
                  ))}
                </ul>
                <button onClick={() => clearAlertsByType(key)} style={buttonStyle(color)}>
                  清除 {label} 警報
                </button>
              </>
            ) : (
              <p>目前無異常</p>
            )}
          </div>
        );
      })}

      {showHistory && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h3>📜 歷史警報紀錄</h3>
          {alertHistory.length > 0 ? (
            <ul>
              {alertHistory
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((alert, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <strong>{alert.type}</strong> - {alert.message} <br />
                    <small>{new Date(alert.timestamp).toLocaleString()}</small>
                  </li>
                ))}
            </ul>
          ) : (
            <p>尚無歷史紀錄</p>
          )}
        </div>
      )}
    </div>
  );
}

const buttonStyle = (bgColor) => ({
  marginBottom: '0.5rem',
  backgroundColor: bgColor,
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
});

export default AlertStatus;