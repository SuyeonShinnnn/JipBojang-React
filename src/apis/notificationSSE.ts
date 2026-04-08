export interface NotificationPayload {
  message: string;
  createdAt?: string;
  type?: string;
}

export const connectNotificationSSE = (
  userId: string,
  onMessage: (data: NotificationPayload) => void,
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
      onMessage(parsed);
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
