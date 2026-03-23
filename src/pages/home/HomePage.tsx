import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BaseInput from '../../components/common/BaseInput';
import { useNavigate } from 'react-router-dom';
import BaseModal from '../../components/common/BaseModal';

const HomePage: React.FC = () => {
  const fullText = '지금 바로 적정보증금과 건축물대장을 확인해 보세요!';

  const [displayText, setDisplayText] = useState('');

  const iRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TYPE_SPEED = 80;
  const PAUSE_AFTER_TYPE = 2000;
  const PAUSE_AFTER_DELETE = 600;

  useEffect(() => {
    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;

      if (!deletingRef.current) {
        if (iRef.current < fullText.length) {
          iRef.current++;
          setDisplayText(fullText.slice(0, iRef.current));
          timerRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          deletingRef.current = true;
          timerRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);
        }
      } else {
        setDisplayText('');
        iRef.current = 0;
        deletingRef.current = false;
        timerRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
      }
    };

    tick();

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [address, setAddress] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const handleAddressSearchButton = () => {
    if (address.trim() == '') {
      setIsAlertOpen(true);
      inputRef.current?.focus();
      return;
    }
    navigate('/building', { state: { address } });
  };

  return (
    <>
      <Main>
        <TextWrapper>
          <h1>
            안전한 부동산 거래를 위한 <br />
            <span>전세 안전 진단 서비스</span>
          </h1>

          <p>
            등기부등본 분석부터 위험도 평가까지, <strong>집보장 리포트</strong>
            로 전세 사기를 미리 예방하세요. <br />
            전문가 상담과 등기변동 알림으로 안전한 임대차 계약을 보장합니다.
          </p>
          <InputWrapper>
            <p>{displayText}</p>
            <BaseInput
              ref={inputRef}
              placeholder="주소를 입력하세요"
              showButton={true}
              buttonIconColor="var(--color-mediumgray)"
              onChange={(e) => setAddress(e.target.value)}
              onButtonClick={() => handleAddressSearchButton()}
            />
          </InputWrapper>
        </TextWrapper>

        <ImageWrapper>
          <img
            src="../../public/character-logo.png"
            alt="jipbojang-character-logo"
          />
        </ImageWrapper>
      </Main>
      {isAlertOpen && (
        <BaseModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(!isAlertOpen)}
          header={<h3>🚨Warning</h3>}
        >
          <ModalBody>검색어를 입력해 주세요.</ModalBody>
        </BaseModal>
      )}
    </>
  );
};

export default HomePage;

const Main = styled.main`
  background:
    radial-gradient(
      1200px 600px at 20% -10%,
      rgba(169, 76, 255, 0.12),
      transparent 60%
    ),
    radial-gradient(
      900px 500px at 90% 0%,
      rgba(74, 144, 226, 0.1),
      transparent 55%
    ),
    #fff;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  gap: 5rem;
  height: 80vh;

  p {
    font-size: 20px;
    color: var(--color-darkgray);
  }

  span,
  strong {
    background: linear-gradient(90deg, #614ae2, #a94cff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const TextWrapper = styled.div`
  display: grid;
  gap: 1.5rem;
  h1 {
    font-size: 56px;
  }
`;

const InputWrapper = styled.div`
  p {
    color: #000;
    font-weight: 700;
    min-height: 24px;
    margin-top: 1rem;
    margin-bottom: 8px;
    text-align: start;
  }

  input {
    font-size: 18px;
    border-radius: 50px;
    --grad2: #a94cff;
    --bg: rgba(255, 255, 255, 0.7);
    --bd: rgba(148, 163, 184, 0.25);
    box-shadow: 0 8px 24px rgba(31, 41, 55, 0.08);

    &:focus {
      border-color: transparent;
      background:
        linear-gradient(#fff, #fff) padding-box,
        linear-gradient(90deg, var(--grad1), var(--grad2)) border-box !important;
      box-shadow: 0 6px 20px rgba(169, 76, 255, 0.3) !important;
    }
  }

  button {
    background-color: transparent;
  }
`;

const ImageWrapper = styled.div`
  img {
    width: 380px;
  }
`;

const ModalBody = styled.p`
  font-size: 20px;
`;
