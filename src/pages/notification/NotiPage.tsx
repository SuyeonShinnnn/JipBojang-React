import React from 'react';
import styled from 'styled-components';
import PropertyCard from './components/PropertyCard';

const NotiPage: React.FC = () => {
  return (
    <Container>
      <h1>등기변동 알림 서비스</h1>
      <SubTitle>알림 설정된 부동산</SubTitle>
      <PropertyCardWrapper>
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </PropertyCardWrapper>
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

const PropertyCardWrapper = styled.div`
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
