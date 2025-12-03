import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';

interface ModifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModifyModal: React.FC<ModifyModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} header={<h2>부동산 수정</h2>}>
      <h3>부동산 수정</h3>
    </BaseModal>
  );
};

export default ModifyModal;
