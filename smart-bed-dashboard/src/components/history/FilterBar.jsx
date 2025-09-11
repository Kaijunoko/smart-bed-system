// src/components/AlertHistory/FilterBar.jsx

import React from 'react';

function FilterBar({ filterType, setFilterType }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>篩選類型：</label>
      <select value={filterType} onChange={e => setFilterType(e.target.value)}>
        <option value="all">全部</option>
        <option value="pressure">壓力異常</option>
        <option value="turn">翻身異常</option>
        <option value="bedExit">離床警示</option>
      </select>
    </div>
  );
}

export default FilterBar;