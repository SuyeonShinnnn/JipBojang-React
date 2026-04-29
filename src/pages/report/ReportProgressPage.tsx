import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTyping } from '../../hooks/useTyping';
import { useReportStore } from '../../stores/reportStore';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const store = useReportStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const createReportProgress = async () => {
      const reportId = Number(store.reportId);
      const address = store.address;

      console.log(reportId);
      console.log(address);
      console.log(Number(reportId));
      if (!reportId) return;
      if (!store.report) await store.fetchReport(reportId);

      intervalRef.current = setInterval(async () => {
        try {
          setCurrentStep((prev) => {
            const next = prev + 1;

            if (prev === 1) {
              store.fetchPrice(reportId);
            }

            if (prev === 2) {
              store.fetchRight(reportId, address!);
            }

            if (prev === 3) {
              store.fetchFraud(reportId);
            }

            if (prev >= steps.length - 1) {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }

              navigate('/report/result');
              return prev;
            }

            return next;
          });
        } catch (err) {
          console.log(err);
        }
      }, 2000);
    };

    createReportProgress();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
            <List key={key} $active={key <= currentStep}>
              <NumberText $active={key <= currentStep}>0{key + 1}</NumberText>
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
      $active ? 'var(--color-primary)' : 'var(--color-darkgray)'};
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

const NumberText = styled.strong<{ $active: boolean }>`
  color: ${({ $active }) =>
    $active ? 'var(--color-primary-dark)' : 'var(--color-darkgray)'};
  font-size: 40px;
`;
