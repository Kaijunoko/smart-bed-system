import { useState, useCallback } from 'react';

export function useAlertLog() {
  const [log, setLog] = useState([]);

  const addLog = useCallback((entry) => {
    setLog(prev => [...prev, { ...entry, id: Date.now() }]);
  }, []);

  const clearLog = useCallback(() => {
    setLog([]);
  }, []);

  const deleteLog = useCallback((id) => {
    setLog(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const filterByType = useCallback((type) => {
    return log.filter(entry => entry.type === type);
  }, [log]);

  const exportToCSV = useCallback(() => {
    if (log.length === 0) return '';

    const headers = Object.keys(log[0]);
    const rows = log.map(entry =>
      headers.map(h => `"${String(entry[h]).replace(/"/g, '""')}"`).join(',')
    );

    return [headers.join(','), ...rows].join('\n');
  }, [log]);

  return {
    log,
    addLog,
    clearLog,
    deleteLog,
    filterByType,
    exportToCSV,
  };
}