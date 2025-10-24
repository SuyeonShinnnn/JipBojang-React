import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header: React.FC = () => {
  type NavItems = {
    name: string;
    path: string;
  };

  const [navItems] = useState<NavItems[]>([
    { name: '건물 정보', path: '/building' },
    { name: '집보장 리포트', path: '/report' },
    { name: '등기변동알림', path: '/notify' },
    { name: '전문가 상담', path: '/consult' },
    { name: '커뮤니티', path: '/community' },
  ]);

  return (
    <HeaderContainer>
      <ItemWrapper>
        <LogoImage src="/logo.svg" />
        <NavItemsWrapper>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              {item.name}
            </Link>
          ))}
        </NavItemsWrapper>
        <LoginBtn>로그인</LoginBtn>
      </ItemWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: white;
  width: 100%;
  padding: 0.5rem 0;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

const LogoImage = styled.img`
  width: 80px;
  @media (max-width: 1024px) {
    width: 72px;
  }
  @media (max-width: 768px) {
    width: 52px;
  }
`;

const NavItemsWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-size: 20px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LoginBtn = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: 0px solid transparent;
  font-size: 0.9rem;
  border-radius: 5rem;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default Header;
