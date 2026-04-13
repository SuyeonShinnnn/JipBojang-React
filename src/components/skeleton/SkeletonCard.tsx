import styled from 'styled-components';
import Skeleton from '../common/Skeleton';

const SkeletonCard = () => (
  <CardWrapper>
    <Skeleton height="20px" width="40%" />
    <Skeleton height="16px" width="100%" />
    <Skeleton height="16px" width="70%" />
  </CardWrapper>
);

export default SkeletonCard;

const CardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;

  border-radius: 16px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;
