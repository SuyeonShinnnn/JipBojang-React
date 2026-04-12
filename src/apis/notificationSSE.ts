import type { RegistryChanged } from '../types/notification';

export interface NotificationPayload {
  message: RegistryChanged;
  createdAt?: string;
  type?: string;
}

export const connectNotificationSSE = (
  userId: string,
  onMessage: (data: RegistryChanged) => void,
  onError?: () => void,
) => {
  const eventSource = new EventSource(
    `${import.meta.env.VITE_API_BASE_URL}/sse/subscribe/${userId}`,
    {
      withCredentials: true,
    },
  );

  eventSource.addEventListener('notification', (event) => {
    try {
      const parsed = JSON.parse(event.data);
      console.log(parsed);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => onMessage(item));
      } else {
        onMessage(parsed);
      }
    } catch (error) {
      console.error('SSE 파싱 실패:', error);
    }
  });

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류:', error);
    onError?.();
  };

  return eventSource;
};
