import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../stores/auth';
import BaseInput from '../../components/common/BaseInput';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const disableSubmit = !(userid && password);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await auth.login({ id: userid, password });
      navigate('/');
    } catch (err: any) {
      setError(err?.message || '로그인에 실패했습니다.');
    }
  };

  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#f9f9f9';

    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  return (
    <Container>
      <Title>로그인</Title>

      <Form onSubmit={login}>
        <Label htmlFor="userId">아이디</Label>
        <BaseInput
          id="userId"
          type="text"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />

        <Label htmlFor="password">비밀번호</Label>
        <BaseInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <JoinLink>
          <Link to="/users/join">아이디 찾기</Link>
          <Link to="/users/join" className="divider">
            비밀번호 찾기
          </Link>
          <Link to="/users/join">회원가입</Link>
        </JoinLink>

        {error && <ErrorText>{error}</ErrorText>}

        <SubmitButton type="submit" disabled={disableSubmit}>
          로그인
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  margin: 5rem auto;
  padding: 2rem;
  width: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 3rem;
  font-size: 1.8rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-darkgray);
`;

const JoinLink = styled.div`
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-darkgray);
`;

const ErrorText = styled.div`
  color: #e53935;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  padding: 0.7rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) =>
    disabled ? '#ccc' : 'var(--color-primary)'};
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
