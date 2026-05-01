import { create } from 'zustand';
import type { RegistryChanged } from '../types/notification';

export interface NotificationItem extends RegistryChanged {
  isRead: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (message: RegistryChanged) => void;
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
