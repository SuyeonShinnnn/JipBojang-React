import styled from 'styled-components';
import { useReportStore } from '../../../stores/reportStore';
import { formatMoney } from '../../../utils/format';
import { SubTitle, Title } from '../../../style/reportCommon';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FiXCircle } from 'react-icons/fi';
import { useAuthStore } from '../../../stores/auth';
import { useEffect, useMemo } from 'react';

const FraudAnalysisSection = () => {
  const store = useReportStore();
  const auth = useAuthStore();

  const reportId = Number(store.reportId);
  const userId = Number(auth.user?.userId);

  const report = store.report;
  const analysisResult = store.fraudResult;
  const certificate = store.certificate;

  useEffect(() => {
    if (!reportId || !userId) return;

    store.fetchReport(reportId);
    store.fetchFraud(reportId, userId);
  }, [reportId, userId]);

  const collateralLimit = 0.9;

  const housePriceLimit = useMemo(() => {
    return Math.floor((report?.avgPrice || 0) * collateralLimit);
  }, [report?.avgPrice]);

  const total = useMemo(() => {
    return (report?.amount || 0) + (analysisResult?.priorClaim || 0);
  }, [report?.amount, analysisResult?.priorClaim]);

  const conditions = useMemo(() => {
    const amount = Number(report?.amount || 0);
    const prior = Number(analysisResult?.priorClaim || 0);
    const avgPrice = Number(report?.avgPrice || 0);

    const total = amount + prior;
    const limit90 = avgPrice * 0.9;
    const limit60 = avgPrice * 0.6;

    return [
      {
        label: '전세보증금과 선순위채권 합계 ≤ 주택가격 × 90%',
        valid: total <= limit90,
        value: `${formatMoney(total)} / ${formatMoney(limit90)}`,
      },
      {
        label: '선순위채권 ≤ 주택가격 × 60%',
        valid: prior <= limit60,
        value: `${formatMoney(prior)} / ${formatMoney(limit60)}`,
      },
      {
        label: '전세보증금 수도권 7억 이하, 지방 5억 이하',
        valid: amount <= 70000,
        value: `${formatMoney(amount)}`,
      },
      {
        label: '권리침해사항',
        valid: true,
        value: '-',
      },
    ];
  }, [report, analysisResult]);

  const valueBoxes = useMemo(
    () => [
      { label: '전세보증금', value: report?.amount || 0 },
      { label: '주택가격', value: report?.avgPrice || 0 },
      { label: '선순위채권', value: analysisResult?.priorClaim || 0 },
      { label: '담보인정금액', value: housePriceLimit },
    ],
    [report, analysisResult, housePriceLimit],
  );

  const riskItems = useMemo(
    () => [
      { label: '압류 여부', value: certificate?.isSeized },
      { label: '가압류 여부', value: certificate?.isProvisionallySeized },
      { label: '가처분 여부', value: certificate?.isInjunction },
      { label: '전세권 설정 여부', value: certificate?.hasLeaseRight },
      { label: '불법건축물 여부', value: certificate?.isIllegalBuilding },
      { label: '신탁매각 가능 여부', value: certificate?.isTrustSalePossible },
    ],
    [report, analysisResult],
  );

  return (
    <>
      <Title>전세 사기 분석</Title>

      <Container>
        <Grid>
          <InfoCard>
            나의 전세 금액
            <strong>{formatMoney(report?.amount)}</strong>
          </InfoCard>

          <InfoCard>
            <Row>
              <Label>집주인</Label>
              <span>{analysisResult?.ownerName}</span>
            </Row>
            <Row>
              <Label>선순위채권</Label>
              <strong>{formatMoney(analysisResult?.priorClaim)}</strong>
            </Row>
          </InfoCard>
        </Grid>

        <article>
          <SubTitle>적정 전세 금액</SubTitle>
          <HugGuide>
            <HugHeader>
              <span>HUG 전세보증보험 기준</span>
            </HugHeader>

            <HugDesc>
              전세보증금과 선순위채권의 합이 주택가격의 90% 이하여야 합니다.
            </HugDesc>

            <HugFormula>
              <strong>
                전세보증금 + 선순위채권 <span> ≤ </span> 주택가격 × 90%
              </strong>
            </HugFormula>
          </HugGuide>

          <Grid>
            {valueBoxes.map((item, i) => (
              <Box key={i}>
                <div>{item.label}</div>
                <Amount>{formatMoney(item.value)}</Amount>
              </Box>
            ))}
            <ResultBox danger>
              <div>전세보증금 + 선순위채권</div>
              <AmountDanger>{formatMoney(total)}</AmountDanger>
            </ResultBox>

            <ResultBox>
              <div>주택가격 × 90%</div>
              <AmountSafe>
                {formatMoney((report?.avgPrice ?? 0) * collateralLimit)}
              </AmountSafe>
            </ResultBox>
          </Grid>
        </article>

        <article>
          <SubTitle>기타 위험 요인</SubTitle>
          <ConditionWrapper>
            {conditions.map((item, i) => (
              <Condition key={i} $valid={item.valid}>
                <strong>{item.label}</strong>
                <ConditionResult $valid={item.valid}>
                  {item.valid ? (
                    <>
                      <FaRegCircleCheck />
                      적합
                    </>
                  ) : (
                    <>
                      <FiXCircle />
                      부적합
                    </>
                  )}
                </ConditionResult>
              </Condition>
            ))}
          </ConditionWrapper>
        </article>

        <article>
          <SubTitle>LTV 및 위험 요인</SubTitle>
          <ChipWrap>
            {riskItems.map((item) => (
              <Chip key={item.label} $danger={!!item.value}>
                {item.value ? <FaRegCircleCheck /> : <FiXCircle />}
                {item.label}
              </Chip>
            ))}
          </ChipWrap>
        </article>
      </Container>
    </>
  );
};

export default FraudAnalysisSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const InfoCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(var(--color-lightgray));

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const HugGuide = styled.div`
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 12px;

  background: #f8f9ff;
  border: 1px solid #e0e3ff;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HugHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 600;
`;

const HugDesc = styled.div`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
`;

const HugFormula = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 10px;
  border-radius: 8px;

  background: #fff;
  border: 1px dashed #c7d2fe;

  font-size: 0.9rem;

  span {
    color: rgba(var(--color-primary));
    font-size: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  strong {
    color: rgba(var(--color-primary-dark));
  }
`;

const Label = styled.span`
  color: #666;
`;

const Box = styled.div`
  display: grid;
  gap: 8px;
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(var(--color-lightgray));
  text-align: center;
`;

const ResultBox = styled(Box)<{ danger?: boolean }>`
  border: ${(p) => (p.danger ? '1px solid #ff6b6b' : '1px solid #2ecc71')};
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

const ConditionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 12px;
`;

const Condition = styled.div<{ $valid: boolean }>`
  display: grid;
  gap: 8px;

  text-align: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ $valid }) => ($valid ? '#B7E4C7' : '#FFCCC7')};

  background: ${({ $valid }) => ($valid ? '#E6F7EF' : '#FFF1F0')};
`;

const ConditionResult = styled.span<{ $valid: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${({ $valid }) => ($valid ? '#2E7D32' : '#C62828')};
`;

const ChipWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled.div<{ $danger: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid ${({ $danger }) => ($danger ? '#B7E4C7' : '#FFCCC7')};
  background: ${({ $danger }) => ($danger ? '#E6F7EF' : '#FFF1F0')};

  svg {
    color: ${({ $danger }) => ($danger ? '#2E7D32' : '#C62828')};
  }
`;
