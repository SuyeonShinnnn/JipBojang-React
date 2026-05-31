import styled from 'styled-components';
import BaseButton from '../../components/common/BaseButton';
import { useQuery } from '@tanstack/react-query';
import { getBoardDetail } from '../../apis/communityApi';
import { useAuthStore } from '../../stores/auth';
import { useParams } from 'react-router-dom';
import type { BoardInfo } from '../../types/community';
import { Main } from '../../style/common';
import BoardIconWrapper from './components/BoardIconWrapper';
import { formatDate } from '../../utils/format';

const CommunityDetailPage = () => {
  const auth = useAuthStore();
  const userId = Number(auth.user.userId);

  const { postId } = useParams();

  const reply = [
    {
      profile: '/img/',
      user: '홍길동',
      content:
        '부동산 경매에 대해 아무것도 모르는데 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고',
      createdAt: '2027-10-10 23:11:11',
      heart: 3,
      reply: 1,
      scrap: 1,
    },
    {
      profile: '/img/',
      user: '홍길동',
      content:
        '부동산 경매에 대해 아무것도 모르는데 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고',
      createdAt: '2027-10-10 23:11:11',
      heart: 3,
      reply: 1,
      scrap: 1,
    },
    {
      profile: '/img/',
      user: '홍길동',
      content:
        '부동산 경매에 대해 아무것도 모르는데 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고',
      createdAt: '2027-10-10 23:11:11',
      heart: 3,
      reply: 1,
      scrap: 1,
    },
  ];

  const handleSubmit = () => {};

  const handleReplyBoxClick = () => {
    // 댓글 박스 누르면 대댓글 달 수 있도록
  };

  const { data, isPending, isError } = useQuery<BoardInfo>({
    queryKey: ['postId'],
    queryFn: async () =>
      await getBoardDetail(Number(postId), userId).then((res) => res.data),
  });

  if (isPending) return <></>;
  if (isError) return <></>;

  return (
    <StyledMain>
      <Container>
        <TitleSection>
          <h2>{data?.title}</h2>
          <ProfileWrapper>
            <span>{data?.writerNickname}</span>
            <small>{formatDate(data?.createdAt)}</small>
          </ProfileWrapper>
          <BoardIconWrapper
            liked={data?.liked ?? false}
            likes={data?.likes ?? 0}
            scrapped={data?.scrapped ?? false}
            scraps={data?.scraps ?? 0}
            customColor={'rgba(var(--color-mediumgray))'}
            showFlag={false}
          />
        </TitleSection>
        <ContentSection>
          <p>{data?.content}</p>
          <BoardIconWrapper
            liked={data?.liked ?? false}
            likes={data?.likes ?? 0}
            scrapped={data?.scrapped ?? false}
            scraps={data?.scraps ?? 0}
          />
        </ContentSection>
        <ReplySection>
          <h5>댓글 쓰기</h5>
          <ReplyBox />
          <ReplyButtonWrapper>
            <BaseButton size="size2" onClick={() => handleSubmit()}>
              작성 완료
            </BaseButton>
          </ReplyButtonWrapper>
        </ReplySection>

        <ul>
          {reply.map((item) => (
            <>
              <ReplyContent onClick={() => handleReplyBoxClick()}>
                <ProfileWrapper>
                  <strong>{item.user}</strong>
                  <small>{formatDate(item.createdAt)}</small>
                </ProfileWrapper>
                <p>{item.content}</p>
                {/* <BoardIconWrapper /> */}
              </ReplyContent>
              <hr />
            </>
          ))}
        </ul>
      </Container>
    </StyledMain>
  );
};

export default CommunityDetailPage;

const StyledMain = styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 60%;
  background: #fff;
  border-radius: 12px;
  padding: 12px;

  display: grid;
  gap: 12px;

  hr {
    border: 1px solid rgba(var(--color-lightgray));
  }
`;

const TitleSection = styled.section`
  display: grid;
  gap: 8px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50px;
  }
`;

const ContentSection = styled.section`
  border-top: 1px solid rgba(var(--color-lightgray));
  border-bottom: 1px solid rgba(var(--color-lightgray));
  padding-top: 40px;
  padding-bottom: 20px;
  display: grid;
  gap: 40px;
`;

const ReplySection = styled.section`
  display: grid;
  gap: 4px;
`;

const ReplyBox = styled.textarea`
  border: 1px solid rgba(var(--color-lightgray));
  border-radius: 4px;
  width: 100%;
  height: 100px;
  padding: 8px;

  font-size: 14px;
  font-family: 'pretendard';

  &:focus {
    outline: none;
    border-color: rgba(var(--color-primary));
  }
`;

const ReplyButtonWrapper = styled.div`
  display: flex;
  justify-content: end;

  button {
    padding: 8px 12px;
  }
`;

const ReplyContent = styled.li`
  padding: 16px 12px;
  display: grid;
  gap: 8px;
`;
