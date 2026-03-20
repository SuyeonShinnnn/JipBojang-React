import styled, { keyframes } from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';
import type { Message } from '../useChatbot';
import ChatbotQuiz from './ChatbotQuiz';

type Props = {
  messages: Message[];
  quickButtons: string[];
  isSelected: number | null;
  handleButtonClick: (index: number) => void;

  currentQuestion: any;
  quizStarted: boolean;
  answerResult: boolean | null;
  selectedIndex: number | null;
  handleAnswer: (index: number) => void;

  isLoading: boolean;
  dots: string;
};

const ChatBody = ({
  messages,
  quickButtons,
  isSelected,
  handleButtonClick,
  currentQuestion,
  quizStarted,
  answerResult,
  selectedIndex,
  handleAnswer,
  isLoading,
  dots,
}: Props) => {
  return (
    <BodySection>
      {messages.map((msg, i) => (
        <ChatBubble key={i} $role={msg.role}>
          {msg.component ? (
            msg.component
          ) : (
            <span dangerouslySetInnerHTML={{ __html: msg.text || '' }} />
          )}
        </ChatBubble>
      ))}

      {isLoading && <ChatBubble $role="bot">{dots}</ChatBubble>}

      {currentQuestion && quizStarted && (
        <ChatbotQuiz
          question={currentQuestion}
          answerResult={answerResult}
          selectedIndex={selectedIndex}
          onAnswer={handleAnswer}
        />
      )}

      <ButtonWrapper>
        {quickButtons.map((btn, key) => (
          <ButtonItem key={btn} $active={isSelected === key} $index={key}>
            <BaseButton
              type="button"
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
  display: flex;
  flex-direction: column;
`;

export const ChatBubble = styled.div<{ $role: 'bot' | 'user' }>`
  background: ${({ $role }) =>
    $role === 'bot' ? 'var(--color-accent)' : 'var(--color-primary)'};
  color: ${({ $role }) => ($role === 'user' ? '#fff' : '#000')};
  border-radius: 16px;
  border-bottom-left-radius: ${({ $role }) =>
    $role === 'bot' ? '4px' : '16px'};
  border-bottom-right-radius: ${({ $role }) =>
    $role === 'user' ? '4px' : '16px'};
  padding: 8px 12px;
  max-width: 80%;
  white-space: pre-line;
  margin-bottom: 8px;
  align-self: ${({ $role }) => ($role === 'bot' ? 'flex-start' : 'flex-end')};
  font-size: 0.9rem;
`;

const ButtonWrapper = styled.ul`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const fadeUp = keyframes`
  from{
    opacity: 0;
    transform: translateY(10px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

const ButtonItem = styled.li<{ $active: boolean; $index: number }>`
  list-style: none;
  opacity: 0;

  animation: ${fadeUp} 0.5s ease forwards;
  animation-delay: ${({ $index }) => $index * 0.1}s;

  button {
    padding: 4px 8px;
    border-radius: 50px;
    color: ${({ $active }) => ($active ? '#fff' : '#000')};
    font-size: 0.95rem;
  }
`;
