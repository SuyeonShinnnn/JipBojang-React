import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropertyCard from './components/PropertyCard';
import { getRegistedPropertyInfo } from '../../apis/notiApi';
import WarningCardSection from './components/WarningCardSection';
import type { PropertyDetail } from '../../types/notification';
import { useAuthStore } from '../../stores/auth';
import { useLocation } from 'react-router-dom';

const NotiPage: React.FC = () => {
  const location = useLocation();
  const targetId = location.state?.targetPropertyId;
  const userId = useAuthStore((state) => state.user.userId);
  const [propertyInfo, setPropertyInfo] = useState<PropertyDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      const data = await getRegistedPropertyInfo(Number(userId));
      setPropertyInfo(data);
    };
    fetchData();
  }, [userId]);

  const totalCards = 3;

  return (
    <Container>
      <h1>등기변동 알림 서비스</h1>
      <SubTitle>알림 설정된 부동산</SubTitle>
      <PropertyCardWrapper>
        {Array.from({ length: totalCards }).map((_, idx) => {
          const item = propertyInfo[idx];

          return (
            <PropertyCard
              key={idx}
              propertyInfo={item}
              isEmpty={!item}
              autoOpenDetailModal={!!item && item.id === targetId}
            />
          );
        })}
      </PropertyCardWrapper>
      <WarningCardSection />
    </Container>
  );
};

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
  height: 156px;

  @media (max-width: 1024px) {
    gap: 8px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    height: auto;
  }
`;

export default NotiPage;
