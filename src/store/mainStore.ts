import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

import {
  // Login
  LoginState,
  initialLoginState,
  createLoginSlice,

  // User
  UserState,
  initialUserState,
  createUserSlice,

  // Modals
  ModalState,
  createModalSlice,

  // Post
  IPostStore,
  initialPostState,
  createPostSlice,

  // Opportunity
  IOpportunityStore,
  initialOpportunityState,
  createOpportunitySlice,

  // Follow
  IFollowState,
  initialFollowState,
  createFollowSlice,

  // Notifications
  INotificationsStore,
  initialNotificationsStore,
  createNotificationsSlice
} from "./stores";

export type AppState = LoginState &
  UserState &
  ModalState &
  IPostStore &
  IOpportunityStore &
  IFollowState &
  INotificationsStore;

export const initialState = {
  ...initialLoginState,
  ...initialUserState,
  ...initialPostState,
  ...initialOpportunityState,
  ...initialFollowState,
  initialNotificationsStore
};

export const useAppBoundStore = createWithEqualityFn<AppState>()(
  (...a) => ({
    ...createLoginSlice(...a),
    ...createUserSlice(...a),
    ...createModalSlice(...a),
    ...createPostSlice(...a),
    ...createOpportunitySlice(...a),
    ...createFollowSlice(...a),
    ...createNotificationsSlice(...a)
  }),
  shallow
);
