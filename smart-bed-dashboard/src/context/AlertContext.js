import React, { createContext, useContext, useState } from 'react';

/**
 * AlertContext 提供整個系統的警示狀態與更新方法
 */
const AlertContext = createContext();

/**
 * AlertProvider 包住整個 Dashboard，讓子元件都能使用警示狀態
 */
export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  // 可擴充：加入 lastUpdated、activeBedId、pushNotification 等
  const value = {
    alerts,
    setAlerts,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
}

/**
 * useAlerts 是自訂 hook，讓元件可以直接使用警示狀態
 */
export function useAlerts() {
  return useContext(AlertContext);
}