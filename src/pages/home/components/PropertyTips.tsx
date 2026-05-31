import React from 'react';
import styled from 'styled-components';

interface TipItem {
  id: number;
  tag: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const PropertyTips: React.FC = () => {
  const tipsData: TipItem[] = [
    {
      id: 1,
      tag: '필독',
      title: '사회초년생 전세계약 전 무조건 확인해야 할 서류 3가지',
      description:
        '등기부등본만 보면 끝이 아닙니다. 건축물대장과 국세 완납증명서까지 꼼꼼하게 확인하는 법을 알려드려요.',
      date: '2026.05.28',
      readTime: '3분 분량',
    },
    {
      id: 2,
      tag: '보증보험',
      title: 'HUG 전세보증보험 가입 조건과 신청 방법 총정리',
      description:
        '내 보증금을 지키는 가장 확실한 방법! 2026년 변경된 가입 기준과 전세가율 계산법을 쉽게 풀어냅니다.',
      date: '2026.05.25',
      readTime: '5분 분량',
    },
    {
      id: 3,
      tag: '대처법',
      title: '집주인이 국세 체납 확인을 거부한다면? 이렇게 대처하세요',
      description:
        '계약 전 집주인의 세금 체납 여부 확인은 필수입니다. 거부 시 정당하게 요구하거나 계약을 보호하는 특약 작성 팁.',
      date: '2026.05.20',
      readTime: '4분 분량',
    },
  ];

  return (
    <SectionContainer>
      <HeaderRow>
        <div>
          <Title>💡 안전한 집 구하기, 부동산 꿀팁</Title>
          <SubTitle>집보장이 엄선한 전세사기 예방 가이드와 핵심 뉴스</SubTitle>
        </div>
        <ViewAllButton>전체보기 &rarr;</ViewAllButton>
      </HeaderRow>

      <CardGrid>
        {tipsData.map((tip) => (
          <Card key={tip.id}>
            <div>
              <Tag isAlert={tip.tag === '필독'}>#{tip.tag}</Tag>
              <CardTitle>{tip.title}</CardTitle>
              <CardDescription>{tip.description}</CardDescription>
            </div>
            <CardFooter>
              <span>{tip.date}</span>
              <span>{tip.readTime}</span>
            </CardFooter>
          </Card>
        ))}
      </CardGrid>
    </SectionContainer>
  );
};

export default PropertyTips;

const SectionContainer = styled.section`
  width: 100%;
  padding: 48px 16px;

  margin: 0 auto;
  box-sizing: border-box;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const ViewAllButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #6366f1; /* 서비스 보라색 톤에 맞춘 컬러 */
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.05),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const Tag = styled.span<{ isAlert: boolean }>`
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 16px;

  /* '필독'일 때는 빨간색 톤, 아닐 때는 서비스 메인 보라색 톤 적용 */
  background-color: ${(props) => (props.isAlert ? '#fef2f2' : '#f5f3ff')};
  color: ${(props) => (props.isAlert ? '#dc2626' : '#6366f1')};
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.4;

  /* 말줄임표 처리 (2줄) */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin: 0 0 16px 0;
  line-height: 1.6;

  /* 말줄임표 처리 (3줄) */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9ca3af;
  padding-top: 16px;
  border-top: 1px solid #f9fafb;
`;
