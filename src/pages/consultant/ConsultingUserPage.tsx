import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type Agent = {
  id: number;
  name: string;
  company: string;
  profileImage?: string;
  rating?: number;
  description?: string;
  is_favorite?: boolean;
};

type FavoriteAgent = {
  id: number;
  name: string;
  company: string;
  profileImage?: string;
};

type Chat = {
  channelUrl: string;
  opponentName: string;
  opponentProfileUrl?: string;
  opponentUserId: string;
  lastMessage?: string;
  unreadCount: number;
};

const ConsultingUserPage = () => {
  const navigate = useNavigate();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [favoriteAgents, setFavoriteAgents] = useState<FavoriteAgent[]>([]);
  const [ongoingChats, setOngoingChats] = useState<Chat[]>([]);
  const [isFavOpen, setIsFavOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);

  useEffect(() => {
    loadDummyData();
  }, []);

  // 임시
  const loadDummyData = () => {
    const dummyAgents: Agent[] = [
      {
        id: 1,
        name: '김민수',
        company: '한빛 공인중개사',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.8,
        description: '전세사기 예방 및 청년 전세 상담 전문 중개사입니다.',
        is_favorite: true,
      },
      {
        id: 2,
        name: '이지은',
        company: '행복부동산',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4.9,
        description: '신축 오피스텔 및 아파트 매물 상담 경험이 풍부합니다.',
        is_favorite: false,
      },
      {
        id: 3,
        name: '박준호',
        company: '우리부동산',
        profileImage: 'https://randomuser.me/api/portraits/men/11.jpg',
        rating: 4.6,
        description: '사회초년생 대상 안전한 계약 상담을 진행합니다.',
        is_favorite: true,
      },
      {
        id: 4,
        name: '최서연',
        company: '스마트 공인중개사',
        profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
        rating: 5.0,
        description: '등기부등본 및 건축물대장 기반 분석 상담 제공.',
        is_favorite: false,
      },
    ];

    const dummyFavorites: FavoriteAgent[] = dummyAgents
      .filter((a) => a.is_favorite)
      .map((a) => ({
        id: a.id,
        name: a.name,
        company: a.company,
        profileImage: a.profileImage,
      }));

    const dummyChats: Chat[] = [
      {
        channelUrl: 'channel-1',
        opponentName: '김민수',
        opponentProfileUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        opponentUserId: 'agent-1',
        lastMessage: '계약 전 등기부등본 꼭 확인하세요!',
        unreadCount: 2,
      },
      {
        channelUrl: 'channel-2',
        opponentName: '최서연',
        opponentProfileUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
        opponentUserId: 'agent-4',
        lastMessage: '보증보험 가입 가능 여부 확인해드릴게요.',
        unreadCount: 0,
      },
    ];

    setAgents(dummyAgents);
    setFavoriteAgents(dummyFavorites);
    setOngoingChats(dummyChats);
  };

  const toggleFavorite = (agent: Agent) => {
    const updatedAgents = agents.map((a) =>
      a.id === agent.id ? { ...a, is_favorite: !a.is_favorite } : a,
    );

    setAgents(updatedAgents);

    const updatedFavorites = updatedAgents
      .filter((a) => a.is_favorite)
      .map((a) => ({
        id: a.id,
        name: a.name,
        company: a.company,
        profileImage: a.profileImage,
      }));

    setFavoriteAgents(updatedFavorites);
  };

  const goDetail = (id: number) => {
    navigate(`/agent/${id}`);
  };

  const goChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <Layout>
      <Sidebar>
        <SidebarTitle>상담 관리</SidebarTitle>

        <Section>
          <Title onClick={() => setIsFavOpen(!isFavOpen)}>⭐ 찜한 전문가</Title>

          {isFavOpen &&
            (favoriteAgents.length === 0 ? (
              <Empty>찜한 전문가 없음</Empty>
            ) : (
              favoriteAgents.map((f) => (
                <FavCard key={f.id} onClick={() => goDetail(f.id)}>
                  <img src={f.profileImage} alt={f.name} />

                  <Info>
                    <b>{f.name}</b>
                    <span>{f.company}</span>
                  </Info>
                </FavCard>
              ))
            ))}
        </Section>

        <Section>
          <Title onClick={() => setIsChatOpen(!isChatOpen)}>
            💬 진행중 상담
          </Title>

          {isChatOpen &&
            (ongoingChats.length === 0 ? (
              <Empty>상담 없음</Empty>
            ) : (
              ongoingChats.map((c) => (
                <ChatCard
                  key={c.channelUrl}
                  onClick={() => goChat(c.opponentUserId)}
                >
                  <AvatarWrapper>
                    <img src={c.opponentProfileUrl} alt={c.opponentName} />

                    {c.unreadCount > 0 && (
                      <Badge>{c.unreadCount > 9 ? '9+' : c.unreadCount}</Badge>
                    )}
                  </AvatarWrapper>

                  <Info>
                    <b>{c.opponentName}</b>
                    <p>{c.lastMessage}</p>
                  </Info>
                </ChatCard>
              ))
            ))}
        </Section>
      </Sidebar>

      <Main>
        <PageTitle>나에게 맞는 전문가 찾기</PageTitle>
        <Subtitle>안전한 전세계약을 위한 전문가 상담 서비스</Subtitle>

        <Grid>
          {agents.map((agent) => (
            <Card key={agent.id}>
              <Header>
                <FavBtn
                  active={agent.is_favorite}
                  onClick={() => toggleFavorite(agent)}
                >
                  ♥
                </FavBtn>
              </Header>

              <Body>
                <ProfileImage src={agent.profileImage} alt={agent.name} />

                <h3>{agent.name}</h3>

                <Company>{agent.company}</Company>

                <Rating>⭐ {agent.rating?.toFixed(1)}</Rating>

                <Description>{agent.description}</Description>
              </Body>

              <Footer>
                <DetailButton onClick={() => goDetail(agent.id)}>
                  상세보기
                </DetailButton>

                <ConsultButton onClick={() => goChat(String(agent.id))}>
                  상담하기
                </ConsultButton>
              </Footer>
            </Card>
          ))}
        </Grid>
      </Main>
    </Layout>
  );
};

