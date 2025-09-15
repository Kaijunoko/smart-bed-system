SMART-BED-SYSTEM 智慧病床監控系統
智慧病床系統是一套整合感測器、AI 判斷、前後端儀表板與警報通知的模組化平台，目標是提升照護效率、減少人力負擔，並即時監控病患翻身、離床與睡眠狀態。

smart-bed-system/
├── backend/                     # FastAPI 後端主體
│   ├── main.py                 # FastAPI 入口，掛載路由與 CORS 設定
│   ├── predict_router.py       # 睡眠階段推論 API 路由
│   ├── predict_sleep_stage.py  # 推論邏輯與模型處理
│   ├── inference_api.py        # 模型載入與推論封裝
│   ├── models/                 # 模型檔案與推論模組
│   │   ├── sleep_model.pkl     # 單一模型（如 tree 或 svm）
│   │   └── __init__.py         # 模組初始化
│   ├── test_router.py          # API 測試用路由
│   └── requirements.txt        # 後端依賴套件列表
│
├── ml/                         # 模型訓練與資料管理
│   ├── data/                   # 原始與標記資料
│   ├── models/                 # 訓練後模型與版本資訊
│   │   ├── model_tree.pkl
│   │   ├── model_svm.pkl
│   │   └── model_info.json
│   ├── notebooks/              # Jupyter 分析與模型測試
│   └── scripts/                # 模型訓練腳本（如 train_model.py）
│
├── smart-bed-monitoring/       # 前端 React 專案（已整合至此）
│   ├── smart-bed-dashboard/    # 使用者介面與模組化元件
│   │   ├── public/             # 靜態資源
│   │   ├── src/                # 前端主程式碼
│   │   │   ├── components/     # UI 元件（如 AlertPanel、TrendChart）
│   │   │   ├── hooks/          # 自訂 hook（如 useSleepPredictor）
│   │   │   ├── pages/          # 頁面組件（如 Dashboard）
│   │   │   ├── services/       # API 呼叫封裝（如 sleepApi.js）
│   │   │   ├── utils/          # 工具函式
│   │   │   └── App.js          # React 入口
│   ├── sleep_simulated.csv     # 模擬睡眠資料
│   └── README.md               # 專案說明文件



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

- AlertLogPanel.jsx：顯示警示事件紀錄（時間、類型、訊息）
- AlertStatusCard.jsx：顯示單一警示狀態卡片（紅框表示警報觸發）
- PredictionStageBlock.jsx：顯示目前推論階段與模型結果
- PressureChart.jsx：顯示壓力感測器即時或歷史圖表
- SleepSummaryCard.jsx：顯示睡眠統計摘要（如深睡比例、翻身次數）
- RealTimePanel.jsx：顯示即時感測資料（壓力、動作、翻身等）

2️⃣ 可選元件（視 UI 設計而定）
- AlertStatusPanel.jsx：組合多個 AlertStatusCard，顯示各類警示狀態
- AlertTable.jsx：表格形式顯示警示事件（與 AlertLogPanel 功能重疊）
- StatusCard.jsx：類似 AlertStatusCard，可用於顯示其他狀態（如設備連線）
- StatusPanel.jsx：類似 AlertStatusPanel，可整合多個 StatusCard
- HistoryPanel.jsx：顯示歷史推論紀錄（可與圖表整合）
- HistoryPredictionChart.jsx：顯示推論結果的時間序列圖表

