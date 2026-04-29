import { create } from 'zustand';
import {
  analysisFraud,
  analyzeRightRisk,
  createReport,
  fetchReportById,
  rentDealPrice,
} from '../apis/reportApi';

import { useAuthStore } from './auth';
import type { FormInfo } from '../types/reportType';

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

  createReport: (reportDto: FormInfo) => Promise<any>;
  fetchReport: (reportId: number) => Promise<any>;
  fetchPrice: (reportId: number) => Promise<any>;
  fetchRight: (reportId: number, address: string) => Promise<any>;
  fetchFraud: (reportId: number) => Promise<any>;
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

    set({
      reportId: id,
    });
  },

  setAddress: (addr) => {
    localStorage.setItem('address', addr);

    set({
      address: addr,
    });
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

  // 리포트 조회
  fetchReport: async (reportId) => {
    try {
      set({
        loading: true,
      });
      const userId = useAuthStore.getState().user.userId;

      const res = await fetchReportById(reportId, Number(userId));

      localStorage.setItem('report', JSON.stringify(res.data));

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
      const res = await rentDealPrice(reportId);
      console.log(res.data);
      set({
        priceResult: {
          ...res.data,
          priceHistory: res.data?.priceHistory || [],
        },
      });

      console.log('가격 분석 차트 데이터', res.data?.priceHistory);

      return res.data;
    } catch (err) {
      console.error('가격 분석 실패', err);
      throw err;
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

  // 사기 분석
  fetchFraud: async (reportId) => {
    try {
      const userId = useAuthStore.getState().user.userId;

      const res = await analysisFraud(reportId, Number(userId));

      set({
        fraudResult: res.data.analysis,
      });

      return res.data;
    } catch (err) {
      console.error('사기 분석 실패', err);
      throw err;
    }
  },
}));
