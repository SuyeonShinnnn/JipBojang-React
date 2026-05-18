import axiosInstance from './axiosInstance';

export const getFavoriteExpert = async (userId: number) => {
  return await axiosInstance.get(`/users/${userId}/favorites`);
};

export const getExpert = async () => {
  return await axiosInstance.get('/experts');
};

export const deleteFavorites = async (userId: number, expertId: number) => {
  return await axiosInstance.delete(`/users/${userId}/favorites`, {
    data: { expertId: expertId },
  });
};

export const addFavorites = async (userId: number, expertId: number) => {
  return await axiosInstance.post(`/users/${userId}/favorites`, {
    expertId: expertId,
  });
};

export const getChatRooms = async (userId: number) => {
  return axiosInstance.get(`/chat/room-list/${userId}`);
};

export const findOrCreateChatRoom = async (
  userId: number,
  expertId: number,
) => {
  return await axiosInstance.post('/chat/room', { userId, expertId });
};

export const getMessageHistory = async (roomId: number) => {
  return await axiosInstance.get(`/chat/room/${roomId}/messages`);
};
