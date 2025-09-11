import axios from 'axios';

export async function fetchSleepData() {
  const res = await axios.get('http://127.0.0.1:8000/sleep_stage/history');
  return res.data;
}