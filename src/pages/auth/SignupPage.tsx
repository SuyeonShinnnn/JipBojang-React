import styled from 'styled-components';
import BaseButton from '../../components/common/BaseButton';

const SignupPage = () => {
  return (
    <>
      <Main>
        <section>
          <h2>회원가입 유형</h2>
          <p>어떤 유형의 회원으로 가입하시겠습니까?</p>
          <div>
            <BaseButton>일반 사용자</BaseButton>
            <BaseButton>부동산 전문가</BaseButton>
          </div>
        </section>
      </Main>
    </>
  );
};

export default SignupPage;

const Main = styled.main`
  background-color: rgba(var(--color-accent), 0.5);
  height: 85vh;
`;