export default ConsultingUserPage;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: rgba(var(--color-accent) / 20%);
`;

const Sidebar = styled.aside`
  width: 300px;
  padding: 24px;
`;

const SidebarTitle = styled.h1`
  font-size: 22px;
  margin-bottom: 32px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  cursor: pointer;
`;

const Empty = styled.div`
  color: rgba(var(--color-darkgray));
  padding: 12px;
`;

const FavCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: rgba(var(--color-lightgray) / 30%);
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;

const ChatCard = styled(FavCard)`
  justify-content: flex-start;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4757;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  span,
  p {
    color: rgba(var(--color-darkgray));
    font-size: 14px;
    margin-top: 4px;
  }

  p {
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 48px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: 0.25s;

  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
  }
`;

const Header = styled.div`
  height: 90px;
  background: #e8e7ff;

  position: relative;
`;

const FavBtn = styled.button<{ active?: boolean }>`
  position: absolute;
  top: 14px;
  right: 14px;

  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;

  cursor: pointer;

  font-size: 18px;

  background: white;

  color: ${(props) => (props.active ? '#ff4757' : '#bbb')};
`;

const Body = styled.div`
  padding: 0 24px 24px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 5px solid white;
  object-fit: cover;

  transform: translateY(-50px);

  background: white;
`;

const Company = styled.p`
  color: #777;
  margin-top: 6px;
`;

const Rating = styled.div`
  margin-top: 12px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-top: 16px;
  color: #555;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;
`;

const DetailButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #6a67ea;
  background: white;
  color: #6a67ea;
  cursor: pointer;
`;

const ConsultButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #6a67ea;
  color: white;
  cursor: pointer;
`;
