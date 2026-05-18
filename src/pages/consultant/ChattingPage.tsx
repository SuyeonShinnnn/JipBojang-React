import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import BaseInput from '../../components/common/BaseInput';

import { useChat } from '../../hooks/useChat';

import type { ChatMessage, ExpertInfo } from '../../types/consult';
import { useAuthStore } from '../../stores/auth';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMessageHistory } from '../../apis/consultAPI';
import { buildChatGroups } from '../../utils/chatMessageGroup';
import MessageList from './components/MessageList';
import ChattingStartCard from './components/ChattingStartCard';
import { Main } from '../../style/common';

const ChattingPage = () => {
  const auth = useAuthStore();

  const { roomId } = useParams();

  const location = useLocation();

  const { messages: realtimeMessages, sendMessage } = useChat({
    roomId: Number(roomId),
    myUserId: Number(auth.user.userId),
  });

  const userId = Number(auth.user.userId);

  const expertInfo: ExpertInfo = location.state?.expertInfo;

  const [text, setText] = useState('');

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    data: historyMessages = [],
    isPending,
    isError,
  } = useQuery<ChatMessage[]>({
    queryKey: ['messages', roomId],
    queryFn: async () =>
      await getMessageHistory(Number(roomId)).then((res) => res.data),
  });

  const allMessages = useMemo(() => {
    return [...historyMessages, ...realtimeMessages];
  }, [historyMessages, realtimeMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [allMessages]);

  const handleSendMessage = (message?: string) => {
    const finalMessage = message ?? text;

    if (!finalMessage.trim()) return;

    sendMessage(finalMessage);

    setText('');
  };

  const groupedMessages = useMemo(
    () => buildChatGroups(allMessages, userId),
    [allMessages, userId],
  );

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>메시지를 불러오지 못했습니다.</div>;
  }

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

        <MessageContainer $isEmpty={groupedMessages.length === 0}>
          {groupedMessages.length === 0 ? (
            <>
              <ChattingStartCard firstChat={handleSendMessage} />
            </>
          ) : (
            <>
              {groupedMessages.map((message) => (
                <MessageList key={message.messageId} message={message} />
              ))}
            </>
          )}

          <div ref={bottomRef} />
        </MessageContainer>

        <InputArea>
          <BaseInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="메시지를 입력하세요"
            showButton
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

const Layout = styled(Main)`
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

  border-top: 1px solid rgba(var(--color-lightgray));
  border-bottom: 1px solid rgba(var(--color-lightgray));

  background: #fff;
`;

const MessageContainer = styled.div<{ $isEmpty: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : '')};
  align-items: ${({ $isEmpty }) => ($isEmpty ? 'center' : '')};
  gap: 2px;

  overflow-y: auto;

  padding: 20px;
  padding-bottom: 0;

  background: #f5f7fb;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 50px;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 4px;
  }

  small {
    color: rgba(var(--color-darkgray));
  }
`;

const EmptyText = styled.p`
  color: #888;
`;

const InputArea = styled.div`
  padding: 12px;

  border-top: 1px solid rgba(var(--color-lightgray));

  background: #fff;

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
