import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} header={<h2>부동산 상세</h2>}>
      <h3>상세주소</h3>
    </BaseModal>
  );
};

export default DetailModal;
