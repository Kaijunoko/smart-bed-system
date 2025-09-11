// src/components/Dashboard/AlertStatus.jsx

import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback
} from 'react';
import { AlertContext } from '../../context/AlertContext';
import { useAlertEngine } from '../../hooks/useAlertEngine';
import { useAlertLog } from '../../hooks/useAlertLog';

/**
 * 即時警報顯示與歷史紀錄管理
 */
function AlertStatus() {
  const { alerts, setAlerts } = useContext(AlertContext);
  const alertRef = useRef(null);
  const [showHistory, setShowHistory] = useState(false);
  const { log, addLog, clearLog } = useAlertLog();

  // 音效開關
  const ALERT_SOUND_ENABLED = false;
  const alertSoundRef = useRef(new Audio('/alert.mp3'));
  const lastPlayedRef = useRef(0);

  // 播放警報音效（加上 ALERT_SOUND_ENABLED 為依賴）
  const playAlertSound = useCallback(() => {
    if (!ALERT_SOUND_ENABLED) return;
    const now = Date.now();
    if (now - lastPlayedRef.current > 3000) {
      alertSoundRef.current.play().catch(() => {});
      lastPlayedRef.current = now;
    }
  }, [ALERT_SOUND_ENABLED]);

  // 模擬資料
  const simulatedData = {
    pressure: 85,
    lastTurnTime: Date.now() - 3 * 60 * 60 * 1000,
    bedExit: true,
  };

  const evaluatedAlerts = useAlertEngine(simulatedData);

  useEffect(() => {
    if (evaluatedAlerts?.length > 0) {
      setAlerts(evaluatedAlerts);
      evaluatedAlerts.forEach(addLog);
      playAlertSound();

      if (alertRef.current) {
        alertRef.current.classList.add('flash');
        setTimeout(() => {
          alertRef.current?.classList.remove('flash');
        }, 1000);
      }
    }
  }, [evaluatedAlerts, setAlerts, addLog, playAlertSound]);

  // 分組警報
  const groupedAlerts = alerts.reduce((acc, a) => {
    (acc[a.type] = acc[a.type] || []).push(a);
    return acc;
  }, {});

  const alertTypes = [
    { key: 'pressure', label: '壓力異常', icon: '💢', color: '#d32f2f' },
    { key: 'turn',     label: '翻身異常', icon: '⏰', color: '#f57c00' },
    { key: 'exit',     label: '離床警示', icon: '🚨', color: '#1976d2' },
  ];

  const clearAlertsByType = (type) => {
    setAlerts(alerts.filter(a => a.type !== type));
  };
  const clearAllAlerts = () => {
    setAlerts([]);
    clearLog();
  };

  return (
    <div ref={alertRef} style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Alert Status</h2>

      <button onClick={clearAllAlerts} style={buttonStyle('#444')}>
        🧹 全部清除警報
      </button>
      <button onClick={() => setShowHistory(v => !v)} style={buttonStyle('#888')}>
        📜 {showHistory ? '關閉歷史紀錄' : '查看歷史紀錄'}
      </button>

      {alertTypes.map(({ key, label, icon, color }) => {
        const list = groupedAlerts[key] || [];
        const latest = list.length
          ? new Date(list[list.length - 1].timestamp).toLocaleString()
          : null;

        return (
          <div
            key={key}
            style={{
              marginBottom: '1.5rem',
              backgroundColor: list.length ? `${color}22` : 'transparent',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ color }}>
              <span className={key === 'exit' && list.length ? 'blinking' : ''}>
                {icon}
              </span>{' '}
              {label}
            </h3>

            {latest && (
              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                最新警報時間：{latest}
              </p>
            )}

            {list.length ? (
              <>
                <ul>
                  {list.map((a, i) => (
                    <li key={i}>
                      {a.message}<br/>
                      <small>{new Date(a.timestamp).toLocaleString()}</small>
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
          {log.length ? (
            <ul>
              {log.sort((a,b)=>b.timestamp-a.timestamp).map((a,i)=>(
                <li key={i} style={{marginBottom:'0.5rem'}}>
                  <strong>{a.type}</strong> - {a.message}<br/>
                  <small>{new Date(a.timestamp).toLocaleString()}</small>
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

const buttonStyle = bg => ({
  marginBottom: '0.5rem',
  backgroundColor: bg,
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
});

export default AlertStatus;