import axiosInstance from './axiosInstance';

export const getRegistedPropertyInfo = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/notification/registed/${id}`);
    return response.data;
  } catch (e) {
    console.log('🚨오류 발생');
    return e;
  }
};

export const getRegistedPropertyDetail = async (commUniqueNo?: number) => {
  try {
    const response = await axiosInstance.get(
      `/notification/regist/uniqueNo/${commUniqueNo}`,
    );
    console.log(response.data[0]);
    return response.data;
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    return e;
  }
};

export const searchAddress = async (keyword: string) => {
  try {
    const res = await axiosInstance.post(`/codef/search`, { keyword });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log('🚨getRegistryChanged 오류 발생');
    return [];
  }
};
