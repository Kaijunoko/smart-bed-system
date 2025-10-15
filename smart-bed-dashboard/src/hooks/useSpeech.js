// hooks/useSpeech.js
function useSpeech() {
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW'; // 可改成 'en-US' 或 'zh-CN'
    window.speechSynthesis.speak(utterance);
  };

  return { speak };
}

export default useSpeech;
