from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 模型載入（使用 try-except 保護）
try:
    model = joblib.load('../ml/models/model_tree.pkl')  # 或 'model.pkl' 根據實際路徑
    print("✅ 模型載入成功")
except Exception as e:
    print("❌ 模型載入失敗：", e)
    model = None

# 特徵欄位順序
feature_order = ['pressure_mean', 'pressure_std', 'movement_count', 'fft_peak_ratio', 'turn_flag']

@app.post("/api/predict")
async def predict(request: Request):
    if model is None:
        return {"error": "模型尚未載入，請確認 model.pkl 是否存在且有效"}

    data = await request.json()
    try:
        input_vector = [data[feature] for feature in feature_order]
    except KeyError as e:
        return {"error": f"缺少欄位：{e}"}

    # 推論
    stage = model.predict([input_vector])[0]
    confidence = max(model.predict_proba([input_vector])[0]) if hasattr(model, 'predict_proba') else None
    importance = model.feature_importances_.tolist() if hasattr(model, 'feature_importances_') else None

    return {
        "stage": stage,
        "confidence": round(confidence, 3) if confidence else "N/A",
        "feature_importance": importance
    }