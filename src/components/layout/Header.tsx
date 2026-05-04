import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "../../stores/auth";
import BaseButton from "../common/BaseButton";
import { BsBell } from "react-icons/bs";
import { useNotificationStore } from "../../stores/notiStore";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  type NavItems = {
    name: string;
    path: string;
  };

  const [navItems] = useState<NavItems[]>([
    { name: "건물 정보", path: "/building" },
    { name: "집보장 리포트", path: "/report" },
    { name: "등기변동알림", path: "/notify" },
    { name: "전문가 상담", path: "/consult" },
    { name: "커뮤니티", path: "/community" },
  ]);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const [isAlarmCicked, setIsAlarmClicked] = useState(false);
  const alarmRef = useRef<HTMLDivElement>(null);
  const notifications = useNotificationStore((state) => state.notifications);

  const handleAlarmItemClick = (id: number) => [
    navigate("/notify", { state: { targetPropertyId: id } }),
    setIsAlarmClicked(false),
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (alarmRef.current && !alarmRef.current.contains(e.target as Node)) {
        setIsAlarmClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <ItemWrapper>
        <LogoImage src="/logo.svg" onClick={handleLogoClick} />
        <NavItemsWrapper>
          {navItems.map((item, index) => (
            <StyledNavLink key={index} to={item.path}>
              {item.name}
            </StyledNavLink>
          ))}
        </NavItemsWrapper>
        {isLogin ? (
          <ButtonWrapper>
            <AlarmWrapper ref={alarmRef}>
              <BsBell
                onClick={() => {
                  setIsAlarmClicked(!isAlarmCicked);
                  console.log(notifications);
                }}
              />
              <AlarmBox $open={isAlarmCicked}>
                {notifications.length === 0 ? (
                  <p>알람이 없습니다</p>
                ) : (
                  <AlarmList>
                    <h5>{notifications.length}건의 알림</h5>
                    {notifications.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleAlarmItemClick(item.id)}
                      >
                        🚨
                        <strong>{item.title}</strong>에서
                        <strong> {item.purpose}</strong>이 발생했어요
                      </li>
                    ))}
                  </AlarmList>
                )}
              </AlarmBox>
            </AlarmWrapper>
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
            <BaseButton size="size2" onClick={() => navigate("/signup")}>
              회원가입
            </BaseButton>
          </ButtonWrapper>
        )}
      </ItemWrapper>
    </HeaderContainer>
  );
};

export default Header;

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
  width: 80px;

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
  display: flex;
  gap: 2rem;
  font-size: 18px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: rgb(var(--color-darkgray));
  transition: all 0.2s ease;

  &:hover {
    color: rgba(var(--color-primary-dark));
    font-weight: 600;
    transform: translateY(-1px);
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

const AlarmWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.5rem;

  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;

const AlarmBox = styled.div<{ $open: boolean }>`
  background-color: #fff;
  max-width: 420px;
  min-width: 320px;
  min-height: 120px;
  border-radius: 12px;
  box-shadow: 4px 4px 20px rgb(var(--color-lightgray));
  font-size: 16px;

  position: absolute;
  top: 80%;
  right: 10%;
  z-index: 1200;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-12px)")};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};

  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0.25s ease;
`;

const AlarmList = styled.ul`
  color: rgb(var(--color-darkgray));
  h5 {
    padding: 12px 0 8px 8px;
    font-size: 16px;
    font-weight: 500;
  }
  li {
    padding: 12px 8px 12px 8px;
    &:hover {
      cursor: pointer;
      background-color: rgb(var(--color-lightgray) / 30%);
    }
  }
`;
