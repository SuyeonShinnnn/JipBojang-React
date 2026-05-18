import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import ChattingSideBar from '../../pages/consultant/components/ChattingSideBar';
import { useAuthStore } from '../../stores/auth';

import {
  getChatRooms,
  getFavoriteExpert,
  findOrCreateChatRoom,
} from '../../apis/consultAPI';
import { Main } from '../../style/common';

const ConsultLayout = () => {
  const auth = useAuthStore();
  const navigate = useNavigate();

  const userId = Number(auth.user.userId);

  const goChat = async (expertId: number) => {
    const res = await findOrCreateChatRoom(userId, expertId);

    navigate(`/chat/${res.data.roomId}`, {
      state: { chatRoomData: res.data },
    });
  };

  const { data: chatRooms = [] } = useQuery({
    queryKey: ['chatRoom', userId],
    queryFn: async () => await getChatRooms(userId).then((res) => res.data),
    enabled: !!userId,
  });

  const { data: favoriteExperts = [] } = useQuery({
    queryKey: ['favoriteExperts', userId],
    queryFn: async () =>
      await getFavoriteExpert(userId).then((res) => res.data),
    enabled: !!userId,
  });

  return (
    <Layout>
      <ChattingSideBar
        chatRooms={chatRooms}
        favoriteExperts={favoriteExperts}
        goChat={goChat}
      />

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default ConsultLayout;

const Layout = styled(Main)`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;
