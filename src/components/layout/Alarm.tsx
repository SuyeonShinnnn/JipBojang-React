import React, { useRef, useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNotificationStore } from '../../stores/notiStore';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from '../../assets/icon/BellIcon';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/auth';
import { getNoitificationHistory } from '../../apis/notiApi';
import type { Notification } from '../../types/notification';

const Alarm: React.FC = React.memo(() => {
  const auth = useAuthStore();
  const userId = Number(auth.user.userId);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const prevLength = useRef(0);
  const [hasNew, setHasNew] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const notifications = useNotificationStore((state) => state.notifications);

  const handleClick = (id: number) => {
    navigate('/notify', { state: { targetPropertyId: id } });
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (notifications.length > prevLength.current) {
      setHasNew(true);
      setShowAlert(true);

      const timer = setTimeout(
        () => {
          setShowAlert(false);
        },
        1000 * 60 * 5,
      );

      return () => clearTimeout(timer);
    }

    prevLength.current = notifications.length;
  }, [notifications.length]);

  const alertTimeFormat = (dateString: string) => {
    const date = new Date(dateString.replace(' ', 'T'));
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    if (diffMs < hour) {
      const minutes = Math.floor(diffMs / minute);

      return minutes <= 0 ? '방금 전' : `${minutes}분 전`;
    }

    if (diffMs < day) {
      const hours = Math.floor(diffMs / hour);
      return `${hours}시간 전`;
    }

    if (diffMs < month) {
      const days = Math.floor(diffMs / day);
      return `${days}일 전`;
    }

    if (diffMs < month * 12) {
      const months = Math.floor(diffMs / month);
      return `${months}달 전`;
    }

    const year = date.getFullYear();
    const monthText = String(date.getMonth() + 1).padStart(2, '0');
    const dayText = String(date.getDate()).padStart(2, '0');

    return `${year}년 ${monthText}월 ${dayText}일`;
  };

  const { data = [] } = useQuery<Notification[]>({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      const res = await getNoitificationHistory(userId);
      return res.data;
    },
  });

  const mergedNotifications = [...notifications, ...data].filter(
    (item, index, self) => index === self.findIndex((n) => n.id === item.id),
  );

  return (
    <Wrapper ref={ref}>
      <IconWrapper>
        <BellIcon
          onClick={() => {
            setOpen((prev) => !prev);
            setHasNew(false);
            setShowAlert(false);
          }}
        />
        {hasNew && <Dot />}
        <AlertBox $show={showAlert}>🔔 등기변동 알림</AlertBox>
      </IconWrapper>

      <Box $open={open}>
        {mergedNotifications.length === 0 ? (
          <p>알림 없음</p>
        ) : (
          <AlarmList>
            {mergedNotifications.map((item) => (
              <li
                key={item.id}
                onClick={() => handleClick(item.targetPropertyRegistId)}
              >
                <strong>{item.title}</strong>
                <span>{item.content}</span>
                <small>{alertTimeFormat(item.sendTime)}</small>
              </li>
            ))}
          </AlarmList>
        )}
      </Box>
    </Wrapper>
  );
});

export default Alarm;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.5rem;

  position: relative;

  svg {
    &:hover {
      cursor: pointer;
      color: rgb(var(--color-accent));
    }
  }
`;

const Box = styled.div<{ $open: boolean }>`
  background-color: #fff;
  max-width: 420px;
  min-width: 320px;
  min-height: 120px;
  border-radius: 12px;
  box-shadow: 4px 4px 20px rgb(var(--color-lightgray));
  font-size: 16px;

  position: absolute;
  top: 120%;
  right: 10%;
  z-index: 1200;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-12px)')};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};

  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0.25s ease;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    transition:
      transform 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: rgb(var(--color-accent));
    }
  }
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  background-color: #e20202;
  border-radius: 50px;

  position: absolute;
  top: 0;
  right: -15%;
`;

const float = keyframes`
  0% { transform: translate(-50%, 0px); }
  50% { transform: translate(-50%, 3px); }
  100% { transform: translate(-50%, 0px); }
`;

const AlertBox = styled.div<{ $show: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;

  ${({ $show }) =>
    $show
      ? css`
          animation: ${float} 2s ease-in-out infinite;
          opacity: 1;
        `
      : css`
          animation: none;
          transform: translate(-50%, 10px);
          opacity: 0;
        `}

  transition: opacity 0.3s ease;

  font-size: 14px;
  width: 120px;
  padding: 6px 10px;
  border-radius: 8px;

  background-color: rgba(var(--color-accent) / 80%);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);

  pointer-events: none;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;

    top: -6px;
    left: 50%;
    transform: translateX(-50%);

    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid rgba(var(--color-accent) / 80%);
  }
`;

const AlarmList = styled.ul`
  max-height: 50vh;
  overflow-y: scroll;

  strong {
    color: rgba(var(--color-primary-dark));
  }
  li {
    padding: 12px 8px 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &:hover {
      cursor: pointer;
      background-color: rgb(var(--color-lightgray) / 30%);
    }
  }

  span {
    font-size: 14px;
  }

  small {
    color: rgba(var(--color-darkgray));
  }
`;
