import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNotificationStore } from '../../stores/notiStore';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from '../../assets/icon/BellIcon';

const Alarm: React.FC = React.memo(() => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  return (
    <Wrapper ref={ref}>
      <BellIcon onClick={() => setOpen((prev) => !prev)} />

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
