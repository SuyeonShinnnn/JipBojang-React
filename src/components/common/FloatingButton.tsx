import type { ReactNode } from 'react';
import styled from 'styled-components';

interface FloatingButtonProps {
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const FloatingButton = ({ icon, className, onClick }: FloatingButtonProps) => {
  return (
    <Container onClick={onClick} className={className}>
      {icon}
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

  box-shadow:
    0 10px 30px rgba(97, 74, 226, 0.35),
    0 4px 12px rgba(169, 76, 255, 0.25);

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

  &:hover {
    transform: translateY(-2px) scale(1.03);

    box-shadow:
      0 16px 40px rgba(97, 74, 226, 0.4),
      0 8px 20px rgba(169, 76, 255, 0.3);
  }

  &:active {
    transform: scale(0.96);
  }
`;
