import React, { useRef, useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNotificationStore } from '../../stores/notiStore';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from '../../assets/icon/BellIcon';

const Alarm: React.FC = React.memo(() => {
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
        {notifications.length === 0 ? (
          <p>알림 없음</p>
        ) : (
          <AlarmList>
            {notifications.map((n) => (
              <li key={n.id} onClick={() => handleClick(n.id)}>
                🚨 {n.title} - {n.purpose}
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
  top: 80%;
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
  color: rgb(var(--color-darkgray));
  h5 {
    padding: 12px 0 8px 8px;
    font-size: 16px;
    font-weight: 500;
  }
  li {
    padding: 12px 8px 12px 8px;
    &:hover {
      cursor: pointer;
      background-color: rgb(var(--color-lightgray) / 30%);
    }
  }
`;
