import React from 'react';
import styled from 'styled-components';

const WarningCardSection: React.FC = () => {
  return (
    <Container>
      <Card>
        <Icon src="src/assets/notification/doc-icon.png" />
        <TextBox>
          <WarningTitle>등록한도</WarningTitle>
          <WarningText>
            알림 등록은 최대 <strong>3건</strong>까지 가능합니다.
          </WarningText>
        </TextBox>
      </Card>

      <Card>
        <Icon src="src/assets/notification/siren-icon.png" />
        <TextBox>
          <WarningTitle>주의사항</WarningTitle>
          <WarningText>
            <strong>소유권 이전, 가압류/압류/가처분</strong> 등의 변동 발생시
            집주인이나 중개부동산을 통해 꼭 확인하시길 바랍니다.
          </WarningText>
        </TextBox>
      </Card>

      <Card>
        <Icon src="src/assets/notification/alert-icon.png" />
        <TextBox>
          <WarningTitle>실시간 알림</WarningTitle>
          <WarningText>
            등기 변동 발생 시 <strong>당일 또는 다음날</strong> 알림을 받을 수
            있습니다.
          </WarningText>
        </TextBox>
      </Card>

      <Card>
        <Icon src="src/assets/notification/magnifying-glass-icon.png" />
        <TextBox>
          <WarningTitle>상세확인</WarningTitle>
          <WarningText>
            자세한 등기 변동 내역은 <strong>부동산등기 직접 열람</strong>을 통해
            확인하세요
          </WarningText>
        </TextBox>
      </Card>
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
`;

const Card = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgb(var(--color-lightgray));
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    border: none;
    flex-direction: row;
    text-align: left;
    justify-content: start;
    gap: 1rem;
  }
`;

const Icon = styled.img`
  width: 44px;

  @media (max-width: 768px) {
    width: 36px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const WarningTitle = styled.span`
  font-weight: bold;
  display: block;
  margin: 16px 0 4px 0;

  @media (max-width: 768px) {
    margin: 0 0 4px 0;
  }
`;

const WarningText = styled.span`
  color: rgb(var(--color-darkgray));
`;

export default React.memo(WarningCardSection);
