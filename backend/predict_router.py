"""
predict_router.py - 睡眠推論與陪伴訊息 API 路由
用途：
1. 提供 /predict_sleep_stage 推論與陪伴訊息
2. 提供 /sleep_stage/history 模擬歷史資料
3. 提供 /ping 偵測 API 是否正常
"""

from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta

router = APIRouter()

# 🧠 模擬推論輸入格式（可與真實模型一致）
class SleepFeatures(BaseModel):
    pressure_mean: float
    pressure_std: float
    movement_count: int
    fft_peak_ratio: float
    turn_flag: int

# 🧘 陪伴訊息生成邏輯（根據時間與睡眠狀態）
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

# 🔮 模擬推論 API（未來可串真實模型）
@router.post("/predict_sleep_stage")
def predict_stage(data: SleepFeatures):
    # 模擬推論結果（可替換成模型輸出）
    stage = "light"
    confidence = 0.87
    bed_exit = data.pressure_mean < 10
    hour = datetime.now().hour

    # 產生陪伴訊息
    message = generate_companion_message(stage, bed_exit, hour)

    # 回傳推論結果與陪伴語句
    return {
        "stage": stage,
        "confidence": confidence,
        "bed_exit": bed_exit,
        "message": message,
        "input": data.dict()
    }

# 📊 睡眠階段歷史資料（模擬 20 筆）
@router.get("/sleep_stage/history")
def get_sleep_history():
    now = datetime.now()
    stages = ["awake", "light", "deep", "REM"]
    data = []
    for i in range(20):
        data.append({
            "timestamp": (now - timedelta(minutes=30 - i)).strftime("%H:%M"),
            "stage": stages[i % 4],
            "confidence": round(0.7 + 0.3 * (i % 3) / 2, 2)
        })
    return data

# 🛠 偵測 API 是否正常
@router.get("/ping")
def ping():
    return {"message": "pong"}
