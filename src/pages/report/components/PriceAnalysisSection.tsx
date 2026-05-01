import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { useReportStore } from '../../../stores/reportStore';
import { Title } from '../../../style/reportCommon';

// ✅ 타입 정의
interface PriceData {
  amount: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

interface PriceHistoryItem {
  fullDate: string;
  deposit: number;
}

const PriceAnalysisSection = () => {
  const { reportId, report, priceResult, fetchPrice } = useReportStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [chartData, setChartData] = useState<PriceHistoryItem[]>([]);

  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 금액 차이
  const diffFromMin = useMemo(() => {
    return priceData ? priceData.amount - priceData.minPrice : 0;
  }, [priceData]);

  const diffFromMax = useMemo(() => {
    return priceData ? priceData.amount - priceData.maxPrice : 0;
  }, [priceData]);

  const diffFromAvg = useMemo(() => {
    return priceData ? priceData.amount - priceData.avgPrice : 0;
  }, [priceData]);

  // 금액 포맷
  const formatMoney = (val: number | string | undefined) => {
    const num = Number(val);
    if (!num || isNaN(num)) return '금액 정보 없음';

    const 원단위 = num * 10000;
    const 조 = Math.floor(원단위 / 1000000000000);
    const 억 = Math.floor((원단위 % 1000000000000) / 100000000);
    const 만 = Math.floor((원단위 % 100000000) / 10000);

    const numberWithCommas = (x: number) =>
      x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let result = '';
    if (조) result += `${numberWithCommas(조)}조 `;
    if (억) result += `${numberWithCommas(억)}억 `;
    if (만) result += `${numberWithCommas(만)}만원`;

    return result.trim() || '0만원';
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (!reportId) {
        setError('리포트 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        await fetchPrice(Number(reportId));

        if (report) {
          setPriceData(report as PriceData);
        }

        setChartData(priceResult?.priceHistory ?? []);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [reportId]);

  // 차트 렌더링
  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return;

    // 기존 차트 제거
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
            borderColor: '#6a5bff',
            backgroundColor: 'rgba(106, 91, 255, 0.2)',
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

      {loading && <CenterText>로딩 중...</CenterText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && !priceData && (
        <ErrorText>시세 데이터가 없습니다.</ErrorText>
      )}

      {!loading && priceData && (
        <>
          <SubTitle>• 해당 매물 시세 정보</SubTitle>
          <Card>
            <h3>나의 전세 금액: {formatMoney(priceData.amount)}</h3>
          </Card>

          <SubTitle>• 시세 추이</SubTitle>
          <Card>
            <Canvas ref={canvasRef} />
          </Card>

          <SmallText>
            * 해당 매물의 동일한 형태(㎡)에 대한 분석입니다.
          </SmallText>

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
  border-radius: 8px;
  padding: 20px;
  text-align: center;
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
  background-color: ${({ $red }) =>
    $red ? 'rgba(185,0,0,0.65)' : 'rgba(0,128,0,0.65)'};
`;

const CenterText = styled.div`
  text-align: center;
  color: #777;
`;

const ErrorText = styled.div`
  color: red;
`;

const SmallText = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 10px;
`;
