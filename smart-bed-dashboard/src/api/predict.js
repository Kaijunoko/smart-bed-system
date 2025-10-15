// api/predict.js
import axios from 'axios';

export async function predictSleepStage(input) {
  const response = await axios.post('/api/predict_sleep_stage', input);
  return response.data;
}
