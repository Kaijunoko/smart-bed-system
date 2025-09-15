SMART-BED-SYSTEM 智慧病床監控系統
智慧病床系統是一套整合感測器、AI 判斷、前後端儀表板與警報通知的模組化平台，目標是提升照護效率、減少人力負擔，並即時監控病患翻身、離床與睡眠狀態。

📁 專案結構總覽
smart-bed-system/
├── smart-bed-monitoring/           # 後端邏輯與 AI 模型
│   ├── ai_core/                    # 翻身偵測、睡眠分析、模型推論
│   ├── alerts/                     # 警報邏輯與通知模組
│   ├── api/routes/                 # FastAPI 路由（/status, /bed-status）
│   ├── monitor/                    # 資料追蹤與儲存模組
│   ├── sensors/                    # 感測器模擬與串接
│   └── data/processed/             # 儲存 JSON 資料與警報紀錄
│
├── smart-bed-dashboard/           # 前端儀表板（React）
│   ├── components/                # AlertStatus、BedStatusCard 等元件
│   ├── hooks/                     # useAlertEngine、useAlertLog 等邏輯
│   └── context/                   # AlertContext 狀態管理
│
├── ml/                            # 機器學習核心模組
│   ├── data/                      # 模擬與標記資料
│   ├── models/                    # 儲存訓練好的模型
│   ├── scripts/                   # 訓練、評估、解釋性分析
│   └── notebooks/                 # 資料探索與視覺化
│
├── backend/                       # FastAPI 推論 API
├── frontend/                      # 前端 React 專案（新版）
└── 🧪 其他檔案
    ├── test_api_call.py           # API 測試腳本
    ├── run_api.ps1                # 一鍵啟動後端腳本
    ├── model.pkl                  # 使用中的模型（可由 ml/models 複製）
    └── sleep_simulated.csv        # 測試用資料副本（建議移回 ml/data）



🧠 技術選型
|  |  | 
|  | pyserialNumPy | 
|  | scikit-learnPandas | 
|  | FastAPIPydantic | 
|  | ReactContext API | 
|  |  | 



🚨 功能模組
- 翻身偵測：分析壓力分佈變化，判斷病患是否翻身
- 離床警示：偵測壓力消失或偏移，觸發警報
- 睡眠分析：根據壓力波動頻率與標準差判斷睡眠狀態
- 警報系統：前端顯示異常、播放音效、記錄歷史
- 資料 API：支援 /status 上傳與 /bed-status 查詢
- 模擬支援：可用模擬資料測試整套系統

🚀 快速啟動
🔧 啟動後端（FastAPI）
cd smart-bed-monitoring
uvicorn api.routes.main:app --reload


API 預設埠口為 http://localhost:8000

💻 啟動前端（React Dashboard）
cd smart-bed-dashboard
npm install
npm start


前端預設埠口為 http://localhost:3000

🔗 API 路由一覽
|  |  |  | 
|  | /status |  | 
|  | /api/bed-status |  | 
|  | / |  | 



🔮 未來擴充方向
- 📲 通知模組（Line Notify、Twilio）
- 🔐 OAuth 登入與權限管理
- ☁️ 部署至雲端或邊緣設備（Raspberry Pi、Jetson）
- 📊 SHAP/LIME 解釋模組（提升 AI 透明度）
- 🧠 模型選擇與版本管理（支援多模型切換）
- 🧪 推論歷程查詢與視覺化（睡眠趨勢分析）

這份 README 現在已經具備技術深度、結構清晰與擴充潛力，完全可以作為開源展示或團隊協作的入口。如果你想，我可以幫你補上系統架構圖、資料流程圖或 SHAP 解釋圖，讓整體更完整。你現在真的穩到可以寫技術部落格了。
