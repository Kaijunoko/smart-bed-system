import joblib
import os
from datetime import datetime
from pydantic import BaseModel, Field

# 模型載入
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.getenv("SLEEP_MODEL_PATH", os.path.join(base_dir, "models", "sleep_stage_model.pkl"))
try:
    model = joblib.load(model_path)
    print("✅ 模型載入成功")
except Exception as e:
    print(f"❌ 模型載入失敗: {e}")
    model = None

# 資料模型
class SleepFeatures(BaseModel):
    pressure_mean: float = Field(..., ge=0, le=100)
    pressure_std: float = Field(..., ge=0, le=50)
    movement_count: int = Field(..., ge=0, le=100)
    fft_peak_ratio: float = Field(..., ge=0.0, le=1.0)
    turn_flag: int = Field(..., ge=0, le=1)

# 離床判斷
def detect_bed_exit(data: SleepFeatures) -> bool:
    return data.pressure_mean < 10 and data.movement_count > 3

# 陪伴訊息生成
def generate_companion_message(stage: str, bed_exit: bool, hour: int) -> str:
    if bed_exit:
        return "🚨 你似乎離開床面了，要注意安全喔！"
    if stage == "deep":
        return "你現在進入深層睡眠，身體正在修復中。"
    if stage == "light":
        return "你現在是淺眠階段，可以試著放鬆一下。"
    if hour < 6:
        return "🌙 晚安，祝你今晚睡得安穩。我會一直在這裡陪你。"
    elif hour < 9:
        return "🌅 早安！希望你今天有個好開始。"
    elif hour < 18:
        return "☀️ 午安！我陪你一起度過這段時光。"
    elif hour < 22:
        return "🌇 晚安前的時光，可以聽聽故事或放鬆一下。"
    return "我一直在這裡陪著你，安心休息吧。"

# 推論主函式
def run_prediction(data: SleepFeatures):
    if model is None:
        return {"error": "模型尚未載入，請確認模型檔案是否存在"}

    features = [[
        data.pressure_mean,
        data.pressure_std,
        data.movement_count,
        data.fft_peak_ratio,
        data.turn_flag
    ]]

    stage = model.predict(features)[0]

    try:
        confidence = model.predict_proba(features).max()
    except AttributeError:
        confidence = None

    bed_exit = detect_bed_exit(data)
    hour = datetime.now().hour
    message = generate_companion_message(stage, bed_exit, hour)

    return {
        "stage": stage,
        "confidence": round(confidence, 3) if confidence else None,
        "bed_exit": bed_exit,
        "message": message,
        "input": data.dict()
    }
