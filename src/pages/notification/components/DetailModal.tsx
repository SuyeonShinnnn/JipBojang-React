import React, { useEffect, useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';
import type { PropertyDetail } from '../../../types/notification.types';
import { Building } from 'lucide-react';

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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      header={<h2>📍{propertyDetail?.registName}</h2>}
    >
      <h3>정보</h3>
      <table>
        <tbody>
          {Object.entries(infoMap).map(([key, label]) => (
            <tr key={key}>
              <td>{label}</td>
              <td>{(propertyDetail as any)?.[key] ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseModal>
  );
};

export default DetailModal;
