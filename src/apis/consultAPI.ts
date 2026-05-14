import axiosInstance from './axiosInstance';

export const getFavoriteAgent = async (userId: number) => {
  return await axiosInstance.get(`/users/${userId}/favorites`);
};

export const getAgent = async () => {
  return await axiosInstance.get('/agents');
};

export const deleteFavorites = async (userId: number, agentId: number) => {
  return await axiosInstance.delete(`/users/${userId}/favorites`, {
    data: { agentId: agentId },
  });
};

export const addFavorites = async (userId: number, agentId: number) => {
  return await axiosInstance.post(`/users/${userId}/favorites`, {
    agentId: agentId,
  });
};
