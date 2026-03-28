import React from 'react';
import styled from 'styled-components';
import reportBg from '../../assets/report/report-bg.png';
import BaseButton from '../../components/common/BaseButton';
import docIcon from '../../assets/report/ic-report-doc.png';
import fastIcon from '../../assets/report/ic-report-fast.png';
import fraudIcon from '../../assets/report/ic-report-fraud.png';
import priceIcon from '../../assets/report/ic-report-price.png';
import { useNavigate } from 'react-router-dom';

const ReportPage: React.FC = () => {
  const items = [
    {
      icon: docIcon,
      title: '등기부등본 분석',
      sub: '근저당, 순위권 등 핵심 정보 요약',
    },
    {
      icon: docIcon,
      title: '권리 분석',
      sub: '건물 구조, 용도 및 층별 정보 제공',
    },
    {
      icon: priceIcon,
      title: '실거래가 분석',
      sub: '전세·매매 가격 적정성 판단',
    },
    {
      icon: fraudIcon,
      title: '전세 사기 분석',
      sub: '위험요소 예측 및 사전 예방',
    },
    {
      icon: fastIcon,
      title: '빠른 리포트 생성',
      sub: '1분 안에 리포트 완성',
    },
  ];

  const navigator = useNavigate();

  return (
    <main>
      <MainSection>
        <h1>집포트</h1>
        <p>복잡한 부동산 서류를 쉽고 명확하게 분석해드립니다.</p>
        <BaseButton onClick={() => navigator('/report/form')}>
          집포트 생성하기
        </BaseButton>
      </MainSection>
      <ExplanationSection>
        <h2>집포트 서비스</h2>
        <p>정확하고 직관적인 맞춤형 분석 서비스</p>
        <ExplanationUL>
          {items.map((item) => (
            <li>
              <img src={item.icon} alt="icon" />
              <h4>{item.title}</h4>
              <small>{item.sub}</small>
            </li>
          ))}
        </ExplanationUL>
      </ExplanationSection>
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

const ExplanationSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 2rem;
`;

const ExplanationUL = styled.ul`
  margin-top: 20px;
  display: flex;
  gap: 1rem;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    width: 220px;
    padding: 12px;
    border: 1px solid var(--color-lightgray);
    border-radius: 12px;
  }

  img {
    width: 60px;
    margin-bottom: 8px;
  }

  small {
    color: var(--color-darkgray);
  }
`;
