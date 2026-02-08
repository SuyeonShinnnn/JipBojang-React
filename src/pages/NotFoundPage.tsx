import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <Container style={{ padding: '4rem', textAlign: 'center' }}>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  padding: 4rem;
  text-align: center;

  a {
    color: var(--color-primary) !important;
    text-decoration: underline !important;
  }
`;
