import axiosInstance from './axiosInstance';

// 리포트 생성
export const createReport = (address: string, type: string, price: number, userId: number) => {
  return axiosInstance.post(`/report/create/${userId}`, { address, type, amount: price });
};
