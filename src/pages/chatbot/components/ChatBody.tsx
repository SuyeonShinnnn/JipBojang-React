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
  padding: 12px;
`;
