# 📦 引入必要模組
from fastapi import FastAPI, Request                    # FastAPI 主框架與請求物件
from fastapi.middleware.cors import CORSMiddleware     # CORS 中介層，允許跨來源請求
import joblib                                           # 載入 scikit-learn 模型
import numpy as np                                      # 處理數值資料（目前未使用，但可擴充）

# 🚀 建立 FastAPI 應用實例
app = FastAPI()

# 🌐 設定 CORS（允許前端從 localhost:3000 呼叫 API）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 前端開發環境
    allow_methods=["*"],                      # 允許所有 HTTP 方法
    allow_headers=["*"],                      # 允許所有標頭
)

# 🧠 載入訓練好的模型（使用 try-except 防止載入失敗）
try:
    model = joblib.load('../ml/models/model_tree.pkl')  # 模型路徑可依實際調整
    print("✅ 模型載入成功")
except Exception as e:
    print("❌ 模型載入失敗：", e)
    model = None  # 若載入失敗，設為 None 以防止 API crash

# 📊 定義特徵欄位順序（必須與訓練時一致）
feature_order = ['pressure_mean', 'pressure_std', 'movement_count', 'fft_peak_ratio', 'turn_flag']

# 🔮 推論 API：接收 JSON 格式的特徵資料，回傳睡眠階段與模型信心值
@app.post("/api/predict")
async def predict(request: Request):
    # 🛑 若模型尚未載入，回傳錯誤訊息
    if model is None:
        return {"error": "模型尚未載入，請確認 model.pkl 是否存在且有效"}

    # 📥 解析前端傳入的 JSON 資料
    data = await request.json()
    try:
        # 🔢 將特徵依照指定順序轉成輸入向量
        input_vector = [data[feature] for feature in feature_order]
    except KeyError as e:
        # ⚠️ 若缺少必要欄位，回傳錯誤訊息
        return {"error": f"缺少欄位：{e}"}

    # 🧠 執行模型推論
    stage = model.predict([input_vector])[0]  # 預測睡眠階段（例如 deep, light, awake）

    # 📈 取得信心值（若模型支援 predict_proba）
    confidence = max(model.predict_proba([input_vector])[0]) if hasattr(model, 'predict_proba') else None

    # 📊 取得特徵重要性（僅適用於 Decision Tree 等支援 feature_importances_ 的模型）
    importance = model.feature_importances_.tolist() if hasattr(model, 'feature_importances_') else None

    # 📤 回傳推論結果
    return {
        "stage": stage,                                      # 預測的睡眠階段
        "confidence": round(confidence, 3) if confidence else "N/A",  # 模型信心值（0~1）
        "feature_importance": importance                     # 各特徵對預測的影響力（可視化用）
    }