/**
 * 根據病床狀態評估警報（含優先與互斥邏輯）
 * @param {Object} params - 包含壓力值、最後翻身時間、離床狀態
 * @returns {Array} alerts - 警報陣列，每筆包含 type, message, timestamp, value
 */
export function evaluateAlerts({ pressure, lastTurnTime, bedExit }) {
  const now = new Date().toISOString();
  const rawAlerts = [];

  // 優先順序表（數字越大優先越高）
  const priorityMap = {
    exit: 3,
    pressure: 2,
    turn: 1
  };

  // 互斥邏輯表：若某類型存在，排除其他類型
  const mutexMap = {
    exit: ['pressure', 'turn']
    // 可擴充：例如 pressure: ['turn']
  };

  // 壓力異常：超過 80%
  if (pressure > 80) {
    rawAlerts.push({
      type: 'pressure',
      message: `壓力異常：超過 80%`,
      timestamp: now,
      value: pressure
    });
  }

  // 翻身異常：超過 2 小時未翻身
  const twoHoursMs = 2 * 60 * 60 * 1000;
  if (Date.now() - lastTurnTime > twoHoursMs) {
    rawAlerts.push({
      type: 'turn',
      message: `翻身異常：超過 2 小時未翻身`,
      timestamp: now,
      value: null
    });
  }

  // 離床異常：bedExit 為 true
  if (bedExit) {
    rawAlerts.push({
      type: 'exit',
      message: `病患可能離床`,
      timestamp: now,
      value: null
    });
  }

  // 互斥處理：若存在互斥主類型，排除其排斥的類型
  const activeTypes = rawAlerts.map(a => a.type);
  const mutexType = activeTypes.find(t => mutexMap[t]);
  const filteredAlerts = mutexType
    ? rawAlerts.filter(a => a.type === mutexType || !mutexMap[mutexType]?.includes(a.type))
    : rawAlerts;

  // 排序：依照優先順序由高到低
  const sortedAlerts = filteredAlerts.sort(
    (a, b) => priorityMap[b.type] - priorityMap[a.type]
  );

  return sortedAlerts;
}