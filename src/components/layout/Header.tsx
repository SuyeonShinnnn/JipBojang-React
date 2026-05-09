import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../stores/auth';
import BaseButton from '../common/BaseButton';
import { NavLink } from 'react-router-dom';
import Alarm from './Alarm';

type NavItem = {
  name: string;
  path: string;
};

const navItems: NavItem[] = [
  { name: '건물 정보', path: '/building' },
  { name: '집보장 리포트', path: '/report' },
  { name: '등기변동알림', path: '/notify' },
  { name: '전문가 상담', path: '/consult' },
  { name: '커뮤니티', path: '/community' },
];

const Header: React.FC = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <ItemWrapper>
        <LogoImage src="/logo.svg" onClick={handleLogoClick} alt="Logo" />
        <NavItemsWrapper>
          {navItems.map((item, index) => (
            <StyledNavLink key={index} to={item.path}>
              {item.name}
            </StyledNavLink>
          ))}
        </NavItemsWrapper>
        {isLogin ? (
          <ButtonWrapper>
            <Alarm />
            <BaseButton size="size2" variant="outline">
              마이페이지
            </BaseButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <BaseButton
              size="size2"
              variant="outline"
              onClick={handleLoginButtonClick}
            >
              로그인
            </BaseButton>
            <BaseButton size="size2" onClick={() => navigate('/signup')}>
              회원가입
            </BaseButton>
          </ButtonWrapper>
        )}
      </ItemWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);

const HeaderContainer = styled.header`
  position: fixed;
  z-index: 1000;

  width: 100%;

  padding: 0.6rem 1.2rem;

  display: flex;
  justify-content: center;

  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.08),
    inset 0 1px rgba(255, 255, 255, 0.6);
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

const LogoImage = styled.img`
  width: 120px;
  height: 40px;
  object-fit: contain;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    width: 72px;
  }
  @media (max-width: 768px) {
    width: 52px;
  }
`;

const NavItemsWrapper = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 20px;

  text-align: center;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: rgb(var(--color-darkgray));
  padding: 12px 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(var(--color-lightgray) / 70%);
    padding: 12px 8px;
    border-radius: 8px;
  }

  &.active {
    color: rgb(var(--color-primary-dark)) !important;
    font-weight: 600;
  }

  &.active::after {
    transform: scaleX(1);
  }

  &:focus-visible {
    outline: none;
    color: rgb(var(--color-primary));
  }
`;

const ButtonWrapper = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    padding: 8px 12px;
    border-radius: 50px;
  }
`;
