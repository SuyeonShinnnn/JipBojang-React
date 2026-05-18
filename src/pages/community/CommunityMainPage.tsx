import styled from 'styled-components';
import SideBar from './components/SideBar';
import BaseInput from '../../components/common/BaseInput';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBoards } from '../../apis/communityApi';
import { useAuthStore } from '../../stores/auth';
import type { BoardInfo } from '../../types/community';
import BoardList from './components/BoardList';

const CommunityMainPage = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const userId = Number(auth.user.userId);

  const handleBoardClick = () => {
    navigate('/board');
  };

  const {
    data = [],
    isPending,
    isError,
  } = useQuery<BoardInfo[]>({
    queryKey: ['board', userId],
    queryFn: async () => await getBoards(userId).then((res) => res.data),
  });

  return (
    <Main>
      <h1>커뮤니티 게시판</h1>
      <Container>
        <SideBar />
        <Section>
          <BaseInput showButton={true} placeholder="검색어를 입력하세요" />
          <BoardList
            data={data}
            isPending={isPending}
            isError={isError}
            goToDetail={handleBoardClick}
          />
        </Section>
      </Container>
    </Main>
  );
};

export default CommunityMainPage;

const Main = styled.main`
  padding: 4.5rem 5rem 5rem;
`;

const Container = styled.div`
  display: flex;
  gap: 40px;

  margin-top: 20px;
`;

const Section = styled.section`
  flex: 1;

  ul {
    margin-top: 20px;
  }
`;
