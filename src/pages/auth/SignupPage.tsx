import styled, { keyframes } from 'styled-components';
import BaseButton from '../../components/common/BaseButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [, setUserType] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleTypeButton = (type: string) => {
    setUserType(type);

    navigate('/signup/info');
  };

  return (
    <>
      <Container>
        <TypeSelectSection>
          <h2>회원가입 유형</h2>
          <p>어떤 유형의 회원으로 가입하시겠습니까?</p>
          <ButtonWrapper>
            <BaseButton
              variant="secondary"
              onClick={() => handleTypeButton('USER')}
            >
              일반 사용자
            </BaseButton>
            <BaseButton onClick={() => handleTypeButton('AGENT')}>
              부동산 전문가
            </BaseButton>
          </ButtonWrapper>
        </TypeSelectSection>
      </Container>
    </>
  );
};

export default SignupPage;

const floating = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  background-color: rgba(var(--color-accent) / 20%);
  height: 89vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TypeSelectSection = styled.section`
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  display: grid;
  gap: 20px;
  box-shadow: 4px 20px 20px rgb(var(--color-lightgray));
  animation: ${floating} 3s ease-in-out infinite;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  margin-top: 12px;

  button {
    transition: transform 0.3s ease;
    &:hover {
      transform: translateY(-2px);
    }
  }
`;
