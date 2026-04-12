import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import { GoTrash } from 'react-icons/go';
import { GoPencil } from 'react-icons/go';
import { BsPlusLg } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropertyRegistModal from './PropertyRegistModal';
import DeleteModal from './DeleteModal';
import ModifyModal from './ModifyModal';
import DetailModal from './DetailModal';
import type { PropertyDetail } from '../../../types/notification';

interface PropertyCardProps {
  propertyInfo?: PropertyDetail;
  isEmpty?: boolean;
  isPending: boolean;
  autoOpenDetailModal: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  propertyInfo,
  isEmpty = false,
  isPending,
  autoOpenDetailModal = false,
}) => {
  const [openPropertyRegisterModal, setOpenPropertyRegisterModal] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const iconList = [
    { icon: <GoTrash />, label: '삭제' },
    { icon: <GoPencil />, label: '수정' },
    { icon: <HiMagnifyingGlassPlus />, label: '상세보기' },
  ];

  const openModal = (key: number) => {
    if (key == 0) {
      setOpenDeleteModal(!openDeleteModal);
    } else if (key == 1) {
      setOpenModifyModal(!openModifyModal);
    } else if (key == 2) {
      setOpenDetailModal(!openDetailModal);
    }
  };

  useEffect(() => {
    if (autoOpenDetailModal && propertyInfo) {
      setOpenDetailModal(true);
    }
  }, [autoOpenDetailModal, propertyInfo]);

  if (isPending)
    return (
      <SkeletonCard>
        <SkeletonTitle />
        <SkeletonText />
        <SkeletonText $short />
      </SkeletonCard>
    );

  return (
    <>
      {isEmpty ? (
        <Container
          $isEmpty={isEmpty}
          onClick={() =>
            setOpenPropertyRegisterModal(!openPropertyRegisterModal)
          }
        >
          <BsPlusLg />
        </Container>
      ) : (
        <Container $isEmpty={isEmpty}>
          <h2>📍{propertyInfo?.title}</h2>
          <span>{propertyInfo?.commAddrLotNumber}</span>
          <IconWrapper>
            {iconList.map((item, key) => (
              <IconBox key={key} onClick={() => openModal(key)}>
                {item.icon}
                <Tooltip>{item.label}</Tooltip>
              </IconBox>
            ))}
          </IconWrapper>
        </Container>
      )}

      <PropertyRegistModal
        isOpen={openPropertyRegisterModal}
        onClose={() => setOpenPropertyRegisterModal(false)}
      />

      <DeleteModal
        itemId={propertyInfo?.id}
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
      <ModifyModal
        isOpen={openModifyModal}
        onClose={() => setOpenModifyModal(false)}
      />
      <DetailModal
        isOpen={openDetailModal}
        propertyDetail={propertyInfo}
        onClose={() => setOpenDetailModal(false)}
      />
    </>
  );
};

const SkeletonCard = styled.div`
  flex: 1;
  border-radius: 16px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease infinite;
  border-radius: 8px;
`;

const SkeletonTitle = styled(SkeletonBase)`
  width: 60%;
  height: 24px;
  margin-bottom: 16px;
`;

const SkeletonText = styled(SkeletonBase)<{ $short?: boolean }>`
  width: ${({ $short }) => ($short ? '40%' : '100%')};
  height: 16px;
  margin-bottom: 12px;
`;

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
