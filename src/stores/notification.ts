import { create } from 'zustand';

export interface NotificationItem {
  id: number;
  message: string;
  createdAt?: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (message: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message) =>
    set((state) => ({
      notifications: [
        {
          id: Date.now(),
          message,
          isRead: false,
        },
        ...state.notifications,
      ],
    })),
}));
