import React from 'react';
import BaseModal from '../../../components/common/BaseModal';
import type {
  PropertyDetail,
  RegistryChanged,
} from '../../../types/notification';
import styled from 'styled-components';
import { getRegistedPropertyDetail } from '../../../apis/notiApi';
import emptyIcon from '../../../assets/character/Character-Empty.png';
import { useQuery } from '@tanstack/react-query';
import SkeletonTimeline from '../../../components/skeleton/SkeletonTimeline';
import BaseButton from '../../../components/common/BaseButton';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyDetail?: PropertyDetail;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  propertyDetail,
}) => {
  const infoMap = {
    commAddrLotNumber: '주소',
    resType: '구분',
    commUniqueNo: '고유번호',
    expiredDate: '만료일',
  };

  const {
    isPending,
    isError,
    data = [],
    refetch,
  } = useQuery<RegistryChanged[]>({
    queryKey: ['changedInfo', propertyDetail?.commUniqueNo],
    queryFn: () => getRegistedPropertyDetail(propertyDetail?.commUniqueNo),
    enabled: isOpen && !!propertyDetail?.commUniqueNo,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      header={<h2>📍{propertyDetail?.title}</h2>}
    >
      <InfoSection>
        <h3>정보</h3>
        <InfoTable>
          <tbody>
            {Object.entries(infoMap).map(([key, label]) => (
              <tr key={key}>
                <LabelCell>{label}</LabelCell>
                <ValueCell>{(propertyDetail as any)?.[key] ?? '-'}</ValueCell>
              </tr>
            ))}
          </tbody>
        </InfoTable>
      </InfoSection>

      <ChangedSection>
        <h3>변동내역</h3>

        {isPending ? (
          <SkeletonTimeline />
        ) : isError ? (
          <ErrorCard>
            <h4>변동내역을 불러오지 못했어요</h4>
            <p>잠시 후에 다시 시도해주세요</p>
            <BaseButton variant="outline" onClick={() => refetch()}>
              재시도
            </BaseButton>
          </ErrorCard>
        ) : (
          <ChangedWrapper $isChangeExist={!!data}>
            {data.length === 0 ? (
              <>
                <img
                  style={{ width: '72px' }}
                  src={emptyIcon}
                  alt="Item is Empty"
                />
                <p>등록일 이후로 발생한 변동 내역이 없습니다</p>
              </>
            ) : (
              <Timeline>
                {data.map((item) => (
                  <TimelineItem key={item.id}>
                    <ChangedCard>
                      <DateText>{item.receiptDate}</DateText>
                      <PurposeText>{item.purpose}</PurposeText>
                    </ChangedCard>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
          </ChangedWrapper>
        )}
      </ChangedSection>
    </BaseModal>
  );
};

export default DetailModal;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-top: 1px solid rgb(var(--color-lightgray));
  border-collapse: collapse;
  overflow: hidden;
`;

const LabelCell = styled.td`
  width: 140px;
  background-color: #f5f5f5;
  font-weight: 600;
  padding: 12px 16px;
  border-right: 1px solid rgb(var(--color-lightgray));
  border-bottom: 1px solid rgb(var(--color-lightgray));
  vertical-align: top;
`;

const ValueCell = styled.td`
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(var(--color-lightgray));
  line-height: 1.5;
  word-break: keep-all;
`;

const ChangedSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 8px;
`;

const ChangedWrapper = styled.div<{ $isChangeExist: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  justify-content: ${({ $isChangeExist }) =>
    $isChangeExist ? 'center' : 'start'};
  align-items: ${({ $isChangeExist }) => ($isChangeExist ? 'center' : 'start')};
`;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: #d9d9d9;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const ChangedCard = styled.div`
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #ececec;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

const DateText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #777;
  font-weight: 500;
`;

const PurposeText = styled.p`
  margin: 6px 0 0;
  font-size: 1rem;
  font-weight: 700;
`;

const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  svg {
    font-size: 3rem;
    color: #d00000;
    margin-bottom: 8px;
  }

  h4 {
    font-size: 1rem;
    font-weight: 700;
    color: rgb(var(--color-darkgray));
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: rgb(var(--color-darkgray));
    opacity: 0.8;
  }

  button {
    margin-top: 8px;
    padding: 4px 8px;
    border-radius: 50px;
  }
`;
