import styled, { keyframes } from 'styled-components';
import chatbotIcon from '../../assets/chatbot/mini-chatbot.png';
import sendIcon from '../../assets/chatbot/send.png';
import ChatBody from './components/ChatBody';

const ChatbotBox = () => {
  return (
    <Container>
      <TitleContainer>
        <img src={chatbotIcon} />
        <h5>집보장 챗봇</h5>
      </TitleContainer>

      <ChatBody />

      <TextSendContainer>
        <Input type="text" placeholder="궁금한 내용을 입력해주세요." />
        <SendButton>
          <div>
            <img src={sendIcon} />
          </div>
        </SendButton>
      </TextSendContainer>
    </Container>
  );
};
export default ChatbotBox;

const slideUp = keyframes`
    from{
        transform: translateY(10%);
        opacity: 0;
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
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

  hr {
    border: none;
    border-top: 1px solid var(--color-lightgray);
  }
`;

const TitleContainer = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--color-lightgray);

  h5 {
    font-size: 16px;
    font-weight: 600;
  }

  img {
    width: 24px;
  }
`;

const TextSendContainer = styled.div`
  position: fixed;
  bottom: 7.8rem;

  display: flex;
  gap: 4px;
  align-items: center;

  width: 320px;
  padding: 8px;
  border-top: 1px solid var(--color-lightgray);
  background-color: #fff;

  div {
    margin: 0;
  }
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  border: 1px solid var(--color-lightgray);
  border-radius: 50px;
  margin-bottom: 0;

  &:focus {
    border: 1px solid var(--color-primary);
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: white;
  border: none;
  width: 10%;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    transform: rotate(-45deg);
  }

  &:hover {
    cursor: pointer;
  }
`;
