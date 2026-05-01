import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useReportStore } from '../../../stores/reportStore';
import { formatMoney } from '../../../utils/format';
import { Title } from '../../../style/reportCommon';

interface Report {
  amount?: number;
  avgPrice?: number;
  isInjunction?: boolean;
  hasLeaseRight?: boolean;
  isIllegalBuilding?: boolean;
  isTrustSalePossible?: boolean;
}

interface FraudResult {
  ownerName?: string;
  priorClaim?: number;
  isSeized?: boolean;
  isProvisionallySeized?: boolean;
}

const FraudAnalysisSection = () => {
  const store = useReportStore();
  const reportId = Number(store.reportId);

  const { data: report } = useQuery<Report>({
    queryKey: ['report', reportId],
    queryFn: async () => {
      const res = await store.fetchReport(reportId);
      return res.data;
    },
    enabled: !!reportId,
  });

  const { data: analysisResult } = useQuery<FraudResult>({
    queryKey: ['fraud', reportId],
    queryFn: async () => {
      const res = await store.fetchFraud(reportId);
      return res.data;
    },
    enabled: !!reportId,
  });

  const collateralLimit = 0.9;

  const housePriceLimit = Math.floor((report?.avgPrice || 0) * collateralLimit);

  const total = (report?.amount || 0) + (analysisResult?.priorClaim || 0);

  const limit90 = (report?.avgPrice || 0) * 0.9;
  const limit60 = (report?.avgPrice || 0) * 0.6;

  const conditions = [
    {
      label: '전세보증금 + 선순위채권 ≤ 주택가격 × 90%',
      valid: total <= limit90,
      value: `${formatMoney(total)} / ${formatMoney(limit90)}`,
    },
    {
      label: '선순위채권 ≤ 주택가격 × 60%',
      valid: (analysisResult?.priorClaim || 0) <= limit60,
      value: `${formatMoney(analysisResult?.priorClaim)} / ${formatMoney(limit60)}`,
    },
    {
      label: '전세보증금 7억 이하',
      valid: (report?.amount || 0) <= 70000,
      value: formatMoney(report?.amount),
    },
  ];

  const valueBoxes = [
    { label: '전세보증금', value: report?.amount || 0 },
    { label: '주택가격', value: report?.avgPrice || 0 },
    { label: '선순위채권', value: analysisResult?.priorClaim || 0 },
    { label: '담보인정금액', value: housePriceLimit },
  ];

  const riskItems = [
    { label: '압류 여부', value: analysisResult?.isSeized },
    { label: '가압류 여부', value: analysisResult?.isProvisionallySeized },
    { label: '가처분 여부', value: report?.isInjunction },
    { label: '전세권 설정 여부', value: report?.hasLeaseRight },
    { label: '불법건축물 여부', value: report?.isIllegalBuilding },
    { label: '신탁매각 가능 여부', value: report?.isTrustSalePossible },
  ];

  return (
    <>
      <Title>전세 사기 분석</Title>

      {/* 내 전세금 */}
      <HighlightCard>
        나의 전세 금액:
        <Strong>{formatMoney(report?.amount)}</Strong>
      </HighlightCard>

      {/* 집주인 */}
      <InfoCard>
        <Row>
          <Label>집주인</Label>
          <Value>{analysisResult?.ownerName}</Value>
        </Row>
        <Row>
          <Label>선순위채권</Label>
          <ValuePrimary>{formatMoney(analysisResult?.priorClaim)}</ValuePrimary>
        </Row>
      </InfoCard>

      {/* 값 박스 */}
      <Grid>
        {valueBoxes.map((item, i) => (
          <Box key={i}>
            <BoxTitle>{item.label}</BoxTitle>
            <Amount>{formatMoney(item.value)}</Amount>
          </Box>
        ))}
      </Grid>

      {/* 비교 */}
      <Grid>
        <ResultBox danger>
          <BoxTitle>전세보증금 + 선순위채권</BoxTitle>
          <AmountDanger>{formatMoney(total)}</AmountDanger>
        </ResultBox>

        <ResultBox>
          <BoxTitle>주택가격 × 90%</BoxTitle>
          <AmountSafe>{formatMoney(limit90)}</AmountSafe>
        </ResultBox>
      </Grid>

      {/* 조건 */}
      <SectionTitle>기타 위험 요인</SectionTitle>

      {conditions.map((item, i) => (
        <Condition key={i} $valid={item.valid}>
          <span>{item.label}</span>
          <span>{item.valid ? '적합' : '부적합'}</span>
        </Condition>
      ))}

      {/* 리스크 */}
      <SectionTitle>LTV 및 위험 요인</SectionTitle>

      <ChipWrap>
        {riskItems.map((item) => (
          <Chip key={item.label} $danger={!!item.value}>
            {item.label}
          </Chip>
        ))}
      </ChipWrap>
    </>
  );
};

export default FraudAnalysisSection;

const SectionTitle = styled.h4`
  margin-top: 30px;
`;

const HighlightCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const Strong = styled.span`
  color: #6a5bff;
  font-weight: bold;
  margin-left: 6px;
`;

const InfoCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span``;

const ValuePrimary = styled.span`
  color: #6a5bff;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const Box = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-lightgray);
  text-align: center;
`;

const ResultBox = styled(Box)<{ danger?: boolean }>`
  margin-top: 12px;
  border: ${(p) => (p.danger ? '1px solid #ff6b6b' : '1px solid #2ecc71')};
`;

const BoxTitle = styled.div`
  font-size: 14px;
`;

const Amount = styled.div`
  font-weight: bold;
`;

const AmountDanger = styled(Amount)`
  color: red;
`;

const AmountSafe = styled(Amount)`
  color: green;
`;

const Condition = styled.div<{ $valid: boolean }>`
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid ${({ $valid }) => ($valid ? '#bfefff' : '#ffc9c9')};
  background: ${(p) => (p.$valid ? '#e6f7ff' : '#fff0f0')};
`;

const ChipWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled.div<{ $danger: boolean }>`
  padding: 6px 10px;
  border-radius: 10px;
  background: ${(p) => (p.$danger ? '#ffd6d6' : '#c8e6c9')};
`;
