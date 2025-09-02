import { useMemo } from 'react';
import { evaluateAlerts } from '../utils/alertEngine';

// 🔧《已修改》：新增警報產生開關
const ALERT_GENERATION_ENABLED = false; // ✅ 改成 true 可啟用警報邏輯

/**
 * React hook：根據病床狀態產生排序後的警報陣列
 * @param {Object} bedState - 包含 pressure, lastTurnTime, bedExit
 * @returns {Array} sortedAlerts - 已處理的警報陣列
 */
export function useAlertEngine(bedState) {
  const alerts = useMemo(() => {
    // 🔧《已修改》：根據開關決定是否執行警報邏輯
    if (!ALERT_GENERATION_ENABLED) return [];
    return evaluateAlerts(bedState);
  }, [bedState]);

  return alerts;
}