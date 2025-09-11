import React, { useEffect, useState } from 'react';
import SleepStageChart from '../components/SleepStageChart';
import SleepSummaryCard from '../components/Dashboard/SleepSummaryCard';
import AlertLogPanel from '../components/Dashboard/AlertLogPanel';
import PredictionHistoryChart from '../components/Dashboard/PredictionHistoryChart';
import { fetchSleepData } from '../hooks/useSleepData';
import { predictSleepStage } from '../hooks/useSleepPredictor';
import { detectAlerts } from '../hooks/useAlertDetector';
import { useAlerts } from '../context/AlertContext';
import { useNotifier } from '../hooks/useNotifier';

export default function Dashboard() {
  const [sleepData, setSleepData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const { alerts, setAlerts } = useAlerts();
  const { notifyAlert } = useNotifier();

  useEffect(() => {
    fetchSleepData().then((data) => {
      setSleepData(data);
      const detected = detectAlerts(data);
      setAlerts(detected);
    });
  }, [setAlerts]);

  const handlePredict = async () => {
    const mockInput = {
      pressure_mean: 45.2,
      pressure_std: 12.3,
      movement_count: 4,
      fft_peak_ratio: 0.67,
      turn_flag: 1,
    };
    const result = await predictSleepStage(mockInput);
    setPrediction(result);
    setHistory(prev => [...prev, { ...result, timestamp: Date.now() }]);

    const alertsFromPrediction = detectAlerts([result]); // 用 result 包成陣列
    setAlerts(alertsFromPrediction);
    alertsFromPrediction.forEach(alert => notifyAlert(alert));
  };

  return (
    <div>
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

      <SleepSummaryCard data={sleepData} />
      <SleepStageChart data={sleepData} />
      <AlertLogPanel alerts={alerts} />

      <button onClick={handlePredict} style={{ marginTop: '1rem' }}>
        送出模擬推論
      </button>

      {prediction && (
        <div style={{ marginTop: '1rem' }}>
          <strong>預測結果：</strong> {prediction.stage}（信心值：{prediction.confidence}）
        </div>
      )}

      <PredictionHistoryChart history={history} />
    </div>
  );
}