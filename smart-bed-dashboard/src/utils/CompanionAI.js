// src/utils/CompanionAI.js

export function generateCompanionMessage({ stage, bed_exit, timestamp }) {
  const hour = new Date(timestamp || Date.now()).getHours();

  // 🕒 時間情境分類
  const timeContext =
    hour >= 5 && hour < 12 ? 'morning' :
    hour >= 12 && hour < 18 ? 'afternoon' :
    hour >= 18 && hour < 22 ? 'evening' : 'night';

  // 🛏️ 離床情境
  if (bed_exit) {
    return {
      message: '你現在並不在床上，可以試著躺一下。',
      context: 'bed_exit',
    };
  }

  // 😴 睡眠階段語錄
  const stageMessages = {
    deep: '你現在是深層睡眠階段，身體正在修復中。',
    light: '你現在是淺眠階段，可以試著放鬆一下。',
    rem: '你現在是快速動眼期，可能正在作夢。',
    wake: '你現在是清醒狀態，可以準備起床囉。',
  };

  // 🌅 時間情境語錄（可擴充）
  const timeMessages = {
    morning: '🌅 早安！希望你今天有個好開始。',
    afternoon: '🌞 下午好，記得補充水分喔。',
    evening: '🌇 晚上好，可以開始放鬆準備休息了。',
    night: '🌙 深夜了，祝你有個安穩的睡眠。',
  };

  // 🧘 組合語錄
  const base = stageMessages[stage] || '目前狀態穩定，請持續觀察。';
  const extra = timeMessages[timeContext];

  return {
    message: `${extra} ${base}`,
    context: `${timeContext}_${stage}`,
  };
}
