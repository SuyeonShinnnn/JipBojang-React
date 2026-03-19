import axios from 'axios';

export type ChatbotResponse = {
  reply: string;
};

export const sendToGPT = async (text: string) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/chatbot',
      data: { message: text },
    });
    return res.data.reply;
  } catch (err: any) {
    if (err.name === 'CanceledError' || err.message === 'canceled') return ''; // 초기화로 취소된 경우 조용히 무시
    console.error(err);
    return '⚠️ 서버 오류가 발생했습니다.';
  }
};

export const axiosFetch = async (config: any) => {
  const controller = new AbortController();
  // activeControllers.add(controller);
  try {
    const res = await axios({ ...config, signal: controller.signal });
    return res;
  } finally {
    // activeControllers.delete(controller);
  }
};
