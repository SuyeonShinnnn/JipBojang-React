import styled from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';
import type { Message } from '../useChatbot';

type Props = {
  messages: Message[];
  quickButtons: string[];
  isSelected: number | null;
  handleButtonClick: (index: number) => void;
};

const ChatBody = ({
  messages,
  quickButtons,
  isSelected,
  handleButtonClick,
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

      <ButtonWrapper>
        {quickButtons.map((btn, key) => (
          <ButtonItem key={btn} $active={isSelected === key}>
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
