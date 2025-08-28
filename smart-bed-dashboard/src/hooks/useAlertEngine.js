import { useMemo } from 'react';
import { evaluateAlerts } from '../utils/alertEngine';

/**
 * React hook：根據病床狀態產生排序後的警報陣列
 * @param {Object} bedState - 包含 pressure, lastTurnTime, bedExit
 * @returns {Array} sortedAlerts - 已處理的警報陣列
 */
export function useAlertEngine(bedState) {
  const alerts = useMemo(() => {
    return evaluateAlerts(bedState);
  }, [bedState]); // ✅ 修正依賴陣列

  return alerts;
}