import styled from 'styled-components';
import { useReportStore } from '../../../stores/reportStore';
import { Title } from '../../../style/reportCommon';

const OverviewSection = () => {
  const { report } = useReportStore();

  return (
    <>
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
    </>
  );
};

export default OverviewSection;

const Card = styled.dl`
  border: 1px solid var(--color-lightgray);
  border-radius: 20px;
  margin: 0;
  padding: 24px;
  display: grid;
  gap: 18px;
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
