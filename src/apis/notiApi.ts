import axiosInstance from './axiosInstance';

export const getRegistedPropertyInfo = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/noti/${id}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log('🚨오류 발생');
    return e;
  }
};
