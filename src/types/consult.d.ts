export interface ExpertInfo {
  id: number;
  userId: number;
  name: string;
  licenseNumber: string;
  company: string;
  address: string;
  region: string;
  phone: string;
  startDate: string;
  isInsured: boolean;
  profileImage: string;
  rating: number;
  reviewcount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface ChatMessage {
  messageId?: number;
  roomId: number;
  senderId: number;
  content: string;
  type: string;
  createdAt: string;
}
