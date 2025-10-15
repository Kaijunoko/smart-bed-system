// components/CompanionCard.jsx
import React from 'react';
import useSpeech from '../hooks/useSpeech';

function CompanionCard({ message }) {
  const { speak } = useSpeech();

  if (!message) return null;

  return (
    <div className="companion-card">
      <p style={{ fontStyle: 'italic' }}>🧘 陪伴訊息：{message}</p>
      <button onClick={() => speak(message)}>🔊 播放語音</button>
    </div>
  );
}

export default CompanionCard;
