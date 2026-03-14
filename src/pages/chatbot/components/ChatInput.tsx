import { useState } from 'react';
import styled from 'styled-components';
import sendIcon from '../../../assets/chatbot/send.png';

type Props = {
  sendMessage: (text: string) => void;
};

const ChatInput = ({ sendMessage }: Props) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage(input);
    setInput('');
  };

  return (
    <Container>
      <Input
        value={input}
        placeholder="궁금한 내용을 입력해주세요."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />

      <SendButton onClick={handleSend}>
        <img src={sendIcon} alt="send" />
      </SendButton>
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  padding: 10px;
  border-top: 1px solid var(--color-lightgray);
  background-color: #fff;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 14px;

  border: 1px solid var(--color-lightgray);
  border-radius: 50px;

  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const SendButton = styled.button`
  border: none;
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 20px;
    transform: rotate(-45deg);
  }
`;
