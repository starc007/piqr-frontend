import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";
import { __getNotifications, __markNotificationsAsRead } from "@api/api";

export interface INotificationsStore {
  allNotifications: INotificationResponse[];
  notificationsPageSize: number;
  notificationsLoading: boolean;
  fetchNotifications: (pageNo: number) => Promise<void>;
  fetchReceivedNotifications: (data: INotificationResponse[]) => Promise<void>;
  markNotificationsAsRead: (id: string) => Promise<void>;
  setNotificationsLoading: (loadingState: boolean) => void;
}

export const initialNotificationsStore = {
  allNotifications: [],
  notificationsLoading: false,
  notificationsPageSize: 0,
};

export const createNotificationsSlice: StateCreator<
  AppState,
  [],
  [],
  INotificationsStore
> = (set, get) => ({
  ...initialNotificationsStore,
  fetchNotifications: async (pageNo: number) => {
    try {
      set({
        notificationsLoading: true,
      });
      const response = await __getNotifications({ pageNo });
      if (response.success) {
        const { allNotifications } = get();
        const data = response.data?.notifications || [];
        set({
          allNotifications: [...allNotifications, ...data],
          notificationsPageSize: response.data?.totalPages || 0,
          notificationsLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        notificationsLoading: false,
      });
    }
  },
  fetchReceivedNotifications: async (data) => {
    set({
      allNotifications: data,
    });
  },
  markNotificationsAsRead: async (id: string) => {
    try {
      const res = await __markNotificationsAsRead({ id });
      if (res.success) {
        const { allNotifications } = get();
        const updatedNotifications = allNotifications.map((notification) => {
          if (notification._id === id) {
            return {
              ...notification,
              read: true,
            };
          }
          return notification;
        });
        set({
          allNotifications: updatedNotifications,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  setNotificationsLoading: (loadingState) => {
    set({
      notificationsLoading: loadingState,
    });
  },
});
