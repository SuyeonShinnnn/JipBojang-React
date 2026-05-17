import styled from 'styled-components';
import type { ChatRoom, ExpertInfo } from '../../../types/consult';
import alterImage from '../../../assets/consult/basic-profile.png';

interface ChattingSideBarProps {
  favoriteExperts: ExpertInfo[];
  chatRooms: ChatRoom[];
  goChat: (expertId: number) => void;
}

const ChattingSideBar = ({
  favoriteExperts,
  chatRooms,
  goChat,
}: ChattingSideBarProps) => {
  return (
    <Sidebar>
      <SidebarTitle>상담 관리</SidebarTitle>

      {/* 찜한 전문가 */}
      <Section>
        <Title>⭐ 찜한 전문가</Title>
        {favoriteExperts.length === 0 ? (
          <Empty>찜한 전문가 없음</Empty>
        ) : (
          favoriteExperts.map((f) => (
            <FavCard key={f.id}>
              <img
                src={f.profileImage}
                alt={f.name}
                onError={(e) => {
                  const target = e.currentTarget;

                  target.src = `${alterImage}`;
                  target.onerror = null;
                }}
              />

              <Info>
                <b>{f.name}</b>
                <span>{f.company}</span>
              </Info>
            </FavCard>
          ))
        )}
      </Section>

      {/* 진행중 상담 */}
      <Section>
        <Title>💬 진행중 상담</Title>

        {chatRooms.length === 0 ? (
          <Empty>상담 없음</Empty>
        ) : (
          chatRooms.map((c) => (
            <ChatCard key={c.roomId} onClick={() => goChat(c.expertId)}>
              <AvatarWrapper>
                <img
                  src={c.expertProfile}
                  alt={c.expertNickname}
                  onError={(e) => {
                    const target = e.currentTarget;

                    target.src = `${alterImage}`;
                    target.onerror = null;
                  }}
                />

                {/* {c.unreadCount > 0 && (
                  <Badge>{c.unreadCount > 9 ? '9+' : c.unreadCount}</Badge>
                )} */}
              </AvatarWrapper>

              <Info>
                <b>{c.expertNickname}</b>
                <p>{c.content}</p>
              </Info>
            </ChatCard>
          ))
        )}
      </Section>
    </Sidebar>
  );
};

export default ChattingSideBar;

const Sidebar = styled.aside`
  width: 300px;
  padding: 24px;
`;

const SidebarTitle = styled.h1`
  font-size: 22px;
  margin-bottom: 32px;
`;

const Section = styled.section`
  margin-bottom: 32px;
  max-height: 30vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
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

  img {
    width: 48px !important;
    height: 48px !important;
    border-radius: 50%;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;

  width: 20px;
  height: 20px;
  border-radius: 50%;

  background: #ff4757;
  color: white;
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
