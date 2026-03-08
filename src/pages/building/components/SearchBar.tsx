import { useState } from 'react';
import BaseInput from '../../../components/common/BaseInput';
import styled from 'styled-components';
import type { Place } from '../../../types/building';

interface SearchBarProps {
  places: Place[];
  onSearch: (keyword: string) => void;
  onSelect: (value: Place) => void;
}

const SearchBar = ({ onSearch, onSelect, places }: SearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchKeyword.trim()) return;
    onSearch(searchKeyword);
  };

  const houseLabel = (categoryName: string) => {
    if (!categoryName) return '';
    if (categoryName.includes('아파트')) return '아파트';
    if (categoryName.includes('빌라')) return '빌라';
    return '';
  };

  return (
    <Aside hasResult={places.length > 0}>
      <form onSubmit={handleSubmit}>
        <BaseInput
          showButton={true}
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </form>
      <ResultSection>
        <ul>
          {places.map((item, key) => (
            <List key={key} onClick={() => onSelect(item)}>
              <TitleWrapper>
                <span>{item.name}</span>
                <small>{houseLabel(item.category)}</small>
              </TitleWrapper>
              <Address>{item.address}</Address>
            </List>
          ))}
        </ul>
      </ResultSection>
    </Aside>
  );
};

export default SearchBar;

const Aside = styled.aside<{ hasResult: boolean }>`
  background-color: white;
  box-shadow: 5px 5px 20px var(--color-darkgray);
  width: 400px;
  border-radius: 12px;
  margin: 5.5rem 0 0 12px;
  padding: 1rem;
  height: ${(props) => (props.hasResult ? '85vh' : '80px')};

  position: absolute;
  z-index: 1000;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  transition: height 0.5s ease;
`;

const ResultSection = styled.section`
  flex: 1;
  overflow-y: auto;
`;

const List = styled.li`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;

  span {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-primary);
  }
  small {
    color: var(--color-darkgray);
  }
`;

const Address = styled.span`
  color: var(--color-darkgray);
`;
