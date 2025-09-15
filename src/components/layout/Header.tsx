import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './header.module.css';

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
    <header>
      <div className="d-flex justify-content-between px-5 py-2">
        <img src="/logo.svg" />
        <div className={`${style.pageLink} gap-5 align-items-center`}>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={`${style.memberLink} align-items-center`}>
          <Link to="/login">로그인</Link>
          <Link to="/signUp">회원가입</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
