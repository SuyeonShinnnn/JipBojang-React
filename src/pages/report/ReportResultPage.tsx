import styled from 'styled-components';
import OverviewSection from './components/OverviewSection';
import ScoreSection from './components/ScoreSection';

const ReportResultPage = () => {
  return (
    <Main>
      <OverviewSection />
      <ScoreSection />
    </Main>
  );
};

export default ReportResultPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
