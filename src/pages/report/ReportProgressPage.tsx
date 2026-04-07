import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTyping } from '../../hooks/useTyping';

const ReportProgressPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    '데이터 수집',
    '가격 분석',
    '권리 분석',
    '전세 사기 분석',
    '집포트 생성',
  ];

  const displayText = useTyping({
    text: '...',
    typeSpeed: 500,
    pauseAfterType: 500,
    pauseAfterDelete: 500,
  });

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1000); // 1초마다 다음 step

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <>
      <Container>
        <h1>
          {displayText}
          <br />
          집포트 생성중
        </h1>
        <ListWrapper>
          {steps.map((item, key) => (
            <List $active={key <= currentStep}>
              <Number $active={key <= currentStep}>0{key + 1}</Number>
              <p>{item}</p>
            </List>
          ))}
        </ListWrapper>
      </Container>
    </>
  );
};

export default ReportProgressPage;

const Container = styled.section`
  height: 80vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);

  h1 {
    text-align: center;
  }
`;

const ListWrapper = styled.ul`
  display: flex;
  gap: 2rem;
`;

const List = styled.li<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  border: 1px solid
    ${({ $active }) =>
      $active ? 'rgb(var(--color-primary))' : 'rgb(var(--color-darkgray))'};
  border-radius: 12px;
  padding: 1rem;
  width: 148px;
  height: 208px;

  background-color: ${({ $active }) =>
    $active ? 'rgb(119, 116, 234, 0.1)' : 'rgb(217, 217, 217, 0.1)'};

  transform: ${({ $active }) => ($active ? 'scale(1.08)' : 'scale(1)')};

  transition: all 0.3s ease;

  p {
    font-weight: 500;
  }
`;

const Number = styled.strong<{ $active: boolean }>`
  color: ${({ $active }) =>
    $active ? 'rgb(var(--color-primary-dark))' : 'rgb(var(--color-darkgray))'};
  font-size: 40px;
`;
