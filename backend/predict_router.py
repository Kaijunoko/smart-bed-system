"""
predict_router.py - 模擬睡眠推論 API 路由
用途：提供 /predict_sleep_stage、/sleep_stage/history、/ping 等測試用 API
"""

from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta


router = APIRouter()

# 🧠 模擬推論輸入格式
class SleepFeatures(BaseModel):
    pressure_mean: float
    pressure_std: float
    movement_count: int
    fft_peak_ratio: float
    turn_flag: int

# 🔮 模擬推論 API
@router.post("/predict_sleep_stage")
def predict_stage(data: SleepFeatures):
    return {
        "stage": "mock_stage",
        "confidence": 0.99,
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