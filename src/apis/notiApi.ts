import axios from 'axios';
import axiosInstance from './axiosInstance';

export const getRegistedPropertyInfo = async (id: number) => {
  try {
    const response = await axios.get(`/api/notification/regist/${id}`);
    return response.data;
  } catch (e) {
    console.log('🚨오류 발생');
    return e;
  }
};

export const getRegistryChanged = async (
  userId: number,
  commUniqueNo?: number,
) => {
  try {
    const response = await axios.get(
      `/api/notification/regist/user/${userId}/regist/${commUniqueNo}`,
    );
    return response.data;
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    return e;
  }
};

export const searchAddress = async (keyword: string) => {
  try {
    // const response = await axiosInstance.get(`/address/${keyword}`);
    // return response.data;
    return [
      {
        type: '집합건물',
        address: '서울특별시 테헤란로',
        uniqueNo: '20102010',
      },
      {
        type: '집합건물',
        address: '서울특별시 테헤란로',
        uniqueNo: '20102011',
      },
    ];
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    return [];
  }
};
