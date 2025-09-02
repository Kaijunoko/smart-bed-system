# 🛏️ SMART-BED-SYSTEM 智慧病床監控系統

智慧病床系統是一套整合感測器、AI 判斷、前後端儀表板與警報通知的模組化平台，目標是提升照護效率、減少人力負擔，並即時監控病患翻身、離床與睡眠狀態。

---

smart-bed-system/
├── smart-bed-monitoring/           # 後端邏輯與 AI 模型
│   ├── ai_core/                    # 翻身偵測、睡眠分析、模型推論
│   ├── alerts/                     # 警報邏輯與通知模組
│   ├── api/
│   │   └── routes/                 # FastAPI 路由（/status, /bed-status）
│   ├── monitor/                    # 資料追蹤與儲存模組
│   ├── sensors/                    # 感測器模擬與串接
│   └── data/
│       └── processed/              # 儲存 JSON 資料與警報紀錄
│
└── smart-bed-dashboard/           # 前端儀表板（React）
    ├── components/                # AlertStatus、BedStatusCard 等元件
    ├── hooks/                     # useAlertEngine、useAlertLog 等邏輯
    └── context/                   # AlertContext 狀態管理



---

## 🧠 技術選型

| 模組 | 技術 |
|------|------|
| 感測器串接 | `pyserial`, `NumPy` |
| AI 判斷 | `scikit-learn`, `Pandas` |
| 後端 API | `FastAPI`, `Pydantic` |
| 前端儀表板 | `React`, `Context API`, `Hooks` |
| 資料儲存 | JSON 檔案（可擴充至 DB） |

---

## 🚨 功能模組

- **翻身偵測**：分析壓力分佈變化，判斷病患是否翻身
- **離床警示**：偵測壓力消失或偏移，觸發警報
- **睡眠分析**：根據壓力波動頻率與標準差判斷睡眠狀態
- **警報系統**：前端顯示異常、播放音效、記錄歷史
- **資料 API**：支援 `/status` 上傳與 `/bed-status` 查詢
- **模擬支援**：可用模擬資料測試整套系統

---

## 🚀 快速啟動

### 後端（FastAPI）

```bash
cd smart-bed-monitoring
uvicorn api.routes.main:app --reload

cd smart-bed-dashboard
npm install
npm start
API 路由
- POST /status：上傳病床狀態（壓力中心、標準差、翻身、時間戳）
- GET /api/bed-status：查詢最新病床狀態（模擬或實體資料）
- GET /：API 根目錄測試訊息
未來擴充方向
- 通知模組（Line Notify、Twilio）
- 資料庫儲存與分析報表
- OAuth 登入與權限管理
- 部署至雲端或邊緣設備（Raspberry Pi）
