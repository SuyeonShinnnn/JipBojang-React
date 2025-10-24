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
        <UserNavItemsWrapper>
          <Link to="/login">로그인</Link>
          <Link to="/signUp">회원가입</Link>
        </UserNavItemsWrapper>
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
`;

const NavItemsWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-size: 20px;
`;

const UserNavItemsWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 16px;
`;

export default Header;
