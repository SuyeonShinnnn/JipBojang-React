import axios from 'axios';

export const getBasicInfo = async (addressName: string) => {
  try {
    const response = await axios.get('/api/map/info', {
      params: { address: addressName },
    });
    return response.data;
  } catch (error) {
    console.error('기본정보 가져오기 실패:', error);
    return null;
  }
};

export const getDepositInfo = async (addressName: string) => {
  try {
    const response = await axios.get('/api/map/deposit', {
      params: { address: addressName },
    });
    return response.data;
  } catch (error) {
    console.error('적정보증금 가져오기 실패:', error);
    return null;
  }
};
