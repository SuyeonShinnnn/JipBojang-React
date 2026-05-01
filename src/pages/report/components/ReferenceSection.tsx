import styled from 'styled-components';

const ReferenceSection = () => {
  return (
    <Wrapper>
      <div>
        <Title>
          <i className="bi bi-info-circle-fill" /> 참고
        </Title>

        <Card>
          <SectionTitle>| 점수 구간 안내</SectionTitle>

          <ScoreBar>
            <Segment style={{ width: '40%' }} $type="danger" />
            <Segment style={{ width: '30%' }} $type="warning" />
            <Segment style={{ width: '30%' }} $type="success" />
          </ScoreBar>

          <ScoreLabel>
            <span>위험</span>
            <span>적정</span>
            <span>안심</span>
          </ScoreLabel>

          <Divider />

          <Block>
            <Bold>1. 위험 (0 ~ 40점)</Bold>
            <p>
              거래상 중요한 위험 요소가 다수 존재하는 상태입니다.
              <br />
              담보권 설정, 선순위 채권 초과 등으로 안정성에 문제가 있을 수
              있습니다.
              <br />
              반드시 전문가 검토가 필요합니다.
            </p>
          </Block>

          <Block>
            <Bold>2. 적정 (41 ~ 70점)</Bold>
            <p>
              일부 위험 요소가 존재하지만 치명적이지 않습니다.
              <br />
              거래 전 추가 확인이 필요합니다.
            </p>
          </Block>

          <Block>
            <Bold>3. 안심 (71 ~ 100점)</Bold>
            <p>
              전반적으로 안정적인 상태입니다.
              <br />
              추가 검토는 권장됩니다.
            </p>
          </Block>

          <Divider />

          <SectionTitle>| 점수 계산 기준</SectionTitle>
          <List>
            <li>전세보증금 대비 선순위채권 비율</li>
            <li>건물 권리 상태</li>
            <li>불법 건축물 여부</li>
            <li>신탁매각 가능성</li>
            <li>LTV 준수 여부</li>
          </List>

          <Divider />

          <SectionTitle>| 거래 전 체크리스트</SectionTitle>
          <List>
            <li>전세보증금 + 선순위채권 ≤ 주택가격 × 90%</li>
            <li>선순위채권 ≤ 주택가격 × 60%</li>
            <li>권리침해사항 확인</li>
            <li>위반건축물 여부 확인</li>
            <li>전문가 상담</li>
          </List>
        </Card>
      </div>
    </Wrapper>
  );
};

export default ReferenceSection;

const Wrapper = styled.div`
  padding: 16px;
`;

const Title = styled.h5`
  color: #6a5bff;
  font-weight: 700;
  border-left: 4px solid #6a5bff;
  padding-left: 10px;
  font-size: 1.2rem;
  margin-bottom: 12px;

  i {
    margin-right: 6px;
  }
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e0e0ff;
  border-radius: 16px;
  padding: 16px;
  font-size: 0.95rem;
  color: #333;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  margin: 12px 0;
`;

const ScoreBar = styled.div`
  height: 12px;
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #d0d0d0;
`;

const Segment = styled.div<{ $type: 'danger' | 'warning' | 'success' }>`
  height: 100%;
  background: ${({ $type }) =>
    $type === 'danger'
      ? '#f44336'
      : $type === 'warning'
        ? '#ff9800'
        : '#4caf50'};
`;

const ScoreLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #777;
  margin-top: 6px;
`;

const Divider = styled.hr`
  margin: 16px 0;
`;

const Block = styled.div`
  margin-bottom: 16px;

  p {
    margin: 4px 0 0;
    line-height: 1.5;
  }
`;

const Bold = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const List = styled.ul`
  padding-left: 18px;
  margin: 0;

  li {
    margin-bottom: 4px;
  }
`;
