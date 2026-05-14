import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import styled, { keyframes } from 'styled-components';
import chatbotIcon from '../../assets/chatbot/chatbot.png';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpanner';

const LoginPage = lazy(() => import('../../pages/auth/LoginPage'));
const SignupPage = lazy(() => import('../../pages/auth/SignupPage'));
const InfoInputPage = lazy(() => import('../../pages/auth/InfoInputPage'));

const NotiPage = lazy(() => import('../../pages/notification/NotiPage'));
const BuildingPage = lazy(() => import('../../pages/building/BuildingPage'));

const ReportPage = lazy(() => import('../../pages/report/ReportPage'));
const ReportFormPage = lazy(() => import('../../pages/report/ReportFormPage'));
const ReportProgressPage = lazy(
  () => import('../../pages/report/ReportProgressPage'),
);
const ReportResultPage = lazy(
  () => import('../../pages/report/ReportResultPage'),
);

const ChatbotBox = lazy(() => import('../../pages/chatbot/ChatbotBox'));

const ConsultingUserPage = lazy(
  () => import('../../pages/consultant/ConsultingUserPage'),
);

const DefaultLayout = () => {
  const location = useLocation();
  const isBuildingPage = location.pathname === '/building';

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <MainContent key={location.pathname} $noPadding={isBuildingPage}>
        <Suspense
          fallback={
            <Container>
              <LoadingSpinner />
            </Container>
          }
        >
          <Routes location={location}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/info" element={<InfoInputPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/report/form" element={<ReportFormPage />} />
            <Route path="/report/progress" element={<ReportProgressPage />} />
            <Route path="/report/result" element={<ReportResultPage />} />
            <Route path="/notify" element={<NotiPage />} />
            <Route path="/building" element={<BuildingPage />} />
            <Route path="/consult" element={<ConsultingUserPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MainContent>

      {!isBuildingPage && (
        <ChatbotButton
          onClick={() => setIsChatOpen(!isChatOpen)}
          $isFocused={isChatOpen}
        >
          <Image src={chatbotIcon} alt="chatbot" />
          <span>챗봇</span>
        </ChatbotButton>
      )}

      {isChatOpen && (
        <Suspense fallback={<div>로딩중...</div>}>
          <ChatbotBox />
        </Suspense>
      )}
    </>
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`;

const MainContent = styled.main<{ $noPadding?: boolean }>`
  position: relative;
  padding-top: ${({ $noPadding }) => ($noPadding ? '0' : '4rem')};
  animation: ${fadeSlideIn} 0.35s ease-out both;
`;

const ChatbotButton = styled.button<{ $isFocused: boolean }>`
  position: fixed;
  right: 1.3rem;
  bottom: 1.3rem;

  width: 76px;
  height: 76px;
  color: white;
  background-color: rgb(var(--color-primary));
  box-shadow: 5px 5px 20px rgb(var(--color-mediumgray));
  border-style: none;
  border-radius: 50px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  opacity: ${({ $isFocused }) => ($isFocused ? 0.5 : 1)};

  transition:
    transform 0.3s ease,
    opacity 0.5s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;
