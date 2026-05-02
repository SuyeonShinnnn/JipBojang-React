import styled from 'styled-components';
import LoadingSpinner from '../../../components/common/LoadingSpanner';
import {
  fetchCautionByOwnerName,
  fetchRightAnalysisResult,
} from '../../../apis/reportApi';
import { useAuthStore } from '../../../stores/auth';
import { useReportStore } from '../../../stores/reportStore';
import { useQuery } from '@tanstack/react-query';
import { formatMoney } from '../../../utils/format';
import { Title } from '../../../style/reportCommon';

const RightAnalysisSection = () => {
  const store = useReportStore();
  const auth = useAuthStore();

  const reportId = Number(store.reportId);
  const userId = auth.user?.userId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['rightAnalysis', reportId, userId],
    queryFn: async () => {
      if (!reportId || isNaN(reportId)) {
        throw new Error('invalid reportId');
      }

      const res = await fetchRightAnalysisResult(reportId, Number(userId));
      let report: any = res.data;

      let isOwnerInDelinquentList = false;

      if (report.ownerName) {
        const delinquentRes = await fetchCautionByOwnerName(report.ownerName);
        isOwnerInDelinquentList = delinquentRes.data.cautious;
      }

      if (!report.gapgu && report.gapItem) {
        report.gapgu = [
          {
            rightType: report.gapItem,
            details: report.gapMainInfo,
            date: report.gapDate,
          },
        ];
      }

      if (!report.eulgu && report.eulItem) {
        report.eulgu = [
          {
            rightType: report.eulItem,
            details: report.eulMainInfo,
            date: report.eulDate,
          },
        ];
      }

      return {
        report,
        isOwnerInDelinquentList,
      };
    },
    enabled: !!reportId && !!userId,
  });

  if (isLoading) {
    return (
      <CenterBox>
        <LoadingSpinner />
        <p>분석 데이터를 불러오는 중...</p>
      </CenterBox>
    );
  }

  if (isError || !data) {
    return <ErrorBox>조회 실패</ErrorBox>;
  }

  const { report, isOwnerInDelinquentList } = data;

  return (
    <>
      <Title>권리 분석</Title>

      {/* 기본 정보 */}
      <Card>
        <CardTitle>기본 정보</CardTitle>

        <InfoItem>
          <Label>근저당 여부</Label>
          <Value $danger={report.hasCollateral}>
            {report.hasCollateral ? '있음' : '없음'}
          </Value>
        </InfoItem>

        <InfoItem>
          <Label>선순위채권</Label>
          <Value>{formatMoney(report.priorClaim)}</Value>
        </InfoItem>

        <InfoItem>
          <Label>전세권 여부</Label>
          <Value>{report.hasLeaseRight ? '있음' : '없음'}</Value>
        </InfoItem>

        <InfoItem>
          <Label>등기사항</Label>
          <Value>{report.registrationDetails || '-'}</Value>
        </InfoItem>
      </Card>

      {/* 소유자 */}
      <Card>
        <CardTitle>소유자 정보</CardTitle>

        <InfoItem>
          <Label>소유자명</Label>
          <Value>{report.ownerName || '-'}</Value>
        </InfoItem>

        {isOwnerInDelinquentList && (
          <WarningBox>
            ⚠️ {report.ownerName}님은 상습채무자 명단에 있습니다.
          </WarningBox>
        )}
      </Card>

      {/* 갑구 */}
      <Card>
        <CardTitle>갑구</CardTitle>

        {report.gapgu?.length ? (
          report.gapgu.map((item: any, idx: number) => (
            <InfoItem key={idx}>
              <Label>{item.entry || item.rightType}</Label>
              <Value>{item.date || '-'}</Value>
            </InfoItem>
          ))
        ) : (
          <EmptyText>갑구 정보 없음</EmptyText>
        )}
      </Card>

      {/* 을구 */}
      <Card>
        <CardTitle>을구</CardTitle>

        {report.eulgu?.length ? (
          report.eulgu.map((item: any, idx: number) => (
            <InfoItem key={idx}>
              <Label>{item.entry || item.rightType}</Label>
              <Value>{item.date || '-'}</Value>
            </InfoItem>
          ))
        ) : (
          <EmptyText>을구 정보 없음</EmptyText>
        )}
      </Card>
    </>
  );
};

export default RightAnalysisSection;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 8px;
  border: 1px solid rgba(var(--color-lightgray));
`;

const CardTitle = styled.h4`
  margin-bottom: 12px;
  font-weight: 600;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span<{ $danger?: boolean }>`
  font-weight: 500;
  color: ${({ $danger }) => ($danger ? '#c62828' : '#2e7d32')};
`;

const WarningBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #fff3cd;
  border-radius: 8px;
  color: #856404;
`;

const EmptyText = styled.div`
  color: #aaa;
`;

const ErrorBox = styled.div`
  padding: 20px;
  color: red;
`;

const CenterBox = styled.div`
  text-align: center;
  padding: 40px;
`;
