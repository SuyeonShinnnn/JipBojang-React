import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface GaugeChart {
  reportScore: number;
}

const GaugeChart = ({ reportScore }: GaugeChart) => {
  const mock = {
    score: reportScore,
    maxScore: 100,
  };

  const progress = (mock.score / mock.maxScore) * 100;

  const circumference = 440;
  const finalOffset = circumference - (progress / 100) * circumference;

  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOffset(finalOffset);
    }, 500);

    return () => clearTimeout(timer);
  }, [finalOffset]);

  return (
    <Card>
      <GaugeWrap>
        <Svg viewBox="0 0 320 200">
          <path
            d="M40 160 A120 120 0 0 1 280 160"
            stroke="#e7e7e7"
            strokeWidth="34"
            fill="none"
          />

          <ProgressArc
            d="M40 160 A120 120 0 0 1 280 160"
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
          />

          <text x="35" y="180">
            0
          </text>
          <text x="295" y="180" textAnchor="end">
            100
          </text>
        </Svg>

        <ScoreTitle>내 집포트 점수는</ScoreTitle>
        <ScoreNumber>{mock.score}점</ScoreNumber>
      </GaugeWrap>
    </Card>
  );
};

export default GaugeChart;

const Card = styled.section`
  width: 420px;
  margin: auto;

  background: #fff;
  border-radius: 28px;

  padding: 32px 28px;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

  text-align: center;
`;

const GaugeWrap = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const Svg = styled.svg`
  width: 100%;
  height: auto;
`;

const ProgressArc = styled.path`
  stroke: #efd64b;
  stroke-width: 34;
  fill: none;

  stroke-linecap: butt;

  transition: stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1);
`;

const ScoreTitle = styled.div`
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  font-weight: 700;
`;

const ScoreNumber = styled.div`
  position: absolute;

  left: 50%;
  top: 70%;

  transform: translate(-50%, -50%);

  font-size: 52px;
  font-weight: 800;
`;
