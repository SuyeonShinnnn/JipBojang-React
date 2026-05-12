import type { ReactNode } from 'react';
import styled from 'styled-components';

interface FloatingButtonProps {
  icon?: ReactNode;
  span?: string;
  className?: string;
  onClick?: () => void;
}

const FloatingButton = ({
  icon,
  span,
  className,
  onClick,
}: FloatingButtonProps) => {
  return (
    <Container onClick={onClick} className={className}>
      <i>{icon}</i>
      <span>{span}</span>
    </Container>
  );
};

export default FloatingButton;

const Container = styled.button`
  position: fixed;

  right: 2rem;
  bottom: 2rem;

  width: 64px;
  height: 64px;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #614ae2, #a94cff);

  box-shadow: 5px 5px 20px rgb(var(--color-mediumgray));

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  z-index: 999;

  svg,
  img {
    width: 28px;
    height: 28px;

    color: white;
  }

  span {
    color: white;
  }

  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 20px rgba(var(--color-mediumgray));
  }

  &:active {
    transform: scale(0.96);
  }
`;
