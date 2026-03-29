import styled from 'styled-components';
import OverviewSection from './components/OverviewSection';

const ReportResultPage = () => {
  return (
    <Main>
      <OverviewSection />
    </Main>
  );
};

export default ReportResultPage;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;
