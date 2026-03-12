import styled from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';
import { useState } from 'react';
import { serviceUtilItems } from '../../../constants/chatbotMessages';

const ChatbotStart = () => {
  const startServiceBtn = [
    '서비스 이용방법',
    '부동산 용어',
    '전세 사기 유형',
    '부동산 거래 퀴즈',
    '부동산 거래 전 체크리스트',
  ];

  const [selected, setSelected] = useState<number | null>(null);
  const [botMessage, setBotMessage] = useState<string | null>(null);

  // 버튼별 챗봇 응답
  const botResponses: Record<number, string> = {
    0: `${serviceUtilItems}`,
    1: `부동산 용어 예시\n• 근저당 : 대출 담보로 설정된 권리\n• 전입신고 : 거주지를 신고하는 절차`,
    2: `대표적인 전세 사기 유형\n1️⃣ 깡통전세\n2️⃣ 이중 계약\n3️⃣ 무자격 임대인`,
    3: `퀴즈!\n전세 계약 전에 반드시 확인해야 하는 것은?\n① 등기부등본\n② 건물 색깔\n③ 집주인 취미`,
    4: `부동산 거래 전 체크리스트\n✔ 등기부등본 확인\n✔ 전입세대 열람\n✔ 확정일자 받기`,
  };

  const handleClick = (index: number) => {
    console.log(botResponses[0]);
    setSelected(index);
    setBotMessage(botResponses[index]);
  };

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
              onClick={() => handleClick(key)}
            >
              {item}
            </BaseButton>
          </ServiceItem>
        ))}
      </ServiceWrapper>

      {botMessage && <ChatbotBubble>{botMessage}</ChatbotBubble>}
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
  margin-bottom: 8px;
  white-space: pre-line;
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
