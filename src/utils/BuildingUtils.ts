export const houseLabel = (categoryName: string) => {
  if (!categoryName) return '';
  if (categoryName.includes('아파트')) return '아파트';
  if (categoryName.includes('빌라')) return '빌라';
  return '';
};
