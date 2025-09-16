from fastapi import APIRouter
from pydantic import BaseModel, Field
import joblib
import os

router = APIRouter()
model = None  # 全域模型變數

# 模型載入（建議在主 app 的 startup event 中處理）
try:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.getenv("SLEEP_MODEL_PATH", os.path.join(base_dir, "models", "sleep_stage_model.pkl"))
    model = joblib.load(model_path)
    print("✅ 模型載入成功")
except Exception as e:
    print(f"❌ 模型載入失敗: {e}")
    model = None

# 定義輸入資料格式（含範圍驗證）
class SleepFeatures(BaseModel):
    pressure_mean: float = Field(..., ge=0, le=100)
    pressure_std: float = Field(..., ge=0, le=50)
    movement_count: int = Field(..., ge=0, le=100)
    fft_peak_ratio: float = Field(..., ge=0.0, le=1.0)
    turn_flag: int = Field(..., ge=0, le=1)

# 離床判斷邏輯（可根據實際感測器調整）
def detect_bed_exit(data: SleepFeatures) -> bool:
    return data.pressure_mean < 10 and data.movement_count > 3

# 推論 API
@router.post("/predict_sleep_stage")
def predict_stage(data: SleepFeatures):
    if model is None:
        return {"error": "模型尚未載入，請確認模型檔案是否存在"}

    features = [[
        data.pressure_mean,
        data.pressure_std,
        data.movement_count,
        data.fft_peak_ratio,
        data.turn_flag
    ]]

    prediction = model.predict(features)[0]

    # 若模型支援 predict_proba，回傳信心值
    try:
        confidence = model.predict_proba(features).max()
    except AttributeError:
        confidence = None

    # 離床判斷
    bed_exit = detect_bed_exit(data)

    return {
        "stage": prediction,
        "confidence": round(confidence, 3) if confidence else None,
        "bed_exit": bed_exit,
        "input": data.dict()
    }