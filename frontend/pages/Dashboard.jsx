import { useEffect, useState } from 'react';
import SleepStageChart from '../components/SleepStageChart';
import { fetchSleepData } from '../services/sleepApi';

export default function Dashboard() {
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    fetchSleepData().then(setSleepData);
  }, []);

  return (
    <div>
      <h2>睡眠階段分析</h2>
      <SleepStageChart data={sleepData} />
    </div>
  );
}