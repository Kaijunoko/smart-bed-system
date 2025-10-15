// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';

// 📊 睡眠階段圖表（視覺化壓力與動作資料）
import SleepStageChart from '../components/SleepStageChart';

// 📝 睡眠摘要卡片（顯示統計資訊）
import SleepSummaryCard from '../components/Dashboard/SleepSummaryCard';

// 🚨 警示紀錄面板（顯示所有警示事件）
import AlertLogPanel from '../components/Dashboard/AlertLogPanel';

// 📈 預測歷史圖表（顯示每次推論結果）
import PredictionHistoryChart from '../components/Dashboard/PredictionHistoryChart';

// 🧘 陪伴訊息卡片（顯示語音與文字陪伴）
import CompanionCard from '../components/CompanionCard';

// 📦 資料載入與推論邏輯
import { fetchSleepData } from '../hooks/useSleepData';
import { predictSleepStage } from '../hooks/useSleepPredictor';
import { detectAlerts } from '../hooks/useAlertDetector';

// 🔔 全域警示狀態管理與通知
import { useAlerts } from '../context/AlertContext';
import { useNotifier } from '../hooks/useNotifier';
import { generateCompanionMessage } from '../utils/CompanionAI';

const result = await predictSleepStage(mockInput);
const enriched = {
  ...result,
  ...generateCompanionMessage({
    stage: result.stage,
    bed_exit: result.bed_exit,
    timestamp: Date.now(),
  }),
};
setPrediction(enriched);


export default function Dashboard() {
  // 🛏️ 睡眠感測資料
  const [sleepData, setSleepData] = useState([]);

  // 🔮 單次推論結果
  const [prediction, setPrediction] = useState(null);

  // 📜 推論歷史紀錄
  const [history, setHistory] = useState([]);

  // 🚨 警示狀態與更新函式
  const { alerts, setAlerts } = useAlerts();

  // 🔔 通知觸發函式（toast）
  const { notifyAlert } = useNotifier();

  // 📥 初次載入睡眠資料並偵測警示
  useEffect(() => {
    fetchSleepData().then((data) => {
      setSleepData(data); // 設定感測資料
      const detected = detectAlerts(data); // 偵測警示
      setAlerts(detected); // 更新警示狀態
    });
  }, [setAlerts]);

  // 🧠 模擬推論流程（送出假資料 → 呼叫 API → 更新結果與警示）
  const handlePredict = async () => {
    const mockInput = {
      pressure_mean: 45.2,
      pressure_std: 12.3,
      movement_count: 4,
      fft_peak_ratio: 0.67,
      turn_flag: 1,
    };

    const result = await predictSleepStage(mockInput); // 呼叫後端 API
    setPrediction(result); // 儲存推論結果
    setHistory(prev => [...prev, { ...result, timestamp: Date.now() }]); // 加入歷史紀錄

    const alertsFromPrediction = detectAlerts([result]); // 從推論結果偵測警示
    setAlerts(alertsFromPrediction); // 更新警示
    alertsFromPrediction.forEach(alert => notifyAlert(alert)); // 顯示通知
  };

  return (
    <div>
      {/* ⚠️ 若有警示，顯示警示摘要區塊 */}
      {alerts.length > 0 && (
        <div style={{
          border: '1px solid red',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          backgroundColor: '#ffecec',
        }}>
          <h3>⚠️ 警示摘要</h3>
          <ul>
            {alerts.map((alert, i) => (
              <li key={i}>
                [{alert.type}] {alert.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 📝 睡眠摘要卡片 */}
      <SleepSummaryCard data={sleepData} />

      {/* 📊 睡眠階段圖表 */}
      <SleepStageChart data={sleepData} />

      {/* 🚨 警示紀錄面板 */}
      <AlertLogPanel alerts={alerts} />

      {/* 🔮 模擬推論按鈕 */}
      <button onClick={handlePredict} style={{ marginTop: '1rem' }}>
        送出模擬推論
      </button>

      {/* 🔍 顯示推論結果與陪伴訊息 */}
      {prediction && (
        <div style={{ marginTop: '1rem' }}>
          <strong>預測結果：</strong> {prediction.stage}（信心值：{prediction.confidence}）

          {/* 🧘 智慧陪伴訊息區塊 */}
          <h3 style={{ marginTop: '1rem' }}>🧘 智慧陪伴訊息</h3>
          <CompanionCard message={prediction.message} />
        </div>
      )}

      {/* 📈 預測歷史圖表 */}
      <PredictionHistoryChart history={history} />
    </div>
  );
}
