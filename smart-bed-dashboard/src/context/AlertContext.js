// src/context/AlertContext.js
import { createContext, useState } from "react";

// 建立警報狀態的 Context
export const AlertContext = createContext();

// 提供者元件，包住整個 App 或 Dashboard
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  return (
    <AlertContext.Provider value={{ alerts, setAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};