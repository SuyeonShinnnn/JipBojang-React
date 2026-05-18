import styled from 'styled-components';
import ErrorState from '../../../components/common/ErrorState';
import type { BoardInfo } from '../../../types/community';
import alterImage from '../../../assets/consult/basic-profile.png';
import { formatDate } from '../../../utils/format';

interface BoardListProps {
  data: BoardInfo[];
  isPending: boolean;
  isError: boolean;
  goToDetail: (postId: number) => void;
}

const BoardList = ({
  data,
  isPending,
  isError,
  goToDetail,
}: BoardListProps) => {
  return (
    <>
      <ul>
        {isPending && <>pending...</>}
        {isError && <ErrorState />}
        {!isPending &&
          !isError &&
          data.map((item) => (
            <>
              <Board key={item.postId} onClick={() => goToDetail(item.postId)}>
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
    </>
  );
};

export default BoardList;

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
