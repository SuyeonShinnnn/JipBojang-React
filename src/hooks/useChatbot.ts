import { useState } from 'react';
import { sendChatMessage } from '../apis/chatbotApi';
import {
  QUICK_BUTTONS,
  REAL_ESTATE_TERM_QUICK_BUTTONS,
  REAL_ESTATE_QUIZ_EXPERIENCE_OPTIONS,
} from '../constants/chatbot/quickButtons';

import {
  REAL_ESTATE_INTRO,
  REAL_ESTATE_QUIZ_INTRO,
  CHECK_LIST_INTRO,
} from '../constants/chatbot/chatbotMessages';

import { getServiceGuideMessages } from '../pages/chatbot/chatbotHandler';
import { createChecklistMessage } from '../pages/chatbot/MessageFactory';

export type Message = {
  role: 'bot' | 'user';
  text?: string;
  component?: React.ReactNode;
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: '안녕하세요. 집보장 AI 챗봇입니다.\n궁금한 내용을 선택하거나 입력해주세요.',
    },
  ]);

  const [quickButtons, setQuickButtons] = useState<string[]>(QUICK_BUTTONS);
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  /**
   * API 챗봇 메시지
   */
  const sendMessage = async (text: string) => {
    addMessage({
      role: 'user',
      text,
    });

    try {
      const data = await sendChatMessage(text);

      addMessage({
        role: 'bot',
        text: data.reply,
      });
    } catch {
      addMessage({
        role: 'bot',
        text: '서버 연결에 문제가 발생했습니다.',
      });
    }
  };

  /**
   * 퀵버튼
   */
  const handleButtonClick = (index: number) => {
    setIsSelected(index);

    const clicked = quickButtons[index];

    addMessage({
      role: 'user',
      text: clicked,
    });

    if (clicked === '서비스 이용방법') {
      setMessages((prev) => [...prev, ...getServiceGuideMessages()]);
      return;
    }

    if (clicked === '부동산 용어') {
      addMessage({
        role: 'bot',
        text: REAL_ESTATE_INTRO,
      });

      setQuickButtons(REAL_ESTATE_TERM_QUICK_BUTTONS);
      setIsSelected(null);
      return;
    }

    if (REAL_ESTATE_TERM_QUICK_BUTTONS.includes(clicked)) {
      sendMessage(clicked);
      return;
    }

    if (clicked === '부동산 거래 퀴즈') {
      addMessage({
        role: 'bot',
        text: REAL_ESTATE_QUIZ_INTRO,
      });

      setQuickButtons(REAL_ESTATE_QUIZ_EXPERIENCE_OPTIONS);
      setIsSelected(null);
      return;
    }

    if (clicked === '부동산 거래 전 체크리스트') {
      addMessage({
        role: 'bot',
        text: CHECK_LIST_INTRO,
      });

      addMessage(createChecklistMessage());

      setIsSelected(null);
      return;
    }
  };

  return {
    messages,
    quickButtons,
    isSelected,
    sendMessage,
    handleButtonClick,
  };
};
