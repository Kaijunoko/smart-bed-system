// src/components/PressureChart.jsx

import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { getSimulatedPressure } from '../utils/simulator';
import { evaluateAlerts } from '../utils/alertEngine';
import { AlertContext } from '../context/AlertContext';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

function PressureChart() {
  const [pressureData, setPressureData] = useState([]);
  const { setAlerts } = useContext(AlertContext); // 使用 context 更新警報

  useEffect(() => {
    const interval = setInterval(() => {
      const newPressure = getSimulatedPressure();

      // 更新壓力資料陣列（最多保留 20 筆）
      setPressureData(prev => {
        const next = [...prev, newPressure];
        return next.slice(-20);
      });

      // 模擬完整資料（可擴充）
      const simulatedData = {
        pressure: newPressure,
        lastTurnTime: Date.now() - Math.floor(Math.random() * 5 * 60 * 60 * 1000),
        bedExit: Math.random() < 0.3,
      };

      // 產生警報並更新 context
      const result = evaluateAlerts(simulatedData);
      setAlerts(result);
    }, 1000); // 每秒更新一次

    return () => clearInterval(interval);
  }, [setAlerts]);

  const chartData = {
    labels: pressureData.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Pressure',
        data: pressureData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Pressure Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default PressureChart;