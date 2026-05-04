import React from 'react';
import styled from 'styled-components';
import PropertyCard from './components/PropertyCard';
import { getRegistedPropertyInfo } from '../../apis/notiApi';
import WarningCardSection from './components/WarningCardSection';
import { useAuthStore } from '../../stores/auth';
// import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { PropertyDetail } from '../../types/notification';
import SkeletonCard from '../../components/common/skeleton/SkeletonCard';
import ErrorState from '../../components/common/ErrorState';
import { lazy, Suspense } from 'react';

const DetailModal = lazy(() => import('./components/DetailModal'));
const DeleteModal = lazy(() => import('./components/DeleteModal'));
const ModifyModal = lazy(() => import('./components/ModifyModal'));
const PropertyRegistModal = lazy(
  () => import('./components/PropertyRegistModal'),
);

const SKELETON_LIST = Array.from({ length: 3 });

type ModalType = 'register' | 'delete' | 'modify' | 'detail' | null;

const NotiPage: React.FC = () => {
  // const location = useLocation();
  // const targetId = location.state?.targetPropertyId;
  const userId = useAuthStore((state) => state.user.userId);

  const [modalType, setModalType] = React.useState<ModalType>(null);
  const [selectedProperty, setSelectedProperty] =
    React.useState<PropertyDetail | null>(null);

  const { data, isPending, isError, refetch } = useQuery<PropertyDetail[]>({
    queryKey: ['propertyInfo', userId],
    queryFn: async () =>
      await getRegistedPropertyInfo(Number(userId)).then((res) => res.data),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const openModal = (type: ModalType, item?: PropertyDetail) => {
    setModalType(type);
    if (item) setSelectedProperty(item);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProperty(null);
  };

  if (isError) {
    return (
      <Container>
        <ErrorState onRetry={refetch} />
      </Container>
    );
  }

  return (
    <Container>
      <h1>등기변동 알림 서비스</h1>
      <SubTitle>알림 설정된 부동산</SubTitle>

      <PropertyCardWrapper>
        {isPending
          ? SKELETON_LIST.map((_, idx) => <SkeletonCard key={idx} />)
          : Array.from({ length: 3 }).map((_, idx) => {
              const item = data?.[idx];

              return (
                <PropertyCard
                  key={idx}
                  propertyInfo={item}
                  isEmpty={!item}
                  onOpenModal={openModal}
                />
              );
            })}
      </PropertyCardWrapper>

      <WarningCardSection />

      {modalType === 'register' && (
        <Suspense fallback={null}>
          <PropertyRegistModal isOpen onClose={closeModal} />
        </Suspense>
      )}

      {modalType === 'delete' && (
        <Suspense fallback={null}>
          <DeleteModal isOpen onClose={closeModal} />
        </Suspense>
      )}

      {modalType === 'modify' && (
        <Suspense fallback={null}>
          <ModifyModal isOpen onClose={closeModal} />
        </Suspense>
      )}

      {modalType === 'detail' && (
        <Suspense fallback={null}>
          <DetailModal
            isOpen
            propertyDetail={selectedProperty ?? undefined}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </Container>
  );
};

export default NotiPage;

const Container = styled.div`
  padding: 2rem 8rem;
`;

const SubTitle = styled.span`
  display: block;
  font-size: 24px;
  margin-top: 20px;
  font-weight: 600;
`;

const PropertyCardWrapper = styled.section`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;
