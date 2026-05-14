import { useState } from 'react';
import styled from 'styled-components';

import ChattingSideBar from './components/ChattingSideBar';
import BaseInput from '../../components/common/BaseInput';

import { useChat } from '../../hooks/useChat';
import type { ChatMessage } from '../../types/consult';

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

const ChattingPage = () => {
  const { messages, sendMessage } = useChat();

  const [text, setText] = useState('');

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

  const goDetail = (id: number) => {
    console.log('detail', id);
  };

  const goChat = (userId: string) => {
    console.log('chat', userId);
  };

  const handleSendMessage = () => {
    if (!text.trim()) return;

    sendMessage('me', text);

    setText('');
  };

  return (
    <Layout>
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
          {messages.map((message: ChatMessage, idx: number) => {
            const isMe = message.sender === 'me';

            return (
              <MessageRow key={idx} isMe={isMe}>
                <MessageBubble isMe={isMe}>
                  <p>{message.content}</p>
                </MessageBubble>
              </MessageRow>
            );
          })}
        </MessageContainer>

        <InputArea>
          <BaseInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="메시지를 입력하세요"
            showButton={true}
            buttonContent={<span>전송</span>}
            onButtonClick={handleSendMessage}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
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
  overflow: hidden;

  background: #f5f7fb;
`;

const ChatContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
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
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 4px;
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

  border-radius: 16px;

  background: ${(props) => (props.isMe ? '#6a67ea' : 'white')};

  color: ${(props) => (props.isMe ? 'white' : '#222')};

  border-bottom-right-radius: ${(props) => (props.isMe ? '4px' : '16px')};

  border-bottom-left-radius: ${(props) => (props.isMe ? '16px' : '4px')};

  p {
    line-height: 1.5;
    word-break: break-word;
  }
`;

const InputArea = styled.div`
  padding: 16px;

  border-top: 1px solid #ececec;

  background: white;

  div {
    width: 100%;
  }

  input {
    border-radius: 999px;
  }

  button {
    background: transparent;
    color: rgba(var(--color-darkgray));
  }
`;
