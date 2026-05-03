import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';
import { formatMoney } from '../../utils/format';

interface Props {
  labels: string[];
  deposits: number[];
  avgPrice: number;
  myPrice: number;
  primaryColor: string;
}

const PriceTrendChart = ({
  labels,
  deposits,
  avgPrice,
  myPrice,
  primaryColor,
}: Props) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    chartRef.current?.destroy();

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const avgLine = Array(labels.length).fill(avgPrice);
    const myLine = Array(labels.length).fill(myPrice);

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '시세 추이',
            data: deposits,
            borderColor: `rgb(${primaryColor})`,
            backgroundColor: `rgba(${primaryColor} / 0.15)`,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
          {
            label: '평균 실거래가',
            data: avgLine,
            borderDash: [6, 6],
            borderColor: '#9e9e9e',
            pointRadius: 0,
          },
          {
            label: '내 전세금',
            data: myLine,
            borderColor: '#ff9800',
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label}: ${formatMoney(ctx.parsed.y ?? 0)}`,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [labels, deposits, avgPrice, myPrice, primaryColor]);

  return <Canvas ref={canvasRef} />;
};

export default PriceTrendChart;

const Canvas = styled.canvas`
  width: 100%;
  height: 300px;
`;
