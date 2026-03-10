import { useEffect, useState } from 'react';
import BaseInput from '../../../components/common/BaseInput';
import styled from 'styled-components';
import type { Place } from '../../../types/building';
import {
  getRecentSearch,
  removeRecentSearch,
  saveRecentSearch,
} from '../../../utils/BuildingUtils';
import { RiCloseLargeFill } from 'react-icons/ri';

interface SearchBarProps {
  places: Place[];
  onSearch: (keyword: string) => void;
  onSelect: (value: Place) => void;
}

const SearchBar = ({ onSearch, onSelect, places }: SearchBarProps) => {
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchKeyword.trim()) return;
    onSearch(searchKeyword);
    saveRecentSearch(searchKeyword);
    setRecentSearch(getRecentSearch());
    (e.target as HTMLFormElement).querySelector('input')?.blur();
  };

  useEffect(() => {
    setRecentSearch(getRecentSearch());
  }, []);

  return (
    <>
      <Aside hasResult={places.length > 0}>
        <form onSubmit={handleSubmit}>
          <BaseInput
            showButton={true}
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </form>

        <ResultSection>
          <ul>
            {places.map((item, key) => (
              <List key={key} onClick={() => onSelect(item)}>
                <TitleWrapper>
                  <span>{item.name}</span>
                </TitleWrapper>
                <Address>{item.address}</Address>
              </List>
            ))}
          </ul>
        </ResultSection>
      </Aside>
      {isFocused && (
        <RecentSearchBox>
          <h5>최근 검색어</h5>
          {recentSearch.length !== 0 ? (
            recentSearch.map((item, key) => (
              <li
                key={key}
                onMouseDown={() => {
                  setSearchKeyword(item);
                  onSearch(item);
                }}
              >
                {item}
                <RiCloseLargeFill
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeRecentSearch(item);
                  }}
                />
              </li>
            ))
          ) : (
            <EmptyBox>
              <span>검색 기록이 없습니다.</span>
            </EmptyBox>
          )}
        </RecentSearchBox>
      )}
    </>
  );
};

export default SearchBar;

const Aside = styled.aside<{ hasResult: boolean }>`
  background-color: white;
  box-shadow: 5px 5px 20px var(--color-darkgray);
  width: 360px;
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

const RecentSearchBox = styled.ul`
  position: absolute;
  top: 9.8rem;
  left: 1.7rem;
  width: 332px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  z-index: 2000;

  h5 {
    font-size: 16px;
    margin-bottom: 12px;
    padding: 1rem 0 0 1rem;
  }
  li {
    display: flex;
    justify-content: space-between;
    padding: 12px;

    svg {
      color: var(--color-darkgray);
    }

    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }
  }
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 2rem 0;
  color: var(--color-darkgray);
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
`;

const Address = styled.span`
  color: var(--color-darkgray);
`;
