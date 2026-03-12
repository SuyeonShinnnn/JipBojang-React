import styled from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';
import { useState } from 'react';

const ChatbotStart = () => {
  const startServiceBtn = [
    '서비스 이용방법',
    '부동산 용어',
    '전세 사기 유형',
    '부동산 거래 퀴즈',
    '부동산 거래 전 체크리스트',
  ];
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div>
      <ChatbotBubble>
        안녕하세요. 집보장 AI 챗봇이에요.
        <br />
        무엇을 도와드릴까요?
      </ChatbotBubble>
      <ServiceWrapper>
        {startServiceBtn.map((item, key) => (
          <ServiceItem key={item} $active={selected === key}>
            <BaseButton
              variant={selected === key ? 'primary' : 'outline'}
              onClick={() => setSelected(key)}
            >
              {item}
            </BaseButton>
          </ServiceItem>
        ))}
      </ServiceWrapper>
    </div>
  );
};

export default ChatbotStart;

const ChatbotBubble = styled.div`
  background-color: var(--color-accent);
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  max-width: 80%;
  padding: 8px 12px;
  font-size: 0.95rem;
`;

const ServiceWrapper = styled.ul`
  margin: 8px 0 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0;
`;

const ServiceItem = styled.li<{ $active: boolean }>`
  display: inline-flex;

  button {
    padding: 4px 8px;
    border-radius: 50px;
    color: ${({ $active }) => ($active ? '#fff' : '#000')};
    font-size: 0.95rem;
  }
`;
