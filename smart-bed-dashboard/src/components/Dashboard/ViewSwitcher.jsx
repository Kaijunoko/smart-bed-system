// src/components/Dashboard/ViewSwitcher.jsx

import React from 'react';

function ViewSwitcher({ view, setView }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={() => setView('realtime')}
        style={{
          backgroundColor: view === 'realtime' ? '#1976d2' : '#ccc',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          marginRight: '0.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        🩺 即時監控
      </button>
      <button
        onClick={() => setView('history')}
        style={{
          backgroundColor: view === 'history' ? '#1976d2' : '#ccc',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        📊 歷史分析
      </button>
    </div>
  );
}

export default ViewSwitcher;