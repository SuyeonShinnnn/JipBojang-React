export const houseLabel = (categoryName: string) => {
  if (!categoryName) return '';
  if (categoryName.includes('아파트')) return '아파트';
  if (categoryName.includes('빌라')) return '빌라';
  return '';
};

export const dateFormat = (date?: string) => {
  if (date?.length != 8) return '';

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${year}년 ${month}월 ${day}일`;
};

// 최근 검색 기록 저장
export const saveRecentSearch = (keyword: string) => {
  const stored = localStorage.getItem('recentSearch');

  let list: string[] = stored ? JSON.parse(stored) : [];

  list = list.filter((item) => item !== keyword); // 중복 제거
  list.unshift(keyword); // 맨 앞 추가
  list = list.slice(0, 5); // 최대 5개

  localStorage.setItem('recentSearch', JSON.stringify(list));
};

// 검색 기록 가져오기
export const getRecentSearch = () => {
  const stored = localStorage.getItem('recentSearch');
  return stored ? JSON.parse(stored) : [];
};

// 검색 기록 삭제
export const removeRecentSearch = (keyword: string) => {
  const stored = JSON.parse(localStorage.getItem('recentSearch') || '[]');

  const updated = stored.filter((item: string) => item !== keyword);

  localStorage.setItem('recentSearch', JSON.stringify(updated));

  return updated;
};
