import styled, { keyframes } from 'styled-components';
import chatbotIcon from '../../assets/chatbot/mini-chatbot.png';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import { useChatbot } from './useChatbot';

const ChatbotBox = () => {
  const chatbot = useChatbot();

  return (
    <Container>
      <TitleContainer>
        <img src={chatbotIcon} />
        <h5>집보장 챗봇</h5>
      </TitleContainer>

      <ChatBody
        messages={chatbot.messages}
        quickButtons={chatbot.quickButtons}
        isSelected={chatbot.isSelected}
        handleButtonClick={chatbot.handleButtonClick}
        currentQuestion={chatbot.currentQuestion}
        quizStarted={chatbot.quizStarted}
        answerResult={chatbot.answerResult}
        selectedIndex={chatbot.selectedIndex}
        handleAnswer={chatbot.handleAnswer}
      />

      <ChatInput sendMessage={chatbot.sendMessage} />
    </Container>
  );
};

export default ChatbotBox;

const slideUp = keyframes`
  from { transform: translateY(10%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Container = styled.div`
  position: absolute;
  right: 1.5rem;
  bottom: 7.8rem;
  width: 320px;
  height: 60vh;
  border-radius: 12px;
  box-shadow: 8px 8px 20px var(--color-mediumgray);
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s ease-out;
`;

const TitleContainer = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--color-lightgray);

  img {
    width: 24px;
  }
`;
