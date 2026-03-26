import React from 'react';
import styled from 'styled-components';
import reportBg from '../../assets/report/report-bg.png';
import BaseButton from '../../components/common/BaseButton';

const ReportPage: React.FC = () => {
  return (
    <main>
      <MainSection>
        <h1>집포트</h1>
        <p>복잡한 부동산 서류를 쉽고 명확하게 분석해드립니다.</p>
        <BaseButton>집포트 생성하기</BaseButton>
      </MainSection>
    </main>
  );
};

export default ReportPage;

const MainSection = styled.section`
  position: relative;
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url(${reportBg}) repeat center center;
    opacity: 0.3;
    z-index: 0;
  }

  * {
    position: relative;
    z-index: 1;
  }

  button {
    width: 15%;
    margin-top: 20px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
    }
  }
`;
