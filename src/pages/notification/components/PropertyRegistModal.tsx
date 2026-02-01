import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';
import BaseInput from '../../../components/common/BaseInput';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { searchAddress } from '../../../apis/notiApi';
import { DotLoader } from 'react-spinners';

interface PropertyRegistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Address {
  type: string;
  address: string;
  uniqueNo: string;
}

const PropertyRegistModal: React.FC<PropertyRegistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [keyword, setKeyword] = useState('');
  const [searched, setSearched] = useState(false);

  const { data, isPending, isSuccess, isError, refetch } = useQuery<Address[]>({
    queryKey: ['addressSearch', keyword],
    queryFn: () => searchAddress(keyword),
    enabled: false,
  });

  const handleSearch = () => {
    setSearched(true);
    console.log(searched);
    refetch();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} header={<h2>부동산 등록</h2>}>
      <Title>주소 검색</Title>
      <BaseInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        showButton={true}
        onButtonClick={handleSearch}
      />
      <ResultBox $center={searched && isPending}>
        {!searched && (
          <>
            <span>
              * 부동산의 소재지번 또는 도로면, 동/호로 검색하시면 정확한 검색
              결과를 얻을 수 있습니다.
            </span>
            <div>
              <span>(예) 남부순환로 2803 101동 101호</span>
              <span>도곡동 91-5 101동 101호</span>
            </div>

            <span>* 미등기인 경우 주소 조회 및 등록이 되지 않습니다.</span>
          </>
        )}
        {searched && isPending && (
          <>
            <DotLoader
              color="var(--color-primary)"
              loading={isPending}
              size={52}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <LoadingSpan>검색중</LoadingSpan>
          </>
        )}
        {searched && isSuccess && (
          <ResultUL>
            {data.map((addr) => (
              <ResultList key={addr.uniqueNo}>
                <TypeSpan>{addr.type}</TypeSpan>
                <span>{addr.uniqueNo}</span>
                <span>{addr.address}</span>
              </ResultList>
            ))}
          </ResultUL>
        )}
        {searched && isError && <>error</>}
      </ResultBox>
    </BaseModal>
  );
};

export default PropertyRegistModal;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const ResultBox = styled.div<{ $center?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 240px;

  ${({ $center }) => $center && `justify-content: center; align-items:center`}
`;

const LoadingSpan = styled.span`
  margin-top: 12px;
  color: var(--color-darkgray);
`;

const ResultUL = styled.ul`
  /* display: flex;
  flex-direction: column;
  gap: 8px; */
  margin: 0;
  padding: 0;
  overflow-y: auto;
`;

const ResultList = styled.li`
  /* background-color: aliceblue; */
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
 
`;

const TypeSpan = styled.span`
  color: var(--color-primary);
`;
