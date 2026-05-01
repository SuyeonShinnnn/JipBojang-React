import styled from 'styled-components';
import { createPortal } from 'react-dom';
import OverviewSection from './components/OverviewSection';
import ScoreSection from './components/ScoreSection';
import { useNavigate } from 'react-router-dom';
import PriceAnalysisSection from './components/PriceAnalysisSection';
import RightAnalysisSection from './components/RightAnalysisSection';

const ReportResultPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <OverviewSection />
        <ScoreSection />
        <PriceAnalysisSection />
        <RightAnalysisSection />
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

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 140px;
  background: #fafafa;
  min-height: 100vh;
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
