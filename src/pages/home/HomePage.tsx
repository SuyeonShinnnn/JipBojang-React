import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Main } from '../../style/common';
import reportBanner from '../../assets/home/report-banner.png';
import { useAuthStore } from '../../stores/auth';
import alterImage from '../../assets/consult/basic-profile.png';
import BaseButton from '../../components/common/BaseButton';
import PropertyTips from './components/PropertyTips';

const HomePage: React.FC = () => {
  const auth = useAuthStore();

  const navigate = useNavigate();

  return (
    <Main>
      <Container>
        <TopSection>
          <BannerSection>
            <img src={reportBanner} alt="집포트 배너" />
          </BannerSection>

          <UserCard>
            {auth ? (
              <>
                <div>
                  <ProfileImage src={alterImage} />
                </div>

                <UserName>{auth.user?.nickname}님</UserName>
                <small>{auth.user?.email}</small>
                <UserLink>
                  <Link to="">리포트</Link>
                  <Link to="">상담 내역</Link>
                  <Link to="">마이페이지</Link>
                </UserLink>
                <MenuButton onClick={() => navigate('/mypage')}>
                  로그아웃
                </MenuButton>
              </>
            ) : (
              <>
                <ProfileImage>🏠</ProfileImage>

                <UserName>집포트를 시작해보세요</UserName>

                <Description>
                  로그인 후 리포트 발행과 등기변동 알림 서비스를 이용할 수
                  있습니다.
                </Description>

                <MenuButton onClick={() => navigate('/login')}>
                  로그인
                </MenuButton>
              </>
            )}
          </UserCard>
        </TopSection>
        <PropertyTips />
      </Container>
    </Main>
  );
};

export default HomePage;

const Container = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
`;

const TopSection = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const BannerSection = styled.section`
  img {
    width: 100%;
    height: 360px;
    object-fit: cover;

    border-radius: 24px;
  }
`;

const UserCard = styled.div`
  background: white;

  border: 1px solid rgba(var(--color-lightgray));
  border-radius: 16px;

  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
`;

const ProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50px;
`;

const UserName = styled.h3`
  font-size: 20px;
  font-weight: 700;
`;

const UserLink = styled.div`
  width: 80%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  text-align: center;

  a {
    position: relative;
    color: inherit;
    text-decoration: none;

    &:not(:last-child)::after {
      content: '';

      position: absolute;
      top: 50%;
      right: 0;

      transform: translateY(-50%);

      width: 1px;
      height: 16px;

      background-color: rgba(var(--color-lightgray));
    }
  }
`;

const Description = styled.p`
  text-align: center;
  color: rgba(var(--color-darkgray));
  line-height: 1.6;
`;

const MenuButton = styled(BaseButton)`
  width: 100%;
  padding: 14px;
`;
