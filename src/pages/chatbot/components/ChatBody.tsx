import { useState } from 'react';
import styled from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';
import {
  QUICK_BUTTONS,
  REAL_ESTATE_TERM_QUICK_BUTTONS,
} from '../../../constants/chatbot/quickButtons';
import {
  SERVICE_GUIDE_END,
  SERVICE_GUIDE_INTRO,
  SERVICE_GUIDE_ITEMS,
  REAL_ESTATE_INTRO,
} from '../../../constants/chatbot/chatbotMessages';

type Message = {
  role: 'bot' | 'user';
  text?: string;
};

const ChatBody = () => {
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

    addMessage({
      role: 'user',
      text: quickButtons[index],
    });

    if (quickButtons[index] === '서비스 이용방법') {
      const botMessages: Message[] = [
        SERVICE_GUIDE_INTRO,
        ...SERVICE_GUIDE_ITEMS,
        SERVICE_GUIDE_END,
      ].map((item) => ({
        role: 'bot',
        text: item,
      }));

      setMessages((prev) => [...prev, ...botMessages]);
      return;
    }

    if (quickButtons[index] === '부동산 용어') {
      addMessage({
        role: 'bot',
        text: REAL_ESTATE_INTRO,
      });

      setQuickButtons(REAL_ESTATE_TERM_QUICK_BUTTONS);
      setIsSelected(null);
      return;
    }

    if (REAL_ESTATE_TERM_QUICK_BUTTONS.includes(quickButtons[index])) {
      addMessage({
        role: 'bot',
        text: `${quickButtons[index]}에 대한 설명입니다.`,
      });
    }
  };

  return (
    <BodySection>
      {messages.map((msg, i) => (
        <ChatBubble key={i} $role={msg.role}>
          <span dangerouslySetInnerHTML={{ __html: msg.text || '' }} />
        </ChatBubble>
      ))}

      <ButtonWrapper>
        {quickButtons.map((btn, key) => (
          <ButtonItem key={btn} $active={isSelected === key}>
            <BaseButton
              variant={isSelected === key ? 'primary' : 'outline'}
              onClick={() => handleButtonClick(key)}
            >
              {btn}
            </BaseButton>
          </ButtonItem>
        ))}
      </ButtonWrapper>
    </BodySection>
  );
};

export default ChatBody;

const BodySection = styled.section`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
`;

export const ChatBubble = styled.div<{ $role: 'bot' | 'user' }>`
  color: ${({ $role }) => ($role === 'user' ? '#fff' : '#000')};
  background-color: ${({ $role }) =>
    $role === 'bot' ? 'var(--color-accent)' : 'var(--color-primary)'};
  padding: 8px 12px;
  max-width: 80%;
  border-radius: 16px;
  border-bottom-left-radius: ${({ $role }) =>
    $role === 'bot' ? '4px' : '16px'};
  border-bottom-right-radius: ${({ $role }) =>
    $role === 'user' ? '4px' : '16px'};
  margin-bottom: 8px;
  white-space: pre-line;
  align-self: ${({ $role }) => ($role === 'bot' ? 'flex-start' : 'flex-end')};
`;

export const ButtonWrapper = styled.ul`
  margin: 8px 0 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0;
`;

export const ButtonItem = styled.li<{ $active: boolean }>`
  list-style: none;

  button {
    padding: 4px 8px;
    border-radius: 50px;
    color: ${({ $active }) => ($active ? '#fff' : '#000')};
    font-size: 0.95rem;
  }
`;
