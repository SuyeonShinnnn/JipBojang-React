import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import ReportPage from '../../pages/report/ReportPage';
import NotiPage from '../../pages/notification/NotiPage';
import NotFoundPage from '../../pages/NotFoundPage';
import LoginPage from '../../pages/auth/LoginPage';
import styled, { keyframes } from 'styled-components';
import BuildingPage from '../../pages/building/BuildingPage';
import chatbotIcon from '../../assets/chatbot/chatbot.png';
import ChatbotBox from '../../pages/chatbot/ChatbotBox';
import { useState } from 'react';
import ReportFormPage from '../../pages/report/ReportFormPage';
import ReportProgressPage from '../../pages/report/ReportProgressPage';
import ReportResultPage from '../../pages/report/ReportResultPage';

const DefaultLayout = () => {
  const location = useLocation();
  const isBuildingPage = location.pathname === '/building';

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <MainContent key={location.pathname} $noPadding={isBuildingPage}>
        <Routes location={location}>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/report/form" element={<ReportFormPage />} />
          <Route path="/report/progress" element={<ReportProgressPage />} />
          <Route path="/report/result" element={<ReportResultPage />} />
          <Route path="/notify" element={<NotiPage />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainContent>

      <ChatbotButton
        onClick={() => setIsChatOpen(!isChatOpen)}
        $isFocused={isChatOpen}
      >
        <Image src={chatbotIcon} />
        <span>챗봇</span>
      </ChatbotButton>

      {isChatOpen && <ChatbotBox />}
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

const MainContent = styled.main<{ $noPadding?: boolean }>`
  padding-top: ${({ $noPadding }) => ($noPadding ? '0' : '4.5rem')};
  animation: ${fadeSlideIn} 0.35s ease-out both;
`;

const ChatbotButton = styled.button<{ $isFocused: boolean }>`
  position: fixed;
  right: 1.3rem;
  bottom: 1.3rem;

  width: 88px;
  height: 88px;
  color: white;
  background-color: var(--color-primary);
  box-shadow: 5px 5px 20px var(--color-mediumgray);
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
  width: 48px;
`;
