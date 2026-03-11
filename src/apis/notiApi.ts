import axios from 'axios';

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
    const res = await axios.post(`/api/codef/search`, { keyword });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    return [];
  }
};
