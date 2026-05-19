import axiosInstance from './axiosInstance';

export const getBoards = async (userId: number) => {
  return await axiosInstance.get(`/community/${userId}`);
};

export const getBoardDetail = async (boardId: number, userId: number) => {
  return await axiosInstance.get(`/community/${boardId}/user/${userId}`);
};

export const getRecentNews = async () => {
  return await axiosInstance.get('/news/jeonse');
};
