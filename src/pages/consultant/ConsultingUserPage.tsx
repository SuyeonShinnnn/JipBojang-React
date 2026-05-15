import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChattingSideBar from './components/ChattingSideBar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFavorites,
  deleteFavorites,
  findOrCreateChatRoom,
  getExpert,
  getFavoriteExpert,
} from '../../apis/consultAPI';

import type { ExpertInfo } from '../../types/consult';

import basicProfile from '../../assets/consult/basic-profile.png';
import BaseButton from '../../components/common/BaseButton';
import { useAuthStore } from '../../stores/auth';

const ConsultingUserPage = () => {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userId = Number(auth.user.userId);

  const goDetail = (id: number) => {
    navigate(`/expert/${id}`);
  };

  const goChat = async (expert: ExpertInfo) => {
    console.log(expert);
    const res = await findOrCreateChatRoom(userId, expert.userId);
    const roomId = res.data.roomId;
    navigate(`/chat/${roomId}`, { state: { chatRoomData: res.data } });
  };

  const { data: experts = [] } = useQuery<ExpertInfo[]>({
    queryKey: ['experts'],
    queryFn: async () => {
      const res = await getExpert();
      return res.data;
    },
  });

  const { data: favoriteExperts = [] } = useQuery<ExpertInfo[]>({
    queryKey: ['favoriteExperts', userId],
    queryFn: async () => {
      const res = await getFavoriteExpert(userId);
      return res.data;
    },
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

  return (
    <Layout>
      <Main>
        <PageTitle>나에게 맞는 전문가 찾기</PageTitle>

        <Subtitle>안전한 전세계약을 위한 전문가 상담 서비스</Subtitle>

        <Grid>
          {experts.map((expert) => {
            const favorite = isFavorite(expert.id);

            return (
              <Card key={expert.id}>
                <Header>
                  <FavBtn
                    active={favorite}
                    onClick={() =>
                      favoriteMutation.mutate({
                        ...expert,
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
                      src={expert.profileImage}
                      alt={expert.name}
                      onError={(e) => (e.currentTarget.src = basicProfile)}
                    />
                  </ImageWrapper>

                  <h3>{expert.name}</h3>

                  <Company>{expert.company}</Company>

                  <Rating>⭐ {expert.rating?.toFixed(1)}</Rating>

                  <Description>{expert.description}</Description>
                </Body>

                <Footer>
                  <BaseButton
                    onClick={() => goDetail(expert.id)}
                    variant="outline"
                  >
                    상세보기
                  </BaseButton>

                  <BaseButton onClick={() => goChat(expert)}>
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
