import React, { Suspense } from 'react';
import { AlertProvider } from './context/AlertContext';
import Dashboard from './pages/Dashboard';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AlertProvider>
      <div className="App" style={{ padding: '2rem' }}>
        <h1>Smart Bed Dashboard</h1>

        {/* 主畫面懸浮載入容器 */}
        <Suspense fallback={<div>載入中...</div>}>
          <Dashboard />
        </Suspense>

        {/* 通知容器放在畫面底部 */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AlertProvider>
  );
}

export default App;