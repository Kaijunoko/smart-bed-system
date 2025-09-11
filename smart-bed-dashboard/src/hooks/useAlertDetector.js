export function detectAlerts(sleepData) {
  const alerts = [];

  sleepData.forEach((entry, i) => {
    const { timestamp, confidence, stage } = entry;

    if (confidence < 0.75) {
      alerts.push({
        type: '低信心值',
        message: `在 ${timestamp}，預測信心值過低（${confidence.toFixed(2)}）`,
        severity: 'warning',
      });
    }

    if (stage === 'awake' && i > 0 && sleepData[i - 1].stage !== 'awake') {
      alerts.push({
        type: '清醒切換',
        message: `在 ${timestamp}，病人突然清醒`,
        severity: 'info',
      });
    }

    // 你可以加上翻身異常、壓力異常等邏輯
  });

  return alerts;
}