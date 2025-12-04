export interface PropertyDetail {
  id?: number;
  registName?: string;
  address?: string;
  buildingType?: string;
  commUniqueNo?: number;
  expireDate?: string;
}

export interface RegistryChanged {
  id: number;
  changedDate: string;
  detail: string;
}
