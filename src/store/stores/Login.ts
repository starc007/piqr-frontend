import type { StateCreator } from "zustand";
import { __checkSession, __logout, __checkUsername } from "@api";
import type { AppState } from "../mainStore";

export interface LoginState {
  user: ProfileResponse | null;
  isLoggedIn: boolean;
  message?: string | null;
  loginLoading: boolean;
  accessToken?: string | null;
  usernameMsg: string | null;
  isSuccess: boolean;
  isProfilesFetched?: boolean;
  isPostsFetched?: boolean;
  logout: () => Promise<void>;
  checkUsername: (username: string) => Promise<void>;
  setUsernameMsg: (usernameMsg: string | null) => void;
  checkSession: () => Promise<void>;
  reset: () => void;
  setLoginLoading: (loginLoading: boolean) => void;
}

export const initialLoginState = {
  user: null,
  isLoggedIn: false,
  message: null,
  usernameMsg: null,
  isSuccess: false,
  loginLoading: true,
  accessToken: null,
  isProfilesFetched: false,
  isPostsFetched: false,
};

export const createLoginSlice: StateCreator<AppState, [], [], LoginState> = (
  set,
  get
) => ({
  ...initialLoginState,
  checkSession: async () => {
    const { reset } = get();
    set({ profileLoading: true });
    try {
      const response = await __checkSession();
      const { success, data } = response;

      if (success) {
        set({
          isLoggedIn: true,
          loginLoading: false,
          profileLoading: false,
          user: data?.user,
          accessToken: data?.accessToken,
          dataToUpdate: data?.user,
        });
      } else {
        reset();
      }
    } catch (error: any) {
      console.log(error);
      reset();
    }
  },
  logout: async () => {
    try {
      const response = await __logout();
      const { success } = response;
      if (success) {
        const { reset } = get();
        reset();
        localStorage.removeItem("dailyUsers");
        localStorage.removeItem("dailyUsersTime");
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkUsername: async (username: string) => {
    try {
      const res = await __checkUsername({ username });
      if (res?.success) {
        if (res?.type === 1) {
          set({
            usernameMsg: null,
          });
        }
        if (res?.type === 2 || res?.type === 0) {
          set({
            usernameMsg: res?.msg,
          });
        }
      }
    } catch (error: any) {
      set({
        usernameMsg: error?.response?.data?.msg,
      });
      console.log(error);
    }
  },
  setUsernameMsg: (usernameMsg: string | null) => {
    set({
      usernameMsg,
    });
  },
  reset: () => {
    set({
      user: null,
      isLoggedIn: false,
      loginLoading: false,
      education: [],
      workExp: [],
      socialLinks: undefined,
      activity: [],
      message: null,
      usernameMsg: null,
      messageList: [],
      userMessages: [],
      profileLoading: false,
      accessToken: null,
    });
  },
  setLoginLoading: (loginLoading: boolean) => set({ loginLoading }),
});
