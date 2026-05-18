import axiosInstance from './axiosInstance';

export const getBoards = async (userId: number) => {
  return await axiosInstance.get(`/community/${userId}`);
};
