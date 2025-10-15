import axios from 'axios';

// 🧠 呼叫後端模擬推論 API（修正路徑）
export async function predictSleepStage(input) {
  const response = await axios.post('http://localhost:8000/api/predict_sleep_stage', input);
  return response.data;
}

// ✅ 測試用函式（可放在開發階段用）
async function testPrediction() {
  const mockInput = {
    pressure_mean: 45.2,
    pressure_std: 12.3,
    movement_count: 4,
    fft_peak_ratio: 0.67,
    turn_flag: 1,
    model_type: "tree" // 可選 "svm" 或其他
  };

  try {
    const result = await predictSleepStage(mockInput);
    console.log("✅ 推論結果：", result);

    // 🚨 離床警示判斷
    if (result.bed_exit) {
      console.warn("🚨 離床警示：使用者可能已離開床面！");
    } else {
      console.log("🛏️ 使用者仍在床上，狀態穩定。");
    }

  } catch (error) {
    console.error("❌ 推論失敗：", error.message);
  }
}

// ✅ 執行測試（可在開發階段手動觸發）
testPrediction();
