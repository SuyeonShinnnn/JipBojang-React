import styled, { keyframes } from "styled-components";

const SkeletonCard = () => {
  return (
    <Card>
      <Title />
      <Text />
      <Text />
    </Card>
  );
};

export default SkeletonCard;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Card = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 10px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SkeletonBlock = styled.div`
  border-radius: 12px;
  background: linear-gradient(90deg, #f1f1f1 25%, #e0e0e0 37%, #f1f1f1 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 7s ease infinite;
`;

const Title = styled(SkeletonBlock)`
  width: 60%;
  height: 32px;
`;

const Text = styled(SkeletonBlock)`
  width: 100%;
  height: 14px;
`;
