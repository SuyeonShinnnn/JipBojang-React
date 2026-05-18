import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseInput from '../../components/common/BaseInput';
import { useNavigate } from 'react-router-dom';
import { useTyping } from '../../hooks/useTyping';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Main } from '../../style/common';

const HomePage: React.FC = () => {
  const fullText = '주소를 입력하고 적정보증금과 건축물대장을 확인해 보세요!';

  const displayText = useTyping({
    text: fullText,
    typeSpeed: 80,
    pauseAfterType: 2000,
    pauseAfterDelete: 600,
  });

  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
    });
  }, []);

  const handleAddressSearchButton = () => {
    navigate('/building', { state: { address } });
  };

  return (
    <>
      <Container>
        <HeroSection>
          <HeroContent data-aos="fade-up">
            <h1>부동산 계약, 데이터로 더 안전하게</h1>

            <h2>
              안전한 부동산 거래를 위한 전세 사기 위험도 진단 서비스 집보장
            </h2>
          </HeroContent>
        </HeroSection>

        <FeatureSection>
          <FeatureContent>
            <FeatureText data-aos="fade-up">
              <h3>집보장 리포트 '집포트'</h3>

              <p>
                등기부등본 분석을 통한 전세사기 위험도를 평가하여 안전한 부동산
                거래를 돕습니다
              </p>
            </FeatureText>

            <FeatureCard data-aos="zoom-in" data-aos-duration="1200">
              <PreviewVideo autoPlay muted loop playsInline>
                <source src="/video/report-preview.mp4" type="video/mp4" />
              </PreviewVideo>
            </FeatureCard>
          </FeatureContent>
        </FeatureSection>

        <FeatureSection>
          <FeatureContent>
            <FeatureText data-aos="fade-right">
              <h3>모르는 용어는 챗봇에게 물어보세요</h3>

              <p>
                복잡한 부동산 정보를 누구나 이해할 수 있도록 쉽고 빠르게
                안내해드립니다.
              </p>
            </FeatureText>

            <FeatureCard data-aos="zoom-in" data-aos-duration="1200">
              <PreviewVideo autoPlay muted loop playsInline>
                <source src="/video/report-preview.mp4" type="video/mp4" />
              </PreviewVideo>
            </FeatureCard>
          </FeatureContent>
        </FeatureSection>

        <FeatureSection>
          <FeatureContent>
            <FeatureCard data-aos="fade-right" data-aos-duration="1200">
              <PreviewVideo autoPlay muted loop playsInline>
                <source src="/video/report-preview.mp4" type="video/mp4" />
              </PreviewVideo>
            </FeatureCard>

            <FeatureText data-aos="fade-left">
              <TypingText>{displayText}</TypingText>

              <BaseInput
                placeholder="주소를 입력하세요"
                showButton={true}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onButtonClick={handleAddressSearchButton}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddressSearchButton();
                  }
                }}
              />
            </FeatureText>
          </FeatureContent>
        </FeatureSection>

        <FeatureSection>
          <FeatureContent>
            <FeatureText data-aos="fade-up">
              <h3>등기변동 알림으로 계약 이후까지 안전하게</h3>
            </FeatureText>
          </FeatureContent>
        </FeatureSection>

        <FeatureSection>
          <FeatureContent>
            <FeatureText data-aos="fade-up">
              <h3>
                혼자 해결하기 어려운 부동산 고민 <br /> 전문가와 함께
              </h3>

              <p>
                복잡한 부동산 계약과 권리관계, 전문가 상담으로 더 안전하게
                해결하세요.
              </p>
            </FeatureText>
          </FeatureContent>
        </FeatureSection>

        <FeatureSection>
          <FeatureContent>
            <FeatureText data-aos="fade-up">
              <h3>커뮤니티를 통해 정보를 나눠보세요</h3>

              <p>
                실제 사용자들의 경험과 정보를 공유하며 더 안전한 부동산 거래를
                준비할 수 있습니다.
              </p>
            </FeatureText>
          </FeatureContent>
        </FeatureSection>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled(Main)`
  background:
    radial-gradient(
      1400px 1200px at 50% 70%,
      rgba(169, 76, 255, 0.18),
      rgba(169, 76, 255, 0.08) 35%,
      rgba(169, 76, 255, 0.03) 55%,
      transparent 75%
    ),
    #fff;

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  max-width: 900px;

  padding: 0 24px;

  h1 {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.1;
  }

  h2 {
    font-size: 24px;
    color: rgba(var(--color-darkgray));
    font-weight: 500;
  }
`;

const FeatureSection = styled.section`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 140px 24px;
`;

const FeatureContent = styled.div`
  width: 100%;
  max-width: 1280px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  gap: 6rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.5rem;

  h3 {
    font-size: 36px;
    font-weight: 800;

    line-height: 1.15;
    letter-spacing: -2px;
  }

  p {
    font-size: 20px;
    line-height: 1.8;

    color: rgba(var(--color-darkgray));
  }

  input {
    border-radius: 50px;
  }

  button {
    background-color: transparent;
  }
`;

const TypingText = styled.p`
  height: 20px;
  color: #333 !important;
  font-weight: 600;
  margin-left: 12px;
`;

const FeatureCard = styled.div`
  position: relative;

  height: 560px;

  border-radius: 36px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.72);

  backdrop-filter: blur(24px);

  border: 1px solid rgba(255, 255, 255, 0.8);

  box-shadow:
    0 20px 60px rgba(15, 23, 42, 0.08),
    inset 0 1px rgba(255, 255, 255, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewVideo = styled.video`
  width: 92%;

  border-radius: 24px;

  object-fit: cover;

  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
`;
