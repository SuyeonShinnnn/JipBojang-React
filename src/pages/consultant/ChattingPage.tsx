import { useState } from 'react';
import styled from 'styled-components';

import ChattingSideBar from './components/ChattingSideBar';
import BaseInput from '../../components/common/BaseInput';

import { useChat } from '../../hooks/useChat';

import type { ChatMessage, ExpertInfo } from '../../types/consult';
import { useAuthStore } from '../../stores/auth';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMessageHistory } from '../../apis/consultAPI';

type FavoriteExpert = {
  id: number;
  name: string;
  company: string;
  profileImage?: string;
};

type Chat = {
  roomId: number;
  opponentName: string;
  opponentProfileUrl?: string;
  opponentUserId: number;
  lastMessage?: string;
  unreadCount: number;
};

const ChattingPage = () => {
  const auth = useAuthStore();
  const { roomId } = useParams();
  const location = useLocation();

  const userId = Number(auth.user.userId);
  const chatRoomData = location.state?.chatRoomData;
  const expertInfo: ExpertInfo = location.state?.expertInfo;

  const [text, setText] = useState('');

  const handleSendMessage = () => {
    if (!text.trim()) return;

    setText('');
  };

  const {
    data: messages = [],
    isPending,
    isError,
  } = useQuery<ChatMessage[]>({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      const res = await getMessageHistory(Number(roomId));
      return res.data;
    },
  });

  return (
    <Layout>
      <ChatContainer>
        <ChatHeader>
          {expertInfo ? (
            <ProfileWrapper>
              <img src={expertInfo.profileImage} alt="agent" />

              <div>
                <h3>{expertInfo.name}</h3>

                <small>{expertInfo.company}</small>
              </div>
            </ProfileWrapper>
          ) : (
            <EmptyText>상담할 중개사를 선택해주세요.</EmptyText>
          )}
        </ChatHeader>

        <MessageContainer>
          {messages.map((message) => (
            <MessageRow
              key={message.messageId}
              isMe={userId === message.senderId}
            >
              <MessageBubble isMe={userId === message.senderId}>
                {userId !== message.senderId && (
                  <SenderName>{expertInfo.name}</SenderName>
                )}

                <p>{message.content}</p>

                <TimeText>{message.createdAt}</TimeText>
              </MessageBubble>
            </MessageRow>
          ))}
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
  padding: 12px 32px;

  display: flex;
  align-items: center;

  border-top: 1px solid #ececec;
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

const EmptyText = styled.p`
  color: #888;
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

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  p {
    line-height: 1.5;

    word-break: break-word;
  }
`;

const SenderName = styled.div`
  font-size: 12px;

  margin-bottom: 6px;

  color: #777;
`;

const TimeText = styled.div`
  margin-top: 8px;

  font-size: 11px;

  opacity: 0.7;

  text-align: right;
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
