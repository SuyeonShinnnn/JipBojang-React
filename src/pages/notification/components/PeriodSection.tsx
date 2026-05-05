import styled from 'styled-components';
import { useMemo, useState } from 'react';
import BaseButton from '../../../components/common/BaseButton';
import { LocationDotIcon } from '../../../assets/icon/LocationDotIcon';

interface PeriodSectionProps {
  address: string | undefined;
  onSelectedPeriod: (period: string) => void;
}

const PeriodSection: React.FC<PeriodSectionProps> = ({
  address,
  onSelectedPeriod,
}) => {
  const periodOption = useMemo(() => {
    const today = new Date();

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth()).padStart(2, '0');
      const day = String(date.getDay()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    const plusYear = (year: number) => {
      const d = new Date(today);
      d.setFullYear(d.getFullYear() + year);
      return formatDate(d);
    };

    return [
      { no: '1년', year: plusYear(1) },
      { no: '2년', year: plusYear(2) },
      { no: '직접 설정', year: '-' },
    ];
  }, []);

  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);

  return (
    <>
      <AddressBox>
        <LocationDotIcon />
        <span>{address}</span>
      </AddressBox>
      <h3>알림 종료일</h3>

      <Buttons>
        {periodOption.map((p, idx) => (
          <li key={idx}>
            <BaseButton
              variant={selectedPeriod === idx ? 'selected' : 'options'}
              onClick={() => {
                setSelectedPeriod(idx);
                onSelectedPeriod(p.year);
              }}
            >
              <span>{p.no}</span>
              <span>{p.year}</span>
            </BaseButton>
          </li>
        ))}
      </Buttons>
    </>
  );
};

export default PeriodSection;

const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 16px;
  border: 1px solid rgb(var(--color-lightgray));
  border-radius: 8px;

  svg {
    width: 32px;
    color: rgb(var(--color-primary));
  }
`;

const Buttons = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  margin-top: 4px;
  gap: 1rem;

  button {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 1rem;
    width: 100%;

    &:active {
      transform: scale(0.92);
    }
  }
`;
