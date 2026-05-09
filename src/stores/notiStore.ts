import { create } from 'zustand';
import type { Notification } from '../types/notification';

export interface NotificationItem extends Notification {
  isRead: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (message: Notification) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message) =>
    set((state) => ({
      notifications: [
        {
          ...message,
          isRead: false,
        },
        ...state.notifications,
      ],
    })),
}));
