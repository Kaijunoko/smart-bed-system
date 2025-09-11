from fastapi import FastAPI
from predict_sleep_stage import router as sleep_router

app = FastAPI()
app.include_router(sleep_router)

print("✅ FastAPI 啟動，已掛載 /predict_sleep_stage 路由")