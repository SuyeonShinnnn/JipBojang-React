import type { FormInfo } from '../types/reportType';
import axiosInstance from './axiosInstance';

// 리포트 생성
export const createReport = (formInfo: FormInfo, userId: number) => {
  return axiosInstance.post(`/report/create/${userId}`, formInfo);
};

// 리포트 조회
export const fetchReportById = (reportId: number, userId:number) => {
  return axiosInstance.get(`/report/${reportId}/user/${userId}`);
};

// 가격 분석 요청
export const rentDealPrice = (reportId: number) => {
  return axiosInstance.get('/report/rent-deal-analysis', {
    params: { reportId },
  });
};

// 시세 추이
export const fetchPriceHistory = (reportId: number) => {
  return axiosInstance.get(`/report/price-history/${reportId}`);
};

// 권리 분석 요청
export const analyzeRightRisk = (
  reportId: number,
  address: string,
  userId: number,
) => {
  if (!reportId) throw new Error('reportId가 필요합니다.');
  if (!address) throw new Error('주소가 필요합니다.');

  return axiosInstance.post(`/report/right-analysis/${userId}`, {
    reportId: reportId,
    address: address.split('[')[0].trim(),
  });
};

// 전세 사기 분석
export const analysisFraud = (reportId: number, userId: number) => {
  return axiosInstance.get(`/report/fraud-analysis/${userId}`, {
    params: { reportId },
  });
};

// 등기부등본 조회
export const fetchRightAnalysisResult = (reportId: number) => {
  return axiosInstance.get(`/report/certificate/${reportId}`);
};

// 내 리포트 조회
export const fetchMyReports = () => {
  return axiosInstance.get('/my-page/reports');
};

// 총 점수 업데이트
export const updateTotalScore = (reportId: number, payload: any) => {
  return axiosInstance.patch(`/report/score/${reportId}`, payload);
};

// 임대인 이름 위험 여부 조회
export const fetchCautionByOwnerName = (ownerName: string) => {
  return axiosInstance.get('/report/landlord/check', {
    params: { ownerName },
  });
};
