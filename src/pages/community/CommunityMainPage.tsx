import styled from 'styled-components';
import SideBar from './components/SideBar';
import BaseInput from '../../components/common/BaseInput';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBoards, getRecentNews } from '../../apis/communityApi';
import { useAuthStore } from '../../stores/auth';
import type { BoardInfo } from '../../types/community';
import BoardList from './components/BoardList';
import NewsBox from './components/NewsBox';
import BaseButton from '../../components/common/BaseButton';

const CommunityMainPage = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const userId = Number(auth.user.userId);

  const handleBoardClick = (postId: number) => {
    navigate(`/board/${postId}`);
  };

  const {
    data: boards = [],
    isPending: isBoardPending,
    isError: isBoardError,
  } = useQuery<BoardInfo[]>({
    queryKey: ['board', userId],
    queryFn: async () => await getBoards(userId).then((res) => res.data),
  });

  const {
    data: news = [],
    isPending: isNewsPending,
    isError: isNewsError,
  } = useQuery({
    queryKey: [''],
    queryFn: async () => await getRecentNews().then((res) => res.data),
  });

  return (
    <Main>
      <h1>커뮤니티 게시판</h1>
      <Container>
        <SideBar />
        <ContentWrapper>
          <Inputwrapper>
            <BaseInput showButton={true} placeholder="검색어를 입력하세요" />
          </Inputwrapper>

          <NewsCard>
            {!isNewsPending && !isNewsError && (
              <>
                <div>
                  <h4>📰 전세 뉴스</h4>
                  <NewsBox news={news} />
                </div>
                <BaseButton>전체보기</BaseButton>
              </>
            )}
          </NewsCard>

          <Section>
            <BoardCard>
              <BoardTitle>
                <h4>💬 자유 게시판</h4>
                <BaseButton>+ 글쓰기</BaseButton>
              </BoardTitle>
              <hr />
              <BoardList
                data={boards}
                isPending={isBoardPending}
                isError={isBoardError}
                goToDetail={handleBoardClick}
              />
            </BoardCard>
          </Section>
        </ContentWrapper>
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

const ContentWrapper = styled.div`
  flex: 1;
  display: grid;
  gap: 12px;
`;

const Inputwrapper = styled.div`
  height: fit-content;
`;

const NewsCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: rgba(var(--color-accent) / 30%);
  padding: 8px;
  border-radius: 8px;

  div {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  h4 {
    font-size: 18px;
  }

  button {
    padding: 0;
    background-color: transparent;
    border-color: transparent;
    color: rgba(var(--color-darkgray));
    font-size: 14px;
  }
`;

const Section = styled.section`
  flex: 1;
`;

const BoardCard = styled.div`
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 8px;

  hr {
    border-top: none;
    color: rgba(var(--color-lightgray));
  }
`;

const BoardTitle = styled.div`
  display: flex;
  justify-content: space-between;

  h4 {
    font-size: 18px;
  }
  button {
    padding: 4px 8px;
    font-size: 14px;
  }
`;
