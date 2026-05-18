import styled from "styled-components";
import SideBar from "./components/SideBar";
import BaseInput from "../../components/common/BaseInput";
import { Heart3LineIcon } from "../../assets/icon/Heart3LineIcon";
import { Heart3FillIcon } from "../../assets/icon/Heart3FillIcon";
import { StarFatIcon } from "../../assets/icon/StarFatIcon";
import { useNavigate } from "react-router-dom";

const CommunityMainPage = () => {
  const dummy = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  const navigate = useNavigate();

  const handleBoardClick = () => {
    navigate("/board");
  };

  return (
    <Main>
      <h1>커뮤니티 게시판</h1>
      <Container>
        <SideBar />
        <Section>
          <BaseInput showButton={true} placeholder="검색어를 입력하세요" />
          <ul>
            {dummy.map((item) => (
              <Board onClick={() => handleBoardClick()}>
                <Profile>
                  <img src={item.profile} alt={`${item.user} 프로필`} />
                  <strong>{item.user}</strong>
                  <div>{item.type}</div>
                </Profile>
                <ContentWrapper>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </ContentWrapper>
                <IconWrapper>
                  <Icon>
                    <Heart3LineIcon />
                    <small>{item.heart}</small>
                  </Icon>
                  <Icon>
                    <StarFatIcon />
                    <small>{item.heart}</small>
                  </Icon>
                  <Icon>
                    <Heart3LineIcon />
                    <small>{item.heart}</small>
                  </Icon>
                </IconWrapper>
              </Board>
            ))}
          </ul>
        </Section>
      </Container>
    </Main>
  );
};

export default CommunityMainPage;

const Main = styled.main`
  padding: 1rem 5rem 5rem;
`;

const Container = styled.div`
  display: flex;
  gap: 40px;

  margin-top: 20px;
`;

const Section = styled.section`
  flex: 1;

  ul {
    display: grid;
    gap: 12px;
    margin-top: 20px;
  }
`;

const Board = styled.li`
  padding: 12px;
  border: 1px solid rgba(var(--color-lightgray));
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Profile = styled.div`
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

const ContentWrapper = styled.div``;

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
