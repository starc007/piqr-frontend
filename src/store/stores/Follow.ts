import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";
import {
  __getFollowersFollowingIds,
  __followUnfollowUser,
  __getFollowersFollowing,
} from "@api";

export interface IFollowState {
  followingIds: string[];
  usersNetwork: {
    user: ProfileResponse | null;
    followers: ProfileResponse[];
    following: ProfileResponse[];
  };
  followUser: (id: string) => Promise<void>;
  unfollowUser: (id: string) => Promise<void>;
  getFollowersFollowingIds: () => Promise<void>;
  getFollowersFollowing: (id: string) => Promise<void>;
}

export const initialFollowState = {
  followingIds: [],
  usersNetwork: {
    user: null,
    followers: [],
    following: [],
  },
};

export const createFollowSlice: StateCreator<AppState, [], [], IFollowState> = (
  set,
  get
) => ({
  ...initialFollowState,
  followUser: async (id) => {
    try {
      const res = await __followUnfollowUser({
        id,
      });

      if (res.success) {
        const { allPosts, filteredUsers, dailyNewUsers } = get();
        const getUser = allPosts.find((post) => post.user._id === id);
        const getFilteredUser = filteredUsers.find((user) => user._id === id);
        const getDailyNewUser = dailyNewUsers.find((user) => user._id === id);
        if (getUser) getUser.isFollowing = true;
        if (getFilteredUser) getFilteredUser.isFollowing = true;
        if (getDailyNewUser) getDailyNewUser.isFollowing = true;
      }
    } catch (error) {
      console.log("Error following user", error);
    }
  },
  unfollowUser: async (id: string) => {
    try {
      const res = await __followUnfollowUser({
        id,
      });

      if (res.success) {
        const { allPosts, filteredUsers, dailyNewUsers } = get();
        const getUser = allPosts.find((post) => post.user._id === id);
        const getFilteredUser = filteredUsers.find((user) => user._id === id);
        const getDailyNewUser = dailyNewUsers.find((user) => user._id === id);
        if (getUser) getUser.isFollowing = false;
        if (getFilteredUser) getFilteredUser.isFollowing = false;
        if (getDailyNewUser) getDailyNewUser.isFollowing = false;
      }
    } catch (error) {
      console.log("Error unfollowing user", error);
    }
  },
  getFollowersFollowingIds: async () => {
    try {
      const res = await __getFollowersFollowingIds();
      if (res.success) {
        set({
          followingIds: res.data,
        });
      }
    } catch (error) {
      console.log("Error getting followers and following", error);
    }
  },

  getFollowersFollowing: async (id) => {
    try {
      const res = await __getFollowersFollowing({
        id,
      });
      if (res.success) {
        set({
          usersNetwork: res.data,
        });
      }
    } catch (error) {
      console.log("Error getting followers and following", error);
    }
  },
});
