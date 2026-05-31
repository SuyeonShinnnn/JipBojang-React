export const formatMoney = (val?: number) => {
  const num = Number(val);
  if (!num || isNaN(num)) return '금액 정보 없음';

  const 원단위 = num * 10000;

  const 조 = Math.floor(원단위 / 1000000000000);
  const 억 = Math.floor((원단위 % 1000000000000) / 100000000);
  const 만 = Math.floor((원단위 % 100000000) / 10000);

  const comma = (x: number) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let result = '';
  if (조) result += `${comma(조)}조 `;
  if (억) result += `${comma(억)}억 `;
  if (만) result += `${comma(만)}만원`;

  return result.trim() || '0만원';
};

export const formatDate = (date: string) => {
  const d = new Date(date);

  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

export const formatTime = (date: string) => {
  const d = new Date(date);

  return d.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
