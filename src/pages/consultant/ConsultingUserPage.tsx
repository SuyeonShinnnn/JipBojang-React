import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChattingSideBar from './components/ChattingSideBar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFavorites,
  deleteFavorites,
  getAgent,
  getFavoriteAgent,
} from '../../apis/consultAPI';

import type { AgentInfo } from '../../types/consult';

import basicProfile from '../../assets/consult/basic-profile.png';
import BaseButton from '../../components/common/BaseButton';
import { useAuthStore } from '../../stores/auth';

type Chat = {
  channelUrl: string;
  opponentName: string;
  opponentProfileUrl?: string;
  opponentUserId: string;
  lastMessage?: string;
  unreadCount: number;
};

const ConsultingUserPage = () => {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userId = Number(auth.user.userId);

  const ongoingChats: Chat[] = [];

  const isFavOpen = true;
  const isChatOpen = true;

  const goDetail = (id: number) => {
    navigate(`/agent/${id}`);
  };

  const goChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const { data: agents = [] } = useQuery<AgentInfo[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await getAgent();
      return res.data;
    },
  });

  const { data: favoriteAgents = [] } = useQuery<AgentInfo[]>({
    queryKey: ['favoriteAgents', userId],
    queryFn: async () => {
      const res = await getFavoriteAgent(userId);
      return res.data;
    },
    enabled: !!userId,
  });

  const favoriteMutation = useMutation({
    mutationFn: async (agent: AgentInfo) => {
      if (agent.isFavorite) {
        await deleteFavorites(userId, agent.id);
      } else {
        await addFavorites(userId, agent.id);
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['favoriteAgents', userId],
      });

      await queryClient.invalidateQueries({
        queryKey: ['agents'],
      });
    },
  });

  const isFavorite = (agentId: number) => {
    return favoriteAgents.some((fav) => fav.id === agentId);
  };

  return (
    <Layout>
      <ChattingSideBar
        favoriteAgents={favoriteAgents}
        ongoingChats={ongoingChats}
        isFavOpen={isFavOpen}
        isChatOpen={isChatOpen}
        setIsFavOpen={() => {}}
        setIsChatOpen={() => {}}
        goDetail={goDetail}
        goChat={goChat}
      />

      <Main>
        <PageTitle>나에게 맞는 전문가 찾기</PageTitle>

        <Subtitle>안전한 전세계약을 위한 전문가 상담 서비스</Subtitle>

        <Grid>
          {agents.map((agent) => {
            const favorite = isFavorite(agent.id);

            return (
              <Card key={agent.id}>
                <Header>
                  <FavBtn
                    active={favorite}
                    onClick={() =>
                      favoriteMutation.mutate({
                        ...agent,
                        isFavorite: favorite,
                      })
                    }
                  >
                    ♥
                  </FavBtn>
                </Header>

                <Body>
                  <ImageWrapper>
                    <ProfileImage
                      src={agent.profileImage}
                      alt={agent.name}
                      onError={(e) => (e.currentTarget.src = basicProfile)}
                    />
                  </ImageWrapper>

                  <h3>{agent.name}</h3>

                  <Company>{agent.company}</Company>

                  <Rating>⭐ {agent.rating?.toFixed(1)}</Rating>

                  <Description>{agent.description}</Description>
                </Body>

                <Footer>
                  <BaseButton
                    onClick={() => goDetail(agent.id)}
                    variant="outline"
                  >
                    상세보기
                  </BaseButton>

                  <BaseButton onClick={() => goChat(String(agent.id))}>
                    상담하기
                  </BaseButton>
                </Footer>
              </Card>
            );
          })}
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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 5px solid white;
  transform: translateY(-50px);

  background: white;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
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

  button {
    flex: 1;
    padding: 12px;
  }
`;
