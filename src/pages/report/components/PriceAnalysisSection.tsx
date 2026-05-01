import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { useQuery } from '@tanstack/react-query';
import { Title } from '../../../style/reportCommon';
import { formatMoney } from '../../../utils/format';
import { useReportStore } from '../../../stores/reportStore';
// import errorCharacter from '../../../assets/common'

interface PriceData {
  amount: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  priceHistory?: PriceHistoryItem[];
}

interface PriceHistoryItem {
  fullDate: string;
  deposit: number;
}

const PriceAnalysisSection = () => {
  const store = useReportStore();
  const reportId = Number(store.reportId);

  const { data, isLoading, isError } = useQuery<PriceData>({
    queryKey: ['priceAnalysis', reportId],
    queryFn: async () => {
      if (!reportId) throw new Error('리포트 ID 없음');
      const res = await store.fetchPrice(reportId);
      return res.data;
    },
    enabled: !!reportId,
  });

  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const priceData = data;
  const chartData = data?.priceHistory ?? [];

  const diffFromMin = useMemo(() => {
    return priceData ? priceData.amount - priceData.minPrice : 0;
  }, [priceData]);

  const diffFromMax = useMemo(() => {
    return priceData ? priceData.amount - priceData.maxPrice : 0;
  }, [priceData]);

  const diffFromAvg = useMemo(() => {
    return priceData ? priceData.amount - priceData.avgPrice : 0;
  }, [priceData]);

  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = chartData.map((item) => {
      const d = item.fullDate;
      return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
    });

    const deposits = chartData.map((item) => item.deposit);

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '전세가 시세 추이',
            data: deposits,
            borderColor: 'var(--color-primary-dark)',
            backgroundColor: 'var(--color-accent)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [chartData]);

  return (
    <>
      <Title>가격 분석</Title>

      {isLoading && <StateBox>시세 데이터를 불러오는 중입니다...</StateBox>}

      {isError && (
        <StateBox $error>
          <img src="/" />
          데이터를 불러오지 못했습니다.
        </StateBox>
      )}

      {!isLoading && !isError && priceData && (
        <>
          <SubTitle>• 해당 매물 시세 정보</SubTitle>
          <Card>
            <h3>나의 전세 금액: {formatMoney(priceData.amount)}</h3>
          </Card>

          <SubTitle>• 시세 추이</SubTitle>
          <Card>
            <Canvas ref={canvasRef} />
          </Card>

          <SmallText>* 동일 면적 기준 시세 분석입니다.</SmallText>

          <PriceRow>
            <PriceBox>
              <b>호가 최저가</b>
              <div>{formatMoney(priceData.minPrice)}</div>
            </PriceBox>
            <PriceBox>
              <b>평균 실거래가</b>
              <div>{formatMoney(priceData.avgPrice)}</div>
            </PriceBox>
            <PriceBox>
              <b>호가 최대가</b>
              <div>{formatMoney(priceData.maxPrice)}</div>
            </PriceBox>
          </PriceRow>

          <SubTitle>• 내 매물 분석</SubTitle>
          <Analysis>
            <AnalysisBox $red={diffFromMin > 0}>
              {diffFromMin > 0 ? '+' : '-'}
              {formatMoney(Math.abs(diffFromMin))}
              <br />
              호가 최저가보다 <br />
              {diffFromMin > 0 ? '비쌉니다.' : '저렴합니다.'}
            </AnalysisBox>

            <AnalysisBox $red={diffFromAvg > 0}>
              {diffFromAvg > 0 ? '+' : '-'}
              {formatMoney(Math.abs(diffFromAvg))}
              <br />
              평균 실거래가보다 <br />
              {diffFromAvg > 0 ? '비쌉니다.' : '저렴합니다.'}
            </AnalysisBox>

            <AnalysisBox $red={diffFromMax > 0}>
              {diffFromMax > 0 ? '+' : '-'}
              {formatMoney(Math.abs(diffFromMax))}
              <br />
              호가 최고가보다 <br />
              {diffFromMax > 0 ? '비쌉니다.' : '저렴합니다.'}
            </AnalysisBox>
          </Analysis>
        </>
      )}
    </>
  );
};

export default PriceAnalysisSection;

const SubTitle = styled.div`
  font-weight: 600;
  margin: 20px 0 10px;
`;

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  background: #fff;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 300px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const PriceBox = styled.div`
  flex: 1;
  min-width: 150px;
  border: 1px solid #eee;
  padding: 16px;
  text-align: center;
  border-radius: 10px;
  background: #fff;
`;

const Analysis = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const AnalysisBox = styled.div<{ $red: boolean }>`
  flex: 1;
  min-width: 150px;
  padding: 16px;
  text-align: center;
  color: white;
  border-radius: 10px;
  background-color: ${({ $red }) =>
    $red ? 'rgba(185,0,0,0.7)' : 'rgba(0,128,0,0.7)'};
`;

const StateBox = styled.div<{ $error?: boolean }>`
  margin-top: 20px;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  background: ${({ $error }) => ($error ? '#fff0f0' : '#f4f6ff')};
  color: ${({ $error }) => ($error ? '#d32f2f' : '#555')};
  border: 1px solid ${({ $error }) => ($error ? '#ffcdd2' : '#e0e4ff')};
`;

const SmallText = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 10px;
`;
