import React from 'react';
import BaseModal from '../../../components/common/BaseModal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} header={<h2>부동산 삭제</h2>}>
      <span>해당 부동산을 삭제하시겠습니까?</span>
    </BaseModal>
  );
};

export default DeleteModal;
