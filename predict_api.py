from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from predict_router import router as sleep_router  # 如果你有 router 模組

app = FastAPI()

# CORS 設定，讓前端能連線
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 掛載 router（如果有）
app.include_router(sleep_router)

# 或直接定義 API（如果你沒用 router）
@app.get("/api/sleep")
def get_sleep_data():
    return {"stage": "deep", "confidence": 0.92}