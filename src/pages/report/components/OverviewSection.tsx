import styled from 'styled-components';

const OverviewSection = () => {
  return (
    <>
      <Section>
        <h3>개요</h3>

        <Wrapper>
          <div>
            <dt>주소</dt>
            <dd>서울특별시 테헤란로 123 제1층 101호</dd>
          </div>
          <div>
            <dt>거래 유형</dt>
            <dd>전세</dd>
          </div>
          <div>
            <dt>보증금</dt>
            <dd>2억</dd>
          </div>
        </Wrapper>
      </Section>
    </>
  );
};

export default OverviewSection;

const Section = styled.section`
  background-color: rgb(217, 217, 217, 0.3);
  width: 70%;
  max-width: 600px;
  min-width: 320px;
  padding: 2rem 3rem;
`;

const Wrapper = styled.dl`
  background-color: #fff;
  padding: 12px;
  border: 1px solid var(--color-lightgray);
  border-radius: 12px;

  display: grid;
  gap: 12px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  dt {
    font-weight: 500;
  }
`;
