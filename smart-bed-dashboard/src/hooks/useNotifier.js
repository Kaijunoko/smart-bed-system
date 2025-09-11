import { toast } from 'react-toastify';

export function useNotifier() {
  // 系統通知權限
  const notifySystem = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };

  // React Toastify 提示
  const notifyToast = (message, type = 'info') => {
    if (type === 'error') toast.error(message);
    else if (type === 'success') toast.success(message);
    else toast(message);
  };

  // 封裝：根據警示類型觸發通知
  const notifyAlert = (alert) => {
    const title = `警示：${alert.type}`;
    const body = alert.message;

    notifySystem(title, body);
    notifyToast(`[${alert.type}] ${alert.message}`, alert.type === '低信心值' ? 'error' : 'info');
  };

  return { notifyAlert };
}