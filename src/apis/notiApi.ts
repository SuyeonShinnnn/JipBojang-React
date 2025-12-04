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

export const getRegistryChanged = async (commUniqueNo?: number) => {
  try {
    const response = await axiosInstance.get(`/changed/${commUniqueNo}`);
    return response.data;
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    return e;
  }
};
