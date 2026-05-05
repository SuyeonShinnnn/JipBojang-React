import styled from 'styled-components';
import { createPortal } from 'react-dom';
import ScoreSection from './components/ScoreSection';
import { useNavigate } from 'react-router-dom';
import PriceAnalysisSection from './components/PriceAnalysisSection';
import RightAnalysisSection from './components/RightAnalysisSection';
import FraudAnalysisSection from './components/FraudAnalysisSection';
import ReferenceSection from './components/ReferenceSection';
import { useReportStore } from '../../stores/reportStore';
import { useAuthStore } from '../../stores/auth';

const ReportResultPage = () => {
  const navigate = useNavigate();
  const { report } = useReportStore();
  const auth = useAuthStore();
  const userName = auth.user.nickname;
  return (
    <>
      <Main>
        <Container>
          <Title>
            <MainTitle>
              <span>{userName}</span>님이 <span>{report?.type}</span>로{' '}
              <span>{report?.amount}</span>원에 계약한
              <br />
              <span>{report?.address}</span>
            </MainTitle>

            <SubTitle>집포트 분석 결과📝</SubTitle>
          </Title>
          <Section>
            <ScoreSection />
          </Section>
          <hr />
          <Section>
            <PriceAnalysisSection />
          </Section>
          <hr />
          <Section>
            <RightAnalysisSection />
          </Section>
          <hr />
          <Section>
            <FraudAnalysisSection />
          </Section>
          <hr />
          <Section>
            <ReferenceSection />
          </Section>
        </Container>
      </Main>

      {createPortal(
        <FloatingButton onClick={() => navigate('/notify')}>
          🔔등기변동 알림 신청
        </FloatingButton>,
        document.body,
      )}
    </>
  );
};

export default ReportResultPage;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px 140px;
  min-height: 100vh;

  background: linear-gradient(180deg, #f8f9ff 0%, #f1f3ff 100%);
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  color: #555;

  span {
    font-size: 24px;
    color: rgb(var(--color-primary-dark));
    font-weight: 700;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: var(--text-primary);
`;

const Container = styled.div`
  width: min(920px, 100%);
  display: flex;
  flex-direction: column;
  gap: 56px;

  padding: 48px 40px;
  border-radius: 24px;

  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);

  hr {
    border: 1px solid rgba(var(--color-lightgray));
  }
`;

const Section = styled.section`
  width: 100%;
`;

const FloatingButton = styled.button`
  position: fixed;
  left: 50%;
  bottom: calc(env(safe-area-inset-bottom) + 20px);
  transform: translateX(-50%);
  z-index: 999999;

  padding: 1rem 2rem;
  border: none;
  border-radius: 9999px;

  background: #fff;
  color: var(--color-darkgray);
  font-size: 16px;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    cursor: pointer;
    transform: translateX(-50%) translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateX(-50%) translateY(-1px);
  }
`;
