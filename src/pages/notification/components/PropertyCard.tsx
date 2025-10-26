import { MapPinPlusIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import { GoTrash } from 'react-icons/go';
import { GoPencil } from 'react-icons/go';
import React from 'react';
import styled from 'styled-components';

const PropertyCard: React.FC = () => {
  return (
    <>
      <Container>
        <h2>📍관심 부동산</h2>
        <span>서울광역시 동대문구 장한평로 42-1</span>
        <IconWrapper>
          <IconBox>
            <GoTrash />
            <Tooltip>삭제</Tooltip>
          </IconBox>
          <IconBox>
            <GoPencil />
            <Tooltip>수정</Tooltip>
          </IconBox>
          <IconBox>
            <HiMagnifyingGlassPlus />
            <Tooltip>상세보기</Tooltip>
          </IconBox>
        </IconWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  padding: 1rem;
  border: 0.1px solid var(--color-lightgray);
  border-radius: 8px;
  box-shadow: 15px 10px 15px -5px var(--color-accent);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 10px 10px 20px -8px var(--color-primary);
  }
  @media (max-width: 1024px) {
    box-shadow: none;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  @media (max-width: 768px) {
    box-shadow: none;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;

  svg {
    color: var(--color-darkgray);
  }
`;

const IconBox = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    transition: all 0.1s ease;

    &:hover {
      color: var(--color-accent);
      transform: scale(1.1);
    }
  }

  &:hover span {
    opacity: 0.8;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -20%);
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--color-darkgray);
  color: white;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;

  transition: all 0.2s ease;
`;

export default PropertyCard;
