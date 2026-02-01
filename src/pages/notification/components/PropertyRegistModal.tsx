import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';
import BaseButton from '../../../components/common/BaseButton';
import AddressSection from './AddressSection';

interface PropertyRegistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Section = 'Address' | 'Period' | 'Check';
const sections: Section[] = ['Address', 'Period', 'Check'];

const PropertyRegistModal: React.FC<PropertyRegistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSection = sections[currentIndex];

  const nextSection = () => {
    if (currentIndex < sections.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevSection = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const closeClicked = () => {
    onClose;
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      header={<h2>부동산 등록</h2>}
      footer={
        <>
          <BaseButton
            variant="outline"
            onClick={() => {
              setCurrentIndex(0);
              onClose();
            }}
          >
            취소
          </BaseButton>
          <BaseButton onClick={nextSection}>다음</BaseButton>
        </>
      }
    >
      {currentSection === 'Address' && <AddressSection />}
    </BaseModal>
  );
};

export default PropertyRegistModal;
