import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: string;
  borderWidth?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = '40px',
  borderWidth = '4px',
}) => {
  return <Spinner $size={size} $borderWidth={borderWidth} />;
};

export default LoadingSpinner;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ $size: string; $borderWidth: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border: ${({ $borderWidth }) => $borderWidth} solid #f3f3f3;
  border-top: ${({ $borderWidth }) => $borderWidth} solid #5a56f6;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  box-sizing: border-box;
`;
