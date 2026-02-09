import { useState } from 'react';
import BaseInput from '../../../components/common/BaseInput';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchKeyword.trim()) return;
    onSearch(searchKeyword);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <BaseInput
          showButton={true}
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchBar;
