import axios from 'axios';

export async function predictSleepStage(input) {
  const response = await axios.post('http://localhost:8000/api/predict', input);
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
  } catch (error) {
    console.error("❌ 推論失敗：", error.message);
  }
}

// ✅ 執行測試（可在開發階段手動觸發）
testPrediction();