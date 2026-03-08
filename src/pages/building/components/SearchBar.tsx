import { useState } from 'react';
import BaseInput from '../../../components/common/BaseInput';
import styled from 'styled-components';

interface Place {
  lat: number;
  lng: number;
  name: string;
  address: string;
  roadAddress: string;
}

interface SearchBarProps {
  places: Place[];
  onSearch: (keyword: string) => void;
}

const SearchBar = ({ onSearch, places }: SearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchKeyword.trim()) return;
    onSearch(searchKeyword);
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
      <section>
        <ul>
          {places.map((item, key) => (
            <List key={key}>
              <Title>{item.name}</Title>
              <span>{item.address}</span>
              <span>{item.roadAddress}</span>
            </List>
          ))}
        </ul>
      </section>
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

  transition: height 0.5s ease;
`;

const List = styled.li`
  padding: 1rem;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
`;
