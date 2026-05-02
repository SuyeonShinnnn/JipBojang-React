export interface FormInfo {
  address: string;
  type: string;
  amount: number;
}

export interface PriceHistory {
  fullDate: string;
  deposit: number;
}

export interface Report {
  reportId: number;
  address: string;
  addressBungi: string;

  type: string;
  amount: number;

  minPrice: number;
  maxPrice: number;
  avgPrice: number;

  priceScore: number;
  rightsScore: number;
  fraudScore: number;

  priceComment: string;
  rightsComment: string;
  fraudComment: string;

  score: number;
  riskComment: string;

  userId: number;
  certificateId: number;

  createdAt: string;
  updatedAt: string;

  priceHistory: PriceHistory[];
}

export interface RentDealAnalysisResult {
  report: Report;
  priceHistory: PriceHistory[];
}

export interface Certificate {
  certificateId: number;

  address: string;
  deposit: number;

  hasCollateral: boolean;
  priorClaim: number;
  hasRight: boolean;
  registrationDetails: string;
  entryCount: number;

  ownerName: string;
  finalShare: number;
  note: string;

  gapItem: string;
  gapDate: string;
  gapRegistrar: string;
  gapMainInfo: string;

  eulItem: string;
  eulDate: string;
  eulRegistrar: string;
  eulMainInfo: string;

  LtvRatio: number;
  guaranteeLimit: number;

  isSeized: boolean;
  isProvisionallySeized: boolean;
  isInjunction: boolean;
  hasLeaseRight: boolean;
  isIllegalBuilding: boolean;
  isTrustSalePossible: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface FraudAnalysisResponse {
  reportId: number;
  amount: number;
  avgPrice: number;
  guaranteeLimit: number;

  isSeized: boolean;
  isProvisionallySeized: boolean;
  isInjunction: boolean;
  hasLeaseRight: boolean;
  isIllegalBuilding: boolean;
  isTrustSalePossible: boolean;

  analysis: Analysis;
}

export interface Analysis {
  ownerName: string;
  priorClaim: number;
}
