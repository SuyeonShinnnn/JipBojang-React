import styled from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';

interface ChattingStartCard {
  firstChat: (quetion: string) => void;
}

const FAQ = [
  '상담 가능 시간은 언제인가요?',
  '전월세 비율 추세가 궁금해요',
  '필요한 서류가 있나요?',
  '계약 전에 확인해야 할것들을 알려주세요',
];

const ChattingStartCard = ({ firstChat }: ChattingStartCard) => {
  return (
    <Container>
      <h2>대화를 시작해 보세요</h2>
      <p>전문가 상담을 통해 전세 사기를 예방해 보세요</p>

      <h3>자주 묻는 질문</h3>
      <ButtonWrapper>
        {FAQ.map((item, idx) => (
          <li key={idx}>
            <StyledButton variant="outline" onClick={() => firstChat(item)}>
              {item}
            </StyledButton>
          </li>
        ))}
      </ButtonWrapper>
    </Container>
  );
};

export default ChattingStartCard;

const Container = styled.div`
  background-color: #fff;
  width: 50%;
  max-width: 440px;
  padding: 40px 24px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 8px;

  p {
    color: rgba(var(--color-darkgray));
    margin-bottom: 20px;
  }
`;

const ButtonWrapper = styled.ul`
  display: grid;
  gap: 12px;
`;

const StyledButton = styled(BaseButton)`
  width: 100%;
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid rgba(var(--color-lightgray));
  color: #000;
  background-color: rgba(var(--color-accent) / 20%);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 4px 4px 10px rgba(var(--color-lightgray));
  }
`;
