import styled from 'styled-components';

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

interface ChattingSideBarProps {
  favoriteAgents: FavoriteAgent[];
  ongoingChats: Chat[];
  isFavOpen: boolean;
  isChatOpen: boolean;
  setIsFavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goDetail: (id: number) => void;
  goChat: (userId: string) => void;
}

const ChattingSideBar = ({
  favoriteAgents,
  ongoingChats,
  isFavOpen,
  isChatOpen,
  setIsFavOpen,
  setIsChatOpen,
  goDetail,
  goChat,
}: ChattingSideBarProps) => {
  return (
    <Sidebar>
      <SidebarTitle>상담 관리</SidebarTitle>

      {/* 찜한 전문가 */}
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

      {/* 진행중 상담 */}
      <Section>
        <Title onClick={() => setIsChatOpen(!isChatOpen)}>💬 진행중 상담</Title>

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
