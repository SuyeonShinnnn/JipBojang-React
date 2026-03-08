import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';
import BaseButton from '../../../components/common/BaseButton';
import AddressSection from './AddressSection';
import PeriodSection from './PeriodSection';
import type { AddressInfo } from '../../../types/notification';
import CheckSection from './CheckSection';

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

  const [selectedAddr, setSelectedAddr] = useState<AddressInfo | undefined>();

  const handleSelectedAddr = (address: AddressInfo) => {
    setSelectedAddr(address);
  };

  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>();

  const handleSelectedPeriod = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      header={<h2>부동산 등록</h2>}
      footer={
        <>
          {currentIndex === 0 && (
            <BaseButton
              variant="outline"
              onClick={() => {
                setCurrentIndex(0);
                onClose();
              }}
            >
              취소
            </BaseButton>
          )}
          {currentIndex !== 0 && (
            <BaseButton variant="outline" onClick={() => prevSection()}>
              이전
            </BaseButton>
          )}
          {currentIndex !== sections.length - 1 && (
            <BaseButton onClick={nextSection}>다음</BaseButton>
          )}
          {currentIndex === sections.length - 1 && (
            <BaseButton
              onClick={() => {
                setCurrentIndex(0);
                onClose();
              }}
            >
              완료
            </BaseButton>
          )}
        </>
      }
    >
      {currentSection === 'Address' && (
        <AddressSection onSelectedAddr={handleSelectedAddr} />
      )}
      {currentSection === 'Period' && (
        <PeriodSection
          address={selectedAddr?.address}
          onSelectedPeriod={handleSelectedPeriod}
        />
      )}
      {currentSection === 'Check' && (
        <CheckSection address={selectedAddr} period={selectedPeriod} />
      )}
    </BaseModal>
  );
};

export default PropertyRegistModal;
