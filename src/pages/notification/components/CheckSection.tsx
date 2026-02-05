import styled from 'styled-components';
import type { AddressInfo } from '../types/notification';
import { BsInfoCircle } from 'react-icons/bs';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { MdNumbers } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { useState } from 'react';

interface CheckSectionProps {
  address: AddressInfo | undefined;
  period: string | undefined;
}

const CheckSection: React.FC<CheckSectionProps> = ({ address, period }) => {
  const DEFAULT_NAME = '관심 부동산';
  const [inputValue, setInputValue] = useState(DEFAULT_NAME);

  const handleFocus = () => {
    if (inputValue === DEFAULT_NAME) {
      setInputValue('');
    }
  };

  const handleBlur = () => {
    if (inputValue.trim() === '') {
      setInputValue(DEFAULT_NAME);
    }
  };
  return (
    <>
      <Title>선택사항 확인</Title>
      <InputWrapper>
        <LineInput
          id="property-name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <InputLabel htmlFor="property-name">
          등록 목록에 표시될 이름을 입력하세요. (미입력 시 기본 입력)
        </InputLabel>
        <InputSpan>
          <BsInfoCircle />
          <span>예: 관심 부동산1</span>
        </InputSpan>
      </InputWrapper>

      <Item>
        <SubTitle>
          <HiOutlineBuildingOffice2 />
          <span>구분</span>
        </SubTitle>
        <span>{address?.type}</span>
      </Item>
      <Item>
        <SubTitle>
          <MdNumbers />
          <span>고유번호</span>
        </SubTitle>
        <span>{address?.uniqueNo}</span>
      </Item>
      <Item>
        <SubTitle>
          <IoLocationOutline />
          <span>상세주소</span>
        </SubTitle>
        <span>{address?.address}</span>
      </Item>
      <Item>
        <SubTitle>
          <BsCalendar2Date />
          <span>알람 수신 만료일</span>
        </SubTitle>
        <span>{period}</span>
      </Item>
    </>
  );
};

export default CheckSection;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LineInput = styled.input`
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  border-bottom: 1px solid var(--color-mediumgray);
  width: 40%;

  &:focus {
    outline: none;
    border-bottom: 1px solid var(--color-primary);
  }
`;

const InputLabel = styled.label`
  color: var(--color-darkgray);
`;

const InputSpan = styled.span`
  color: var(--color-darkgray);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  margin-bottom: 1.5rem;

  svg {
    color: var(--color-primary) !important ;
  }
`;

const Item = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 8px;
`;

const SubTitle = styled.h5`
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: var(--color-primary) !important ;
    font-size: 20px;
  }
`;
