import styled from 'styled-components';
import GaugeChart from './GaugeChart';
import { useReportStore } from '../../../stores/reportStore';

const ScoreSection = () => {
  const { report } = useReportStore();

  const riskFields = [
    { name: '가격', reasons: report.priceComment ? [report.priceComment] : [] },
    {
      name: '권리',
      reasons: report.rightsComment ? [report.rightsComment] : [],
    },
    {
      name: '전세 사기',
      reasons: report.fraudComment ? [report.fraudComment] : [],
    },
  ];

  return (
    <Section>
      <Title>안심 점수</Title>

      <Card>
        <ChartBox>
          <GaugeChart reportScore={52} />
        </ChartBox>

        <RiskPanel>
          {riskFields.map((field) => (
            <RiskBlock key={field.name}>
              <strong>✔️ {field.name}</strong>

              <SegmentWrapper>
                {field.reasons.length > 0 ? (
                  field.reasons.map((item) => (
                    <Segmented key={item}>{item}</Segmented>
                  ))
                ) : (
                  <EmptySegment>확인된 특이사항 없음</EmptySegment>
                )}
              </SegmentWrapper>
            </RiskBlock>
          ))}
        </RiskPanel>
      </Card>
    </Section>
  );
};

export default ScoreSection;

const Section = styled.section`
  width: min(92vw, 680px);
  margin-top: 28px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 14px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid var(--color-lightgray);
  border-radius: 20px;
  padding: 24px;

  display: flex;
  gap: 28px;

  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChartBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RiskPanel = styled.article`
  flex: 1;
  display: grid;
  gap: 18px;
`;

const RiskBlock = styled.div`
  display: grid;
  gap: 8px;
`;

const SegmentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Segmented = styled.div`
  padding: 8px 14px;
  border-radius: 999px;

  background: rgba(78, 109, 255, 0.08);
  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;
`;

const EmptySegment = styled.div`
  color: var(--color-darkgray);
  font-weight: 500;
`;
