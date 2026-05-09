import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
}

const Skeleton = styled.div<SkeletonProps>`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '16px' }) => height};
  border-radius: ${({ radius = '8px' }) => radius};
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export default Skeleton;
