// src/pages/SleepMonitor.jsx
import React, { useState } from 'react';
import { predictSleepStage } from '../api/predict';
import CompanionCard from '../components/CompanionCard';

function SleepMonitor() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const input = {
        pressure_mean: 45.2,
        pressure_std: 12.3,
        movement_count: 4,
        fft_peak_ratio: 0.67,
        turn_flag: 1
      };
      const res = await predictSleepStage(input);
      console.log('API 回傳結果：', res);
      setResult(res);
    } catch (err) {
      console.error('API 錯誤：', err);
      setError('❌ 無法取得推論結果，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🛏️ 睡眠推論測試</h2>
      <button onClick={handlePredict} disabled={loading}>
        {loading ? '推論中…' : '送出推論'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {result && <CompanionCard message={result.message} />}

      {result && (
        <div style={{ background: '#f5f5f5', padding: '1rem', marginTop: '1rem' }}>
          <h4>🔍 Debug 回傳結果：</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SleepMonitor;
