// src/App.js

// 🔧 引入 React 主函式庫
import React from 'react';

// 🔧 引入警報狀態的 Context Provider（提供全域警報狀態）
import { AlertProvider } from './context/AlertContext';

// 🔧 引入主儀表板元件（顯示病床狀態與警報）
import Dashboard from './components/Dashboard/Dashboard';

// 🔧 引入全域樣式
import './App.css';

// 🧠 App 根元件：包住整個應用程式
function App() {
  return (
    // ✅ 使用 AlertProvider 包住整個應用，讓所有子元件都能使用警報狀態
    <AlertProvider>
      <div className="App" style={{ padding: '2rem' }}>
        {/* 🏷️ 頁面標題 */}
        <h1>Smart Bed Dashboard</h1>

        {/* 📦 主儀表板元件（顯示警報、病床狀態、操作區塊） */}
        <Dashboard />
      </div>
    </AlertProvider>
  );
}

// ✅ 匯出 App 元件供 index.js 使用
export default App;