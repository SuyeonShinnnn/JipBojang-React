import styled from "styled-components";
import BaseButton from "../../../components/common/BaseButton";
import { useState } from "react";
import { CurrentLocationIcon } from "../../../assets/icon/CurrentLocationIcon";

const categories = [
  { id: 0, label: "전체" },
  { id: 1, label: "부동산" },
  { id: 2, label: "거주후기" },
  { id: 3, label: "청약/분양" },
  { id: 4, label: "기타" },
];

const SideBar = () => {
  const [isCertified, setIsCertified] = useState(false);
  const [category, setCategory] = useState(0);

  return (
    <Side>
      <LocationButton variant="outline">
        <CurrentLocationIcon /> 동네 인증하기
      </LocationButton>
      <small>위치 인증으로 거주 후기에 대한 신뢰성을 높일 수 있어요</small>

      <Badge $isCertified={isCertified}>
        인증된 동네: <strong>{"인증 동네"}</strong>
      </Badge>

      <Container>
        <h3>커뮤니티 현황</h3>
        <hr />
      </Container>

      <Container>
        <h3>카테고리</h3>
        <hr />

        <ButtonWrapper>
          {categories.map((item) => (
            <li>
              <BaseButton
                variant={item.id === category ? "primary" : "outline"}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </BaseButton>
            </li>
          ))}
        </ButtonWrapper>
      </Container>

      <Container>
        <h3>전세 관련 최신 뉴스</h3>
        <hr />
      </Container>
    </Side>
  );
};

export default SideBar;

const Side = styled.aside`
  width: 20%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  poisiton: fixed;
  left: 20px;
`;

const LocationButton = styled(BaseButton)`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 8px;

  font-weight: 500;
  font-size: 14px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Badge = styled.div<{ $isCertified: boolean }>`
  width: 100%;

  padding: 12px 16px;
  border-radius: 12px;
  text-align: center;

  background: ${({ $isCertified }) => ($isCertified ? "#e8f5e9" : "#ffebee")};
  color: ${({ $isCertified }) => ($isCertified ? "#2e7d32" : "#c62828")};
  border: 1px solid
    ${({ $isCertified }) => ($isCertified ? "#a5d6a7" : "#ef9a9a")};
`;

const Container = styled.div`
  padding: 12px;
  border: 1px solid rgba(var(--color-lightgray));
  border-radius: 12px;

  display: grid;
  gap: 4px;

  h3 {
    font-size: 16px;
  }
`;

const ButtonWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  button {
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 14px;
  }
`;
