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
