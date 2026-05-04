import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import { GoTrash } from 'react-icons/go';
import { GoPencil } from 'react-icons/go';
import { BsPlusLg } from 'react-icons/bs';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import type { PropertyDetail } from '../../../types/notification';

interface PropertyCardProps {
  propertyInfo?: PropertyDetail;
  isEmpty?: boolean;
  onOpenModal: (
    type: 'register' | 'delete' | 'modify' | 'detail',
    item?: PropertyDetail,
  ) => void;
}

const PropertyCard = ({
  propertyInfo,
  isEmpty = false,
  onOpenModal,
}: PropertyCardProps) => {
  const iconList = useMemo(
    () =>
      [
        { icon: <GoTrash />, label: '삭제', type: 'delete' },
        { icon: <GoPencil />, label: '수정', type: 'modify' },
        { icon: <HiMagnifyingGlassPlus />, label: '상세보기', type: 'detail' },
      ] as const,
    [],
  );

  return (
    <>
      {isEmpty ? (
        <Container $isEmpty={isEmpty} onClick={() => onOpenModal('register')}>
          <BsPlusLg />
        </Container>
      ) : (
        <Container $isEmpty={isEmpty}>
          <h2>📍{propertyInfo?.title}</h2>
          <span>{propertyInfo?.commAddrLotNumber}</span>
          <IconWrapper>
            {iconList.map((item, key) => (
              <IconBox
                key={key}
                onClick={() => onOpenModal(item.type, propertyInfo)}
              >
                {item.icon}
                <Tooltip>{item.label}</Tooltip>
              </IconBox>
            ))}
          </IconWrapper>
        </Container>
      )}
    </>
  );
};

const Container = styled.div<{ $isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  padding: 1rem;
  border: 0.1px solid rgb(var(--color-lightgray));
  border-radius: 8px;
  box-shadow: 15px 10px 15px -5px rgb(var(--color-accent));
  transition: all 0.3s ease;

  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      font-size: 2rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: rgb(var(--color-primary));
      border: 1px dashed rgb(var(--color-primary));
      box-shadow: none;

      &:hover {
        box-shadow: none !important;
        transform: none !important;
        font-size: 2.5rem;
      }
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 10px 10px 20px -8px rgb(var(--color-primary));
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
    color: rgb(var(--color-darkgray));
  }
`;

const IconBox = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    transition: all 0.1s ease;

    &:hover {
      color: rgb(var(--color-accent));
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
  background: rgb(var(--color-darkgray));
  color: white;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;

  transition: all 0.2s ease;
`;

export default PropertyCard;
