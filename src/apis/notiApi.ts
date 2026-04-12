import axios from 'axios';
import axiosInstance from './axiosInstance';

export const getRegistedPropertyInfo = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/notification/registed/${id}`,
    );
    return response.data;
  } catch (e) {
    console.log('🚨오류 발생');
    return e;
  }
};

export const getRegistedPropertyDetail = async (
  userId: number,
  commUniqueNo?: number,
) => {
  try {
    const response = await axios.get(
      `/api/notification/regist/user/${userId}/uniqueNo/${commUniqueNo}`,
    );
    console.log(response.data[0]);
    return response.data;
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    throw e;
  }
};

export const searchAddress = async (keyword: string) => {
  try {
    const res = await axios.post(`/api/codef/search`, { keyword });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    return [];
  }
};
