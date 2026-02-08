export interface PropertyDetail {
  commAddrLotNumber: string;
  commUniqueNo: string;
  expiredDate: string;
  id: number;
  registDate: string;
  resType: string;
  title: string;
  userId: number;
}

export interface RegistryChanged {
  id: number;
  changedDate: string;
  detail: string;
}
