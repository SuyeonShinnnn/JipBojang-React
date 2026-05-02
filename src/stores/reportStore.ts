import { create } from 'zustand';
import {
  analysisFraud,
  analyzeRightRisk,
  createReport,
  fetchCautionByOwnerName,
  fetchMyReports,
  fetchPriceHistory,
  fetchReportById,
  fetchRightAnalysisResult,
  rentDealPrice,
  updateTotalScore,
} from '../apis/reportApi';

import { useAuthStore } from './auth';
import type {
  Certificate,
  FormInfo,
  RentDealAnalysisResult,
  Report,
} from '../types/reportType';

interface ReportState {
  reportId: string | null;
  report: any | null;
  address: string | null;

  resType: string;
  commUniqueNo: string;

  priceResult: any;
  rightResult: any;
  fraudResult: any;

  totalScore: number | null;

  myReports: any[];
  cautionOwner: boolean | null;

  loading: boolean;
  error: string | null;

  setReportId: (id: string) => void;
  setAddress: (addr: string) => void;

  createReport: (reportDto: FormInfo) => Promise<Report>;
  fetchReport: (reportId: number) => Promise<Report>;
  fetchPrice: (reportId: number) => Promise<RentDealAnalysisResult>;
  fetchRight: (reportId: number, address: string) => Promise<Certificate>;
  fetchFraud: (reportId: number, userId: number) => Promise<void>;
  fetchPriceHistory: (reportId: number) => Promise<void>;
  fetchRightAnalysisResult: (reportId: number, userId: number) => Promise<void>;
  fetchMyReports: () => Promise<void>;
  updateTotalScore: (reportId: number, payload: any) => Promise<void>;
  fetchCautionByOwnerName: (ownerName: string) => Promise<void>;
}

export const useReportStore = create<ReportState>((set) => ({
  reportId: localStorage.getItem('reportId'),
  report: JSON.parse(localStorage.getItem('report') || 'null'),
  address: localStorage.getItem('address'),

  resType: '',
  commUniqueNo: '',

  priceResult: {
    priceHistory: [],
  },

  rightResult: {},
  fraudResult: {},

  totalScore: null,

  myReports: [],
  cautionOwner: null,

  loading: false,
  error: null,

  setReportId: (id) => {
    localStorage.setItem('reportId', id);
    set({ reportId: id });
  },

  setAddress: (addr) => {
    localStorage.setItem('address', addr);
    set({ address: addr });
  },

  // 리포트 생성
  createReport: async (reportDto) => {
    try {
      const userId = useAuthStore.getState().user.userId;
      const res = await createReport(reportDto, Number(userId));
      const id = String(res.data.reportId);

      localStorage.setItem('reportId', id);

      set({
        reportId: id,
      });

      return res.data;
    } catch (err) {
      console.error('리포트 생성 실패', err);
      throw err;
    }
  },

  // 리포트 단건 조회
  fetchReport: async (reportId) => {
    try {
      set({ loading: true });

      const userId = useAuthStore.getState().user.userId;
      const res = await fetchReportById(reportId, Number(userId));

      localStorage.setItem('report', JSON.stringify(res.data));

      // 가격 분석 기본 세팅
      set({
        report: res.data,
        priceResult: {
          ...res.data,
          priceHistory: res.data?.priceHistory || [],
        },
        loading: false,
        error: null,
      });

      return res.data;
    } catch (err) {
      set({
        error: '조회 실패',
        loading: false,
      });
      throw err;
    }
  },

  // 가격 분석
  fetchPrice: async (reportId) => {
    try {
      const userId = useAuthStore.getState().user.userId;
      const res = await rentDealPrice(reportId, Number(userId));

      set({
        priceResult: {
          ...res.data,
          priceHistory: res.data?.priceHistory || [],
        },
      });

      return res.data;
    } catch (err) {
      console.error('가격 분석 실패', err);
      throw err;
    }
  },

  // 시세 추이
  fetchPriceHistory: async (reportId) => {
    try {
      const res = await fetchPriceHistory(reportId);

      set((state) => ({
        priceResult: {
          ...state.priceResult,
          priceHistory: res.data.priceHistory || [],
        },
      }));
    } catch (err) {
      console.error('시세 추이 조회 실패', err);
    }
  },

  // 권리 분석
  fetchRight: async (reportId, address) => {
    try {
      const userId = useAuthStore.getState().user.userId;
      const res = await analyzeRightRisk(reportId, address, Number(userId));

      set({
        rightResult: res.data,
      });

      return res.data;
    } catch (err) {
      console.error('권리 분석 실패', err);
      throw err;
    }
  },

  // 등기부등본 조회
  // 전세권 / 권리 분석 조회
  fetchRightAnalysisResult: async (reportId, userId) => {
    if (!reportId || isNaN(reportId)) {
      set({
        error: '유효하지 않은 reportId입니다.',
        loading: false,
      });
      return;
    }

    try {
      set({ loading: true });

      const res = await fetchRightAnalysisResult(reportId, userId);
      let report = res.data;

      // gapgu / eulgu 기본값 처리
      if (!report.gapgu && report.gapItem) {
        report.gapgu = [
          {
            rightType: report.gapItem,
            details: report.gapMainInfo,
            date: report.gapDate,
          },
        ];
      }

      if (!report.eulgu && report.eulItem) {
        report.eulgu = [
          {
            rightType: report.eulItem,
            details: report.eulMainInfo,
            date: report.eulDate,
          },
        ];
      }

      let cautionOwner = null;

      // 임대인 주의 여부
      if (report.ownerName) {
        const delinquentRes = await fetchCautionByOwnerName(report.ownerName);
        cautionOwner = delinquentRes.data.cautious;
      }

      set({
        report,
        cautionOwner,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('권리 분석 조회 실패:', err);
      set({
        error: '조회 실패',
        loading: false,
      });
    }
  },

  // 전세 사기 분석
  fetchFraud: async (reportId, userId) => {
    try {
      const res = await analysisFraud(reportId, userId);

      set({
        fraudResult: res.data.analysis,
      });
    } catch (err) {
      console.error('사기 분석 실패', err);
    }
  },

  // 내 리포트 조회
  fetchMyReports: async () => {
    try {
      const res = await fetchMyReports();

      set({
        myReports: res.data,
      });
    } catch (err) {
      console.error('내 리포트 조회 실패', err);
    }
  },

  // 총 점수 업데이트
  updateTotalScore: async (reportId, payload) => {
    try {
      const userId = useAuthStore.getState().user.userId;
      const res = await updateTotalScore(reportId, Number(userId), payload);

      set({
        totalScore: res.data.totalScore,
      });
    } catch (err) {
      console.error('총 점수 업데이트 실패', err);
    }
  },

  // 임대인 이름 위험 여부 조회
  fetchCautionByOwnerName: async (ownerName) => {
    try {
      const res = await fetchCautionByOwnerName(ownerName);

      set({
        cautionOwner: res.data,
      });
    } catch (err) {
      console.error('임대인 이름 위험 여부 조회 실패', err);
    }
  },
}));
