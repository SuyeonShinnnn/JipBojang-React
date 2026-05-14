import { useState } from 'react';
import styled from 'styled-components';
import ChattingSideBar from './components/ChattingSideBar';
import BaseInput from '../../components/common/BaseInput';

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

type Message = {
  id: number;
  sender: 'me' | 'agent';
  text: string;
  time: string;
};

const ChattingPage = () => {
  const [isFavOpen, setIsFavOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const favoriteAgents: FavoriteAgent[] = [
    {
      id: 1,
      name: '김민수',
      company: '한빛 공인중개사',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      name: '최서연',
      company: '스마트 공인중개사',
      profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  const ongoingChats: Chat[] = [
    {
      channelUrl: 'channel-1',
      opponentName: '김민수',
      opponentProfileUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      opponentUserId: 'agent-1',
      lastMessage: '등기부등본 확인해보셨나요?',
      unreadCount: 2,
    },
    {
      channelUrl: 'channel-2',
      opponentName: '최서연',
      opponentProfileUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      opponentUserId: 'agent-2',
      lastMessage: '보증보험 가입 가능합니다.',
      unreadCount: 0,
    },
  ];

  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: 'agent',
      text: '안녕하세요 😊 어떤 매물 상담 원하시나요?',
      time: '오후 1:20',
    },
    {
      id: 2,
      sender: 'me',
      text: '전세사기 위험 없는 매물인지 확인받고 싶어요.',
      time: '오후 1:21',
    },
    {
      id: 3,
      sender: 'agent',
      text: '네! 주소 보내주시면 건축물대장과 등기부등본 기준으로 확인 도와드릴게요.',
      time: '오후 1:22',
    },
  ]);

  const goDetail = (id: number) => {
    console.log('detail', id);
  };

  const goChat = (userId: string) => {
    console.log('chat', userId);
  };

  return (
    <Layout>
      {/* ===== SIDEBAR ===== */}
      <ChattingSideBar
        favoriteAgents={favoriteAgents}
        ongoingChats={ongoingChats}
        isFavOpen={isFavOpen}
        isChatOpen={isChatOpen}
        setIsFavOpen={setIsFavOpen}
        setIsChatOpen={setIsChatOpen}
        goDetail={goDetail}
        goChat={goChat}
      />

      {/* ===== CHAT AREA ===== */}
      <ChatContainer>
        <ChatHeader>
          <ProfileWrapper>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="agent"
            />

            <div>
              <h3>김민수 중개사</h3>
              <small>한빛 공인중개사</small>
            </div>
          </ProfileWrapper>
        </ChatHeader>

        <MessageContainer>
          {messages.map((message) => (
            <MessageRow key={message.id} isMe={message.sender === 'me'}>
              <MessageBubble isMe={message.sender === 'me'}>
                <p>{message.text}</p>
                <small>{message.time}</small>
              </MessageBubble>
            </MessageRow>
          ))}
        </MessageContainer>

        <InputArea>
          <BaseInput
            placeholder="메시지를 입력하세요"
            showButton={true}
            buttonContent={<span>전송</span>}
          />
        </InputArea>
      </ChatContainer>
    </Layout>
  );
};

export default ChattingPage;

const Layout = styled.div`
  display: flex;
  height: 90vh;
  background: #f5f7fb;
`;

const ChatContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  height: 60px;
  padding: 0 32px;

  display: flex;
  align-items: center;

  border-bottom: 1px solid #ececec;

  background: white;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
  }

  small {
    color: #777;
  }
`;

const MessageContainer = styled.div`
  flex: 1;

  padding: 32px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 18px;

  background: #f8f9fc;
`;

const MessageRow = styled.div<{ isMe: boolean }>`
  display: flex;

  justify-content: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ isMe: boolean }>`
  max-width: 420px;

  padding: 14px 16px;
  border-radius: 12px;

  background: ${(props) => (props.isMe ? '#6a67ea' : 'white')};
  color: ${(props) => (props.isMe ? 'white' : '#222')};

  border-bottom-left-radius: ${(props) => (props.isMe ? '12px' : '4px')};
  border-bottom-right-radius: ${(props) => (props.isMe ? '4px' : '12px')};

  p {
    line-height: 1.5;
    margin-bottom: 8px;
  }

  small {
    font-size: 12px;
    opacity: 0.7;
  }
`;

const InputArea = styled.div`
  padding: 20px 24px;

  display: flex;
  gap: 16px;

  border-top: 1px solid #ececec;

  background: white;

  div {
    flex: 1;
  }

  input {
    border-radius: 50px;
  }

  button {
    background-color: transparent;
    color: rgba(var(--color-darkgray));
  }
`;
