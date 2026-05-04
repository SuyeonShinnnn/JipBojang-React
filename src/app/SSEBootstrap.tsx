import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth';
import { useNotificationStore } from '../stores/notiStore';
import { connectNotificationSSE } from '../apis/notificationSSE';

function SSEBootstrap() {
  const userId = useAuthStore((s) => s.user?.userId);
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!userId) return;

    const sse = connectNotificationSSE(userId, addNotification);

    return () => sse.close();
  }, [userId]);

  return null;
}

export default SSEBootstrap;
