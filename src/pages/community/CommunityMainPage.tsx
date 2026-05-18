import styled from 'styled-components';
import SideBar from './components/SideBar';
import BaseInput from '../../components/common/BaseInput';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBoards } from '../../apis/communityApi';
import { useAuthStore } from '../../stores/auth';
import type { BoardInfo } from '../../types/community';
import alterImage from '../../assets/consult/basic-profile.png';
import { formatDate } from '../../utils/format';
import ErrorState from '../../components/common/ErrorState';

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
          <ul>
            {isPending && <>pending...</>}
            {isError && <ErrorState />}
            {!isPending &&
              !isError &&
              data.map((item) => (
                <>
                  <Board key={item.postId} onClick={() => handleBoardClick()}>
                    <BoardMain>
                      <Profile>
                        <img
                          src={item.profileImage}
                          onError={(e) => {
                            const target = e.currentTarget;

                            target.src = `${alterImage}`;
                            target.onerror = null;
                          }}
                        />
                        <span>{item.writerNickname}</span>
                      </Profile>
                      <ContentWrapper>
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                      </ContentWrapper>
                    </BoardMain>

                    <small>{formatDate(item.createdAt)}</small>
                  </Board>
                </>
              ))}
          </ul>
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

const Board = styled.li`
  padding: 12px;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    background-color: rgba(var(--color-lightgray) / 30%);
  }
`;

const BoardMain = styled.div`
  display: flex;
  gap: 20px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    border: 1px solid rgba(var(--color-lightgray));
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 8px;

  p {
    color: rgba(var(--color-darkgray));
  }
`;
