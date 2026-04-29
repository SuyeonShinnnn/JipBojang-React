import styled from 'styled-components';
import { useReportStore } from '../../../stores/reportStore';

const OverviewSection = () => {
  const { report } = useReportStore();

  return (
    <Section>
      <Title>개요</Title>

      <Card>
        <Row>
          <Label>주소</Label>
          <Value>{report.address}</Value>
        </Row>

        <Row>
          <Label>거래 유형</Label>
          <Value>{report.type}</Value>
        </Row>

        <Row>
          <Label>보증금</Label>
          <Value>{report.amount}</Value>
        </Row>
      </Card>
    </Section>
  );
};

export default OverviewSection;

const Section = styled.section`
  width: min(92vw, 680px);
  margin-top: 32px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 14px;
`;

const Card = styled.dl`
  background: #fff;
  border: 1px solid var(--color-lightgray);
  border-radius: 20px;
  padding: 24px;
  display: grid;
  gap: 18px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.05);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
`;

const Label = styled.dt`
  font-weight: 600;
  color: #666;
`;

const Value = styled.dd`
  margin: 0;
  text-align: right;
  font-weight: 600;
`;
