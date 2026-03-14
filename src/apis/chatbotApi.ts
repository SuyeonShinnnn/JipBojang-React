export type ChatbotResponse = {
  reply: string;
};

export const sendChatMessage = async (
  message: string,
): Promise<ChatbotResponse> => {
  const res = await fetch('/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!res.ok) {
    throw new Error('챗봇 API 요청 실패');
  }

  return res.json();
};
