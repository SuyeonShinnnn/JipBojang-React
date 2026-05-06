import axiosInstance from './axiosInstance';

export const getRegistedPropertyInfo = async (id: number) => {
  return await axiosInstance.get(`/notification/registed/${id}`);
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
    throw e;
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

export const deleteProperty = async (retgistId?: number) => {
  try {
    await axiosInstance.delete(`/api/notification/${retgistId}`);
  } catch (e) {
    throw e;
  }
};
