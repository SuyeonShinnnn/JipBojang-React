import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChattingSideBar from './components/ChattingSideBar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFavorites,
  deleteFavorites,
  findOrCreateChatRoom,
  getChatRooms,
  getExpert,
  getFavoriteExpert,
} from '../../apis/consultAPI';

import type { ChatRoom, ExpertInfo } from '../../types/consult';

import { useAuthStore } from '../../stores/auth';
import ExpertCard from './components/ExpertCard';

const ConsultingUserPage = () => {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userId = Number(auth.user.userId);

  const goDetail = (id: number) => {
    navigate(`/expert/${id}`);
  };

  const goChat = async (expertId: number) => {
    const res = await findOrCreateChatRoom(userId, expertId);
    const roomId = res.data.roomId;
    navigate(`/chat/${roomId}`, {
      state: { chatRoomData: res.data },
    });
  };

  const { data: experts = [] } = useQuery<ExpertInfo[]>({
    queryKey: ['experts'],
    queryFn: async () => await getExpert().then((res) => res.data),
  });

  const { data: favoriteExperts = [] } = useQuery<ExpertInfo[]>({
    queryKey: ['favoriteExperts', userId],
    queryFn: async () =>
      await getFavoriteExpert(userId).then((res) => res.data),
    enabled: !!userId,
  });

  const favoriteMutation = useMutation({
    mutationFn: async (expert: ExpertInfo) => {
      if (expert.isFavorite) {
        await deleteFavorites(userId, expert.id);
      } else {
        await addFavorites(userId, expert.id);
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['favoriteExperts', userId],
      });

      await queryClient.invalidateQueries({
        queryKey: ['experts'],
      });
    },
  });

  const isFavorite = (expertId: number) => {
    return favoriteExperts.some((fav) => fav.id === expertId);
  };

  const toggleFavorite = (expert: ExpertInfo) => {
    favoriteMutation.mutate(expert);
  };

  const { data: chatRooms = [] } = useQuery<ChatRoom[]>({
    queryKey: ['chatRoom', userId],
    queryFn: async () => await getChatRooms(userId).then((res) => res.data),
    enabled: !!userId,
  });

  return (
    <Layout>
      <ChattingSideBar
        favoriteExperts={favoriteExperts}
        chatRooms={chatRooms}
        goChat={goChat}
      />
      <Main>
        <PageTitle>나에게 맞는 전문가 찾기</PageTitle>

        <Subtitle>안전한 전세계약을 위한 전문가 상담 서비스</Subtitle>

        <Grid>
          {experts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              favorite={isFavorite(expert.id)}
              onToggleFavorite={() => toggleFavorite(expert)}
              onChat={goChat}
              onDetail={() => goDetail(expert.id)}
            />
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
