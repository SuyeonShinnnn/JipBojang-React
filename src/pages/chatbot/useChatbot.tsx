import { useState } from 'react';
import { getServiceGuideMessages } from './chatbotHandler';
import {
  QUICK_BUTTONS,
  REAL_ESTATE_QUIZ_EXPERIENCE_OPTIONS,
  REAL_ESTATE_TERM_QUICK_BUTTONS,
} from '../../constants/chatbot/quickButtons';
import {
  CHECK_LIST_INTRO,
  REAL_ESTATE_INTRO,
  REAL_ESTATE_QUIZ_INTRO,
} from '../../constants/chatbot/chatbotMessages';
import ChecklistMessage from './components/ChecklistMessage';

export type Message = {
  role: 'bot' | 'user';
  text?: string;
  component?: React.ReactNode;
};

export const useChatbot = () => {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: `안녕하세요. 집보장 AI 챗봇이에요.\n무엇을 도와드릴까요?`,
    },
  ]);

  const [quickButtons, setQuickButtons] = useState<string[]>(QUICK_BUTTONS);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

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
      addMessage({
        role: 'bot',
        text: `${clicked}에 대한 설명입니다.`,
      });
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

      addMessage({
        role: 'bot',
        component: <ChecklistMessage />,
      });

      setIsSelected(null);
      return;
    }
  };

  return {
    messages,
    quickButtons,
    isSelected,
    handleButtonClick,
  };
};
