import styled from 'styled-components';
import LoadingSpinner from '../../../components/common/LoadingSpanner';
import { useReportStore } from '../../../stores/reportStore';
import {
  fetchCautionByOwnerName,
  fetchRightAnalysisResult,
} from '../../../apis/reportApi';
import { useAuthStore } from '../../../stores/auth';
import { useQuery } from '@tanstack/react-query';
import { formatMoney } from '../../../utils/format';

interface GapguItem {
  entry?: string;
  rightType?: string;
  date?: string;
}

interface EulguItem {
  entry?: string;
  rightType?: string;
  date?: string;
}

interface Report {
  hasCollateral?: number;
  priorClaim?: number;
  ownerName?: string;
  gapgu?: GapguItem[];
  eulgu?: EulguItem[];
}

const RightAnalysisSection = () => {
  const store = useReportStore();
  const auth = useAuthStore();

  const reportId = Number(store.reportId);
  const userId = auth.user?.userId;

  const {
    data: report,
    isLoading,
    isError,
  } = useQuery<Report>({
    queryKey: ['rightAnalysis', reportId, userId],
    queryFn: async () => {
      if (!reportId || isNaN(reportId)) {
        throw new Error('invalid reportId');
      }

      const res = await fetchRightAnalysisResult(reportId, Number(userId));

      return res.data;
    },
    enabled: !!reportId && !!userId,
  });

  const { data: isOwnerInDelinquentList } = useQuery<boolean>({
    queryKey: ['ownerCaution', report?.ownerName],
    queryFn: async () => {
      if (!report?.ownerName) return false;

      const res = await fetchCautionByOwnerName(report.ownerName);
      return res.data.cautious;
    },
    enabled: !!report?.ownerName,
  });


  if (isLoading) {
    return (
      <CenterBox>
        <LoadingSpinner />
        <p>분석 데이터를 불러오는 중...</p>
      </CenterBox>
    );
  }

  if (isError || !report) {
    return <ErrorBox>조회 실패</ErrorBox>;
  }

  return (
    <Wrapper>
      <Title>🔐 권리 분석</Title>
      <SubText>이 집이 안전한지 분석했습니다.</SubText>

      {/* 기본 정보 */}
      <Card>
        <CardTitle>기본 정보</CardTitle>

        <InfoItem>
          <Label>근저당 여부</Label>
          <Value $danger={report.hasCollateral === 1}>
            {report.hasCollateral === 1 ? '있음' : '없음'}
          </Value>
        </InfoItem>

        <InfoItem>
          <Label>선순위채권</Label>
          <Value>{formatMoney(report.priorClaim)}</Value>
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
          report.gapgu.map((item, idx) => (
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
          report.eulgu.map((item, idx) => (
            <InfoItem key={idx}>
              <Label>{item.entry || item.rightType}</Label>
              <Value>{item.date || '-'}</Value>
            </InfoItem>
          ))
        ) : (
          <EmptyText>을구 정보 없음</EmptyText>
        )}
      </Card>
    </Wrapper>
  );
};

export default RightAnalysisSection;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-weight: 600;
  color: #6a5bff;
`;

const SubText = styled.p`
  color: #888;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  color: ${(props) => (props.$danger ? '#e74c3c' : '#2ecc71')};
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
