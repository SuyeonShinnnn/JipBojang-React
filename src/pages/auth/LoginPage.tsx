import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../stores/auth';
import BaseInput from '../../components/common/BaseInput';
import BaseButton from '../../components/common/BaseButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showFindPassword, setShowFindPassword] = useState(false);
  const [showFindId, setShowFindId] = useState(false);

  const disableSubmit = useMemo(
    () => !(userid && password),
    [userid, password],
  );

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login({ id: userid, password });
      navigate('/');
    } catch (e: any) {
      setError(e.message || '로그인에 실패했습니다.');
    }
  };

  // const kakaoLogin = () => {
  //   const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  //   const clientId = '';

  //   const authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&prompt=login`;
  //   window.location.href = authUrl;
  // };

  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#f4f5ff';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  return (
    <Container>
      <Card>
        <Title>로그인</Title>

        <Form onSubmit={login}>
          <Field>
            <Label htmlFor="userid">아이디</Label>
            <BaseInput
              id="userid"
              type="text"
              placeholder="아이디를 입력하세요"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              error={error}
            />
          </Field>

          <Field>
            <Label htmlFor="password">비밀번호</Label>
            <BaseInput
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />
          </Field>

          <BaseButton type="submit" disabled={disableSubmit}>
            로그인
          </BaseButton>

          {error && <ErrorText>{error}</ErrorText>}

          <LinkGroup>
            <TextButton onClick={() => setShowFindId(true)}>
              아이디 찾기
            </TextButton>
            <Divider>|</Divider>
            <TextButton onClick={() => setShowFindPassword(true)}>
              비밀번호 찾기
            </TextButton>
            <Divider>|</Divider>
            <Link to="/users/selectuser">회원가입</Link>
          </LinkGroup>

          {/* {showFindPassword && (
            <FindPasswordView onClose={() => setShowFindPassword(false)} />
          )}
          {showFindId && <FindIdView onClose={() => setShowFindId(false)} />} */}

          <Separator>
            <hr />
            <span>또는</span>
            <hr />
          </Separator>

          {/* <KakaoButton
            // src={kakaoLoginImage}
            alt="카카오 로그인"
            onClick={kakaoLogin}
          /> */}
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #fff;
  padding: 2.5rem;
  border-radius: 1.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 2.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  /* margin-bottom: 1.2rem; */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
`;

const ErrorText = styled.div`
  margin-top: 0.8rem;
  color: #e53935;
  font-size: 0.85rem;
`;

const LinkGroup = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 0.85rem;

  a {
    color: #6c757d;
    text-decoration: none;

    &:hover {
      color: #6a5bff;
    }
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  color: #6c757d;
  cursor: pointer;

  &:hover {
    color: #6a5bff;
  }
`;

const Divider = styled.span`
  color: #bbb;
`;

const Separator = styled.div`
  position: relative;
  margin: 1.8rem 0 1.5rem;
  text-align: center;

  hr {
    border: none;
    border-top: 1px solid #ddd;
  }

  span {
    position: absolute;
    top: -0.7rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 8px;
    background: #fff;
    font-size: 0.85rem;
    color: #777;
  }
`;

const KakaoButton = styled.img`
  margin: 0 auto;
  display: block;
  height: 45px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;
