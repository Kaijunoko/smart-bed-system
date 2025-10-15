import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const fetchSummary = () =>
  axios.get(`${BASE_URL}/report/summary`);

export const fetchLatestAlerts = () =>
  axios.get(`${BASE_URL}/debug/db`);
