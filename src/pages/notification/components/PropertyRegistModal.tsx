import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';

interface PropertyRegistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PropertyRegistModal: React.FC<PropertyRegistModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} header={<h2>부동산 등록</h2>}>
      <h3>주소 검색</h3>
    </BaseModal>
  );
};

export default PropertyRegistModal;
