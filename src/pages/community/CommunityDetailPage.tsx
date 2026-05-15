import styled from "styled-components";

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
  return (
    <Main>
      <Section>
        <article>
          <ProfileWrapper>
            <img src={dummy.profile} />
            <strong>{dummy.user}</strong>
            <div>{dummy.type}</div>
          </ProfileWrapper>
        </article>
      </Section>
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
const Section = styled.section`
  width: 60%;
  background: #fff;
  border: 1px solid rgba(var(--color-lightgray));
  border-radius: 12px;
  padding: 12px;
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
