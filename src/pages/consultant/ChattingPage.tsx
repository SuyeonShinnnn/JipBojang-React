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
    queryFn: async () => {
      const res = await getMessageHistory(Number(roomId));
      console.log(res.data);
      return res.data;
    },
  });

  const allMessages = useMemo(() => {
    return [...historyMessages, ...realtimeMessages];
  }, [historyMessages, realtimeMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [allMessages]);

  const handleSendMessage = () => {
    if (!text.trim()) return;

    sendMessage(text);

    setText('');
  };

  const formatDate = (date: string) => {
    const d = new Date(date);

    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const formatTime = (date: string) => {
    const d = new Date(date);

    return d.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
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

        <MessageContainer>
          {groupedMessages.map((message) => {
            return (
              <div key={message.messageId}>
                {message.showDateDivider && (
                  <DateDivider>
                    <span>{formatDate(message.createdAt)}</span>
                  </DateDivider>
                )}

                <MessageBubbleWrapper $isMe={message.isMe}>
                  <MessageRow $isMe={message.isMe}>
                    {!message.isMe &&
                      (message.showProfile ? (
                        <ProfileImage />
                      ) : (
                        <EmptyProfileSpace />
                      ))}

                    <MessageColumn>
                      {!message.isMe && message.showProfile && (
                        <SenderName>{expertInfo?.name || '상대방'}</SenderName>
                      )}

                      <BubbleRow
                        $isMe={message.isMe}
                        $timeDiff={message.showTime}
                      >
                        {!message.isMe && (
                          <>
                            <MessageBubble $isMe={message.isMe}>
                              {message.content}
                            </MessageBubble>

                            {message.showTime && (
                              <TimeText>
                                {formatTime(message.createdAt)}
                              </TimeText>
                            )}
                          </>
                        )}

                        {message.isMe && (
                          <>
                            {message.showTime && (
                              <TimeText>
                                {formatTime(message.createdAt)}
                              </TimeText>
                            )}

                            <MessageBubble $isMe={message.isMe}>
                              {message.content}
                            </MessageBubble>
                          </>
                        )}
                      </BubbleRow>
                    </MessageColumn>
                  </MessageRow>
                </MessageBubbleWrapper>
              </div>
            );
          })}

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

const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;

  overflow-y: auto;

  padding: 20px;
  padding-bottom: 0;

  background: #f5f7fb;
`;

const DateDivider = styled.div`
  display: flex;
  justify-content: center;

  margin: 20px 0 14px;

  span {
    padding: 6px 12px;
    border-radius: 50px;
    font-size: 12px;
    background: rgba(var(--color-lightgray) / 30%);
    color: #666;
  }
`;

const MessageBubbleWrapper = styled.div<{ $isMe: boolean }>`
  display: flex;
  justify-content: ${({ $isMe }) => ($isMe ? 'flex-end' : 'flex-start')};
  margin-top: 2px;
`;

const MessageRow = styled.div<{ $isMe: boolean }>`
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 8px;

  flex-direction: ${({ $isMe }) => ($isMe ? 'row-reverse' : 'row')};
`;

const MessageColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const BubbleRow = styled.div<{ $isMe: boolean; $timeDiff: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 4px;

  flex-direction: ${({ $isMe }) => ($isMe ? 'row' : 'row')};
  margin-bottom: ${({ $timeDiff }) => ($timeDiff ? '12px' : '')};
`;

const SenderName = styled.span`
  font-size: 12px;

  color: #666;

  margin-bottom: 4px;
  margin-left: 4px;
`;

const TimeText = styled.small`
  font-size: 11px;

  color: rgba(var(--color-darkgray));

  margin-bottom: 4px;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background-color: rgba(var(--color-lightgray));
`;

const EmptyProfileSpace = styled.div`
  width: 40px;
`;

const MessageBubble = styled.div<{ $isMe: boolean }>`
  max-width: 340px;
  padding: 12px;
  border-radius: 12px;

  line-height: 1.4;
  word-break: break-word;

  background-color: ${({ $isMe }) =>
    $isMe ? 'rgba(var(--color-primary))' : '#f2f2f2'};
  color: ${({ $isMe }) => ($isMe ? '#fff' : '#000')};

  border-bottom-left-radius: ${({ $isMe }) => ($isMe ? '12px' : '4px')};
  border-bottom-right-radius: ${({ $isMe }) => ($isMe ? '4px' : '12px')};
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
    color: #777;
  }
`;

const EmptyText = styled.p`
  color: #888;
`;

const InputArea = styled.div`
  padding: 12px;

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
