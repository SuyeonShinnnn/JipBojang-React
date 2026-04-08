import styled from 'styled-components';
import BaseInput from '../../components/common/BaseInput';
import BaseButton from '../../components/common/BaseButton';

const InfoInputPage = () => {
  return (
    <>
      <Main>
        <Section>
          <form>
            <h3>본인 인증</h3>

            <BaseInput
              label="이메일"
              placeholder="이메일 입력"
              showButton={true}
              buttonContent={'인증하기'}
            />

            <BaseInput
              placeholder="인증번호 입력"
              label="인증번호"
              showButton={true}
              buttonContent={'확인'}
            />
          </form>
          <form>
            <h3>회원 정보</h3>
            <BaseInput placeholder="이름 입력" label="이름" />

            <BaseInput placeholder="닉네임 입력" label="닉네임" />

            <BaseInput placeholder="아이디 입력" label="아이디" />

            <BaseInput
              type="password"
              placeholder="비밀번호 입력"
              label="비밀번호"
            />

            <BaseInput
              type="password"
              placeholder="비밀번호 입력"
              label="비밀번호 확인"
            />
          </form>
        </Section>
      </Main>
    </>
  );
};

export default InfoInputPage;

const Main = styled.main`
  background-color: rgba(var(--color-accent) / 20%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  display: grid;
  gap: 3rem;

  background-color: #fff;
  max-width: 520px;
  min-width: 296px;
  width: 80%;
  padding: 2rem;
  margin-top: 3rem;
  border-radius: 12px;
  box-shadow: 4px 4px 20px rgb(var(--color-lightgray));

  form {
    display: grid;
    gap: 12px;
  }
`;

const InputButtonWrapper = styled.div`
  display: flex;
`;
