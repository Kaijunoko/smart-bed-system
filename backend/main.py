from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.predict_router import router as sleep_router  # ✅ 修改這一行

# 📁 模型路徑設定（可供其他模組引用）
model_path = Path(__file__).parent.parent / "ml" / "models" / "model_tree.pkl"

app = FastAPI()

# 🌐 CORS 設定：允許前端從 localhost:3000 呼叫 API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ React 預設 port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 掛載 router：整合 /predict_sleep_stage、/sleep_stage/history、/ping 等路由
app.include_router(sleep_router, prefix="/api")  # ✅ 加上 prefix，前端好呼叫

# 🧪 額外測試 API（可選）
@app.get("/api/sleep")
def get_sleep_data():
    return {"stage": "deep", "confidence": 0.92}

# ✅ 啟動提示（方便除錯）
print("✅ FastAPI 啟動，已掛載 sleep_router 路由")
print(f"📦 模型路徑：{model_path}")
