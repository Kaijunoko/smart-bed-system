"""
main.py - FastAPI 主入口
用途：啟動應用並掛載 predict_router 模組，支援 CORS、模型路徑與測試 API
"""

from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from predict_router import router as sleep_router  # 根據實際路徑調整

# 📁 模型路徑設定（可供其他模組引用）
model_path = Path(__file__).parent.parent / "ml" / "models" / "model_tree.pkl"

app = FastAPI()

# 🌐 CORS 設定：允許前端從 localhost:3000 呼叫 API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 掛載 router：整合 /predict_sleep_stage、/sleep_stage/history、/ping 等路由
app.include_router(sleep_router)

# 🧪 額外測試 API（可選）
@app.get("/api/sleep")
def get_sleep_data():
    return {"stage": "deep", "confidence": 0.92}

# ✅ 啟動提示（方便除錯）
print("✅ FastAPI 啟動，已掛載 sleep_router 路由")
print(f"📦 模型路徑：{model_path}")