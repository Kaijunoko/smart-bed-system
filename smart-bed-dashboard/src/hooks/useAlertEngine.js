import { useEffect, useState } from 'react';
import { evaluateAlerts } from '../utils/alertEngine';

// 🔧 警報邏輯開關：true = 使用 AI 模型；false = 使用 rule-based fallback
const ALERT_GENERATION_ENABLED = true;

/**
 * React hook：根據病床特徵產生警報陣列（AI 模型或 fallback）
 * @param {Object} features - 包含 pressure_std, pressure_delta, last_turn_interval, bed_exit_flag, body_center_shift
 * @returns {Array} alerts - 警報陣列
 */
export function useAlertEngine(features) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!ALERT_GENERATION_ENABLED) {
      // fallback rule-based 判斷
      const fallbackAlerts = evaluateAlerts(features);
      setAlerts(fallbackAlerts);
      return;
    }

    const fetchPrediction = async () => {
      try {
        const response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(features)
        });
        const result = await response.json();

        const newAlerts = [];
        if (result.prediction === 'turn_detected') {
          newAlerts.push({
            type: 'turn',
            message: '翻身偵測（AI）',
            timestamp: Date.now()
          });
        }

        setAlerts(newAlerts);
      } catch (err) {
        console.error('AI 推論失敗，使用 fallback 規則');
        const fallbackAlerts = evaluateAlerts(features);
        setAlerts(fallbackAlerts);
      }
    };

    fetchPrediction();
  }, [features]);

  return alerts;
}