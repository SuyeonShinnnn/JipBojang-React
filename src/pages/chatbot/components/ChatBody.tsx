import styled from 'styled-components';
import ChatbotStart from './ChatbotStart';

const ChatBody = () => {
  return (
    <BodySection>
      <ChatbotStart />
    </BodySection>
  );
};

export default ChatBody;

const BodySection = styled.section`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  padding-bottom: 4rem;
`;
