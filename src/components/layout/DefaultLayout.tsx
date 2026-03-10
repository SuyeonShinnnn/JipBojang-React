import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ReportPage from '../../pages/ReportPage';
import NotiPage from '../../pages/notification/NotiPage';
import NotFoundPage from '../../pages/NotFoundPage';
import LoginPage from '../../pages/auth/LoginPage';
import styled, { keyframes } from 'styled-components';
import BuildingPage from '../../pages/building/BuildingPage';
import chatbotIcon from '../../assets/chatbot/chatbot.png';

const DefaultLayout = () => {
  const location = useLocation();
  const isBuildingPage = location.pathname === '/building';

  return (
    <>
      <MainContent key={location.pathname} $noPadding={isBuildingPage}>
        <Routes location={location}>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/notify" element={<NotiPage />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainContent>
      
      <ChatbotButton>
        <Image src={chatbotIcon} />
        <span>챗봇</span>
      </ChatbotButton>
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

const ChatbotButton = styled.button`
  position: fixed;
  right: 1.3rem;
  bottom: 1.3rem;

  width: 92px;
  height: 92px;
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

  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 48px;
`;
