import styled from 'styled-components';
import Skeleton from '../common/Skeleton';

const SkeletonTimeline = () => (
  <Timeline>
    {[1, 2].map((item) => (
      <TimelineItem key={item}>
        <ChangedCard>
          <Skeleton width="100px" height="14px" />
          <div style={{ marginTop: '8px' }}>
            <Skeleton width="70%" height="18px" />
          </div>
        </ChangedCard>
      </TimelineItem>
    ))}
  </Timeline>
);

export default SkeletonTimeline;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: #d9d9d9;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const ChangedCard = styled.div`
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #ececec;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;
