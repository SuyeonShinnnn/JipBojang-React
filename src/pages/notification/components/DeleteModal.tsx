import React from 'react';
import BaseModal from '../../../components/common/BaseModal';
import BaseButton from '../../../components/common/BaseButton';
import { deleteProperty } from '../../../apis/notiApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/common/LoadingSpanner';
import styled from 'styled-components';

interface DeleteModalProps {
  itemId?: number;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  itemId,
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: () => {
      return deleteProperty(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['propertyInfo'],
      });
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      header={<h2>부동산 삭제</h2>}
      footer={
        isPending ? (
          <></>
        ) : (
          <>
            {isSuccess ? (
              <BaseButton onClick={handleClose}>확인</BaseButton>
            ) : (
              <>
                <BaseButton variant="secondary" onClick={handleClose}>
                  취소
                </BaseButton>
                <BaseButton onClick={() => mutate()}>확인</BaseButton>
              </>
            )}
          </>
        )
      }
    >
      {isPending ? (
        <SpinnerWrapper>
          <LoadingSpinner />
          <span>삭제중</span>
        </SpinnerWrapper>
      ) : isSuccess ? (
        <span>✅삭제 완료</span>
      ) : (
        <span>해당 부동산을 삭제하시겠습니까?</span>
      )}
    </BaseModal>
  );
};

export default DeleteModal;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
