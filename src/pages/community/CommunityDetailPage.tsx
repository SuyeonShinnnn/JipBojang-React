import styled from "styled-components";
import { Heart3LineIcon } from "../../assets/icon/Heart3LineIcon";
import { StarFatIcon } from "../../assets/icon/StarFatIcon";
import BaseButton from "../../components/common/BaseButton";

const CommunityDetailPage = () => {
  const dummy = {
    profile: "/img/",
    user: "홍길동",
    type: "공인중개사",
    title: "경매 공부 시작했어요!",
    content:
      "부동산 경매에 대해 아무것도 모르는데 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
    createdAt: "2027-10-10 23:11:11",
    heart: 3,
    reply: 1,
    scrap: 1,
  };

  const reply = [
    {
      profile: "/img/",
      user: "홍길동",
      content:
        "부동산 경매에 대해 아무것도 모르는데 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
      createdAt: "2027-10-10 23:11:11",
      heart: 3,
      reply: 1,
      scrap: 1,
    },
    {
      profile: "/img/",
      user: "홍길동",
      content:
        "부동산 경매에 대해 아무것도 모르는데 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
      createdAt: "2027-10-10 23:11:11",
      heart: 3,
      reply: 1,
      scrap: 1,
    },
    {
      profile: "/img/",
      user: "홍길동",
      content:
        "부동산 경매에 대해 아무것도 모르는데 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
      createdAt: "2027-10-10 23:11:11",
      heart: 3,
      reply: 1,
      scrap: 1,
    },
  ];

  const handleSubmit = () => {};

  const handleReplyBoxClick = () => {
    // 댓글 박스 누르면 대댓글 달 수 있도록
  };

  return (
    <Main>
      <Container>
        <MainSection>
          <ProfileWrapper>
            <img src={dummy.profile} />
            <strong>{dummy.user}</strong>
            <div>{dummy.type}</div>
          </ProfileWrapper>
          <p>
            이번에 전세 재계약 하는데 특약 사항에 어떤 내용을 추가하면 좋을까요?
            집주인에게 유리한 조건은 피하고 싶어요
          </p>
          <IconWrapper>
            <Icon>
              <Heart3LineIcon />
              <small>1</small>
            </Icon>
            <Icon>
              <StarFatIcon />
              <small>0</small>
            </Icon>
            <Icon>
              <Heart3LineIcon />
              <small>1</small>
            </Icon>
          </IconWrapper>
        </MainSection>
        <hr />

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
              <li onClick={() => handleReplyBoxClick()}>
                <ProfileWrapper>
                  <img src={item.profile} />
                  <strong>{item.user}</strong>
                </ProfileWrapper>
                <p>{item.content}</p>
                <IconWrapper>
                  <Icon>
                    <Heart3LineIcon />
                    <small>1</small>
                  </Icon>
                  <Icon>
                    <StarFatIcon />
                    <small>0</small>
                  </Icon>
                  <Icon>
                    <Heart3LineIcon />
                    <small>1</small>
                  </Icon>
                </IconWrapper>
              </li>
            </>
          ))}
        </ul>
      </Container>
    </Main>
  );
};

export default CommunityDetailPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 60%;
  background: #fff;
  border: 1px solid rgba(var(--color-lightgray));
  border-radius: 12px;
  padding: 12px;

  display: grid;
  gap: 12px;

  hr {
    border: 1px solid rgba(var(--color-lightgray));
  }
`;

const MainSection = styled.section`
  display: grid;
  gap: 2rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    with: 20px;
    height: 20px;
    border-radius: 50px;
  }

  div {
    border-radius: 50px;
    font-size: 12px;
    background: rgba(var(--color-accent));
    padding: 4px;
  }
`;

const Badge = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 16px;
    heihgt: 16px;
    color: red;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ReplySection = styled.section`
  display: grid;
  gap: 4px;
  margin
`;

const ReplyBox = styled.textarea`
  border: 1px solid rgba(var(--color-lightgray));
  border-radius: 4px;
  width: 100%;
  height: 100px;
  padding: 8px;

  font-size: 14px;
  font-family: "pretendard";

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
