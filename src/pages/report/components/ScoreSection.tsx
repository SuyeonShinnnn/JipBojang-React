import styled from 'styled-components';

const ScoreSection = () => {
  return (
    <>
      <Section>
        <h3>안심 점수</h3>
        <Wrapper>
          <DonutChart></DonutChart>
          <article>
            <strong>가격</strong>
            <SegmentWrapper>
              <Segmented>시세와 유사</Segmented>
            </SegmentWrapper>
            <strong>권리</strong>
            <SegmentWrapper>
              <Segmented>담보권 설정</Segmented>
            </SegmentWrapper>
            <strong>전세사기</strong>
            <SegmentWrapper>
              <Segmented>압류</Segmented>
              <Segmented>가압류</Segmented>
              <Segmented>가처분</Segmented>
              <Segmented>전세권 설정</Segmented>
              <Segmented>신탁매각 불가</Segmented>
              <Segmented>전세보증금 + 선순위채권 추가</Segmented>
              <Segmented>선순위채권 60% 초과</Segmented>
            </SegmentWrapper>
          </article>
        </Wrapper>
      </Section>
    </>
  );
};

export default ScoreSection;

const Section = styled.section`
  background-color: rgb(217, 217, 217, 0.3);
  width: 70%;
  max-width: 600px;
  min-width: 320px;
  padding: 2rem 3rem;
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 12px;
  border: 1px solid var(--color-lightgray);
  border-radius: 12px;

  display: flex;
  gap: 12px;

  article {
    width: 50%;
    display: grid;
    gap: 4px;
  }

  strong {
    margin-top: 12px;
  }

  strong:first-child {
    margin-top: 0;
  }
`;

const DonutChart = styled.article`
  width: 50%;
  height: 220px;
  background-color: gray;
`;

const SegmentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Segmented = styled.div`
  width: fit-content;
  padding: 4px 8px;
  border-radius: 50px;
  color: #fff;
  background-color: var(--color-primary);
`;
