// src/components/AlertHistory/DateRangePicker.jsx

import React from 'react';

function DateRangePicker({ range, setRange }) {
  const handlePreset = (preset) => {
    const now = new Date();
    let start, end;

    if (preset === 'today') {
      start = new Date(now.setHours(0, 0, 0, 0));
      end = new Date();
    } else if (preset === 'week') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // 週一為起點
      start = new Date(now.setDate(diff));
      start.setHours(0, 0, 0, 0);
      end = new Date();
    }

    setRange({ start, end });
  };

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setRange(prev => ({
      ...prev,
      [name]: new Date(value),
    }));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>時間範圍：</label>
      <button onClick={() => handlePreset('today')}>今天</button>
      <button onClick={() => handlePreset('week')} style={{ marginLeft: '0.5rem' }}>本週</button>
      <div style={{ marginTop: '0.5rem' }}>
        <label>自訂：</label>
        <input type="date" name="start" onChange={handleCustomChange} />
        <span style={{ margin: '0 0.5rem' }}>至</span>
        <input type="date" name="end" onChange={handleCustomChange} />
      </div>
    </div>
  );
}

export default DateRangePicker;