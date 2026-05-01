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

  minPirce: number;
  maxPrice: number;
  avgPrice: number;

  priceScore: number;
  rightsScore: number;
  fraudScore: number;

  priceComment: string;
  rightsComment: string;
  fraudComment: string;

  score: number;
  riskComment: number;

  userId: number;
  certificateId: number;

  createdAt: string;
  updatedAt: string;

  priceHistor: PriceHistory[];
}

export interface RentDealAnalysisResult {
  report: Report;
  pirceHistory: PriceHistory[];
}
