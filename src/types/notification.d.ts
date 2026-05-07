export interface AddressInfo {
  type: string;
  address: string;
  uniqueNo: string;
}

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
  userId: number;
  title: string;
  commUniqueNo: string;
  purpose: string;
  receiptDate: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  content: string;
  targetPropertyRegistId: number;
  targetType: string;
  sendTime: string;
}
