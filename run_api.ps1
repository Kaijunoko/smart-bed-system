Write-Host "🚀 啟動 FastAPI 中..."
$env:PYTHONPATH="C:\Users\ct903\OneDrive\文件\smart-bed-system"
uvicorn smart_bed_monitoring.api.main:app --reload