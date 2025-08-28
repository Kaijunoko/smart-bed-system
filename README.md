# Smart Bed System

這是一個整合式智慧病床系統，包含前端儀表板與後端模擬邏輯。

## 📦 專案結構

#smart-bed-system/ ├── dashboard/
# React 前端 UI，顯示病床狀態與警報摘要 ├── monitoring/
# 模擬邏輯與警報判斷（壓力、翻身、離床等） ├── README.md
# 專案說明文件


## 🚀 啟動方式

### 前端儀表板（dashboard）

模擬邏輯（monitoring）
```bash
cd dashboard
npm install
npm start

cd monitoring


功能特色
- ✅ 即時病床狀態顯示（壓力、角度、佔床狀態）
- ✅ 警報分類與歷程管理（壓力異常、離床、翻身異常）
- ✅ 支援匯出 CSV、刪除歷程、篩選類型
- ✅ 模擬資料生成與 API 整合（可擴充為實體硬體串接）
- ✅ 模組化架構，便於維護與擴充