import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const stageColorMap = {
  awake: '#FF4D4F',
  light: '#1890FF',
  deep: '#52C41A',
  REM: '#FAAD14'
};

export default function SleepStageChart({ data }) {
  return (
    <LineChart width={800} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="stage"
        stroke="#8884d8"
        dot={({ payload }) => ({
          r: 6,
          fill: stageColorMap[payload.stage] || '#ccc'
        })}
      />
      <Line type="monotone" dataKey="confidence" stroke="#82ca9d" />
    </LineChart>
  );
}