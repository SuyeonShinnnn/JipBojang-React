import styled from 'styled-components';

interface MessageListProps {
  message: any;
}

const MessageList = ({ message }: MessageListProps) => {
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

  return (
    <>
      <div key={message.messageId}>
        {message.showDateDivider && (
          <DateDivider>
            <span>{formatDate(message.createdAt)}</span>
          </DateDivider>
        )}

        <MessageBubbleWrapper $isMe={message.isMe}>
          <MessageRow $isMe={message.isMe}>
            {!message.isMe &&
              (message.showProfile ? <ProfileImage /> : <EmptyProfileSpace />)}

            <MessageColumn>
              {/* {!message.isMe && message.showProfile && (
                <SenderName>{'' || '상대방'}</SenderName>
              )} */}

              <BubbleRow $isMe={message.isMe} $timeDiff={message.showTime}>
                {!message.isMe && (
                  <>
                    <MessageBubble $isMe={message.isMe}>
                      {message.content}
                    </MessageBubble>

                    {message.showTime && (
                      <TimeText>{formatTime(message.createdAt)}</TimeText>
                    )}
                  </>
                )}

                {message.isMe && (
                  <>
                    {message.showTime && (
                      <TimeText>{formatTime(message.createdAt)}</TimeText>
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
    </>
  );
};

export default MessageList;

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
