import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropertyCard from './components/PropertyCard';
import { getRegistedPropertyInfo } from '../../apis/notiApi';
import WarningCardSection from './components/WarningCardSection';

const NotiPage: React.FC = () => {
  const [propertyInfo, setPropertyInfo] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRegistedPropertyInfo(1);
      setPropertyInfo(data.regist_list);
    };
    fetchData();
  }, []);

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
              registName={item?.regist_name}
              address={item?.address}
              isEmpty={!item}
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

  @media (max-width: 1024px) {
    gap: 8px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export default NotiPage;
