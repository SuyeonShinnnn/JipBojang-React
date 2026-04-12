import React from 'react';
import styled from 'styled-components';
import PropertyCard from './components/PropertyCard';
import { getRegistedPropertyDetail } from '../../apis/notiApi';
import WarningCardSection from './components/WarningCardSection';
import { useAuthStore } from '../../stores/auth';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import errorIcon from '../../assets/character/Character-Empty.png';
import BaseButton from '../../components/common/BaseButton';
import { RxReload } from 'react-icons/rx';

const NotiPage: React.FC = () => {
  const location = useLocation();
  const targetId = location.state?.targetPropertyId;
  const userId = useAuthStore((state) => state.user.userId);

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['propertyInfo', userId],
    queryFn: () => getRegistedPropertyDetail(Number(userId)),
    enabled: !!userId,
    retry: false,
  });

  const totalCards = 3;

  return (
    <Container>
      <h1>등기변동 알림 서비스</h1>
      <SubTitle>알림 설정된 부동산</SubTitle>
      <PropertyCardWrapper>
        {isError ? (
          <PropertyErrorCard>
            <img src={errorIcon} />
            <h3>부동산 정보를 불러오는 데 실패했어요</h3>
            <p>네트워크 상태를 확인해 주세요</p>
            <BaseButton onClick={() => refetch()}>
              <RxReload />
              재시도
            </BaseButton>
          </PropertyErrorCard>
        ) : (
          Array.from({ length: totalCards }).map((_, idx) => {
            const item = data?.[idx];

            return (
              <PropertyCard
                key={idx}
                propertyInfo={item}
                isEmpty={!item}
                isPending={isPending}
                autoOpenDetailModal={!!item && item.id === targetId}
              />
            );
          })
        )}
      </PropertyCardWrapper>
      <WarningCardSection />
    </Container>
  );
};

export default NotiPage;

const Container = styled.div`
  padding: 2rem 8rem;

  @media (max-width: 1024px) {
    padding: 2rem;
  }
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const SubTitle = styled.span`
  display: block;
  font-size: 24px;
  margin-top: 20px;
  font-weight: 600;
`;

const PropertyCardWrapper = styled.section`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  min-height: 156px;

  @media (max-width: 1024px) {
    gap: 8px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    height: auto;
  }
`;

const PropertyErrorCard = styled.section`
  width: 100%;
  padding: 2rem;
  border: 1px solid rgb(var(--color-lightgray));
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  img {
    width: 120px;
  }

  h3,
  p {
    color: rgb(var(--color-darkgray));
  }

  button {
    margin-top: 8px;
    padding: 8px 14px;
    border-radius: 50px;
    font-size: 14px;
    transition: all 0.2s ease;

    display: flex;
    gap: 0.5rem;

    &:hover {
      transform: scale(1.03);
    }
  }
`;
