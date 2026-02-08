import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ReportPage from '../../pages/ReportPage';
import NotiPage from '../../pages/notification/NotiPage';
import NotFoundPage from '../../pages/NotFoundPage';
import LoginPage from '../../pages/auth/LoginPage';
import styled, { keyframes } from 'styled-components';
import BuildingPage from '../../pages/building/BuildingPage';

const DefaultLayout = () => {
  const location = useLocation();

  return (
    <MainContent key={location.pathname}>
      <Routes location={location}>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/notify" element={<NotiPage />} />
        <Route path="/building" element={<BuildingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainContent>
  );
};

export default DefaultLayout;

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainContent = styled.main`
  padding-top: 4.5rem;
  animation: ${fadeSlideIn} 0.35s ease-out both;
`;
