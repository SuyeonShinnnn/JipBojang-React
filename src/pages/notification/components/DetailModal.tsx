import React, { useEffect, useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';
import type {
  PropertyDetail,
  RegistryChanged,
} from '../../../types/notification.types';
import styled from 'styled-components';
import { getRegistryChanged } from '../../../apis/notiApi';

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
    address: '주소',
    buildingType: '구분',
    commUniqueNo: '고유번호',
    expireDate: '만료일',
  };

  const [changedInfo, setChangedInfo] = useState<RegistryChanged[]>([]);

  useEffect(() => {
    if (!isOpen || !propertyDetail?.commUniqueNo) return;

    const fetchData = async () => {
      console.log(propertyDetail?.commUniqueNo);
      const data = await getRegistryChanged(propertyDetail?.commUniqueNo);
      setChangedInfo(data.changed_list);
      console.log(data);
    };
    fetchData();
  }, [isOpen, propertyDetail?.commUniqueNo]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      header={<h2>📍{propertyDetail?.registName}</h2>}
    >
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

      <h3>변동내역</h3>
      <ChangedWrapper>
        {changedInfo.map((item, key) => (
          <ChangedBox>
            <span>{item.changedDate}</span>
            <span>{item.detail}</span>
          </ChangedBox>
        ))}
      </ChangedWrapper>
    </BaseModal>
  );
};

export default DetailModal;

const InfoTable = styled.table`
  width: 100%;
  margin-top: 12px;
  border-top: 1px solid var(--color-lightgray);
  border-collapse: collapse;
  overflow: hidden;
`;

const LabelCell = styled.td`
  width: 140px;
  background-color: #f5f5f5;
  font-weight: 600;
  padding: 12px 16px;
  border-right: 1px solid var(--color-lightgray);
  border-bottom: 1px solid var(--color-lightgray);
  vertical-align: top;
`;

const ValueCell = styled.td`
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-lightgray);
  line-height: 1.5;
  word-break: keep-all;
`;

const ChangedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChangedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
`;
