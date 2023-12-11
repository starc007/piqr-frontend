import { toast } from "react-hot-toast";
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
  updateDailyPeopleFollowers: (id: string) => Promise<void>;
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
      const {
        filteredUsers,
        user,
        followingIds,
        allPosts,
        savedProfiles,
        userPosts,
        updateDailyPeopleFollowers,
      } = get();

      let getUser = filteredUsers.find((user) => user._id === id);
      let getSavedUser = savedProfiles.find((user) => user._id === id);
      const getAllPostOfUsers = allPosts.filter(
        (post) => post.user?._id === id
      );

      if (!getUser?.folowId?.followers?.includes(user?._id!)) {
        if (typeof getUser?.folowId?.followers !== "undefined") {
          getUser?.folowId?.followers!.push(user?._id!);
        } else {
          getUser = {
            ...getUser,
            folowId: {
              followers: [user?._id!],
            },
          } as ProfileResponse;

          const findIndex = filteredUsers.findIndex(
            (user) => user._id === getUser?._id
          );

          filteredUsers.splice(findIndex, 1, getUser);
        }

        set({
          filteredUsers: [...filteredUsers],
        });
      }

      if (!getSavedUser?.folowId?.followers?.includes(user?._id!)) {
        if (typeof getSavedUser?.folowId?.followers !== "undefined") {
          getSavedUser?.folowId?.followers!.push(user?._id!);
        } else {
          getSavedUser = {
            ...getSavedUser,
            folowId: {
              followers: [user?._id!],
            },
          } as ProfileResponse;

          const findIndex = savedProfiles.findIndex(
            (user) => user._id === getSavedUser?._id
          );

          savedProfiles.splice(findIndex, 1, getSavedUser);
        }

        set({
          savedProfiles: [...savedProfiles],
        });
      }

      if (getAllPostOfUsers.length > 0) {
        getAllPostOfUsers.forEach((post) => {
          if (!post?.user?.folowId?.followers?.includes(user?._id!)) {
            if (typeof post?.user?.folowId?.followers !== "undefined") {
              post?.user?.folowId?.followers!.push(user?._id!);
            } else {
              console.log("here");
              post!.user!.folowId = {
                followers: [user?._id!],
              };
            }
          }
        });
        set({
          allPosts: [...allPosts],
        });
      }

      if (userPosts.length > 0) {
        userPosts.forEach((post) => {
          if (!post?.user?.folowId?.followers?.includes(user?._id!)) {
            if (post?.user?.folowId) {
              post?.user?.folowId?.followers!.push(user?._id!);
            }
            if (!post?.user?.folowId) {
              post!.user!.folowId = {
                followers: [user?._id!],
              };
            }
          }
        });
        set({
          userPosts: [...userPosts],
        });
      }

      updateDailyPeopleFollowers(id);
      // followingIds.push(id as string);

      set({
        followingIds: [...followingIds, id as string],
      });

      const res = await __followUnfollowUser({
        id,
      });
      if (!res.success) {
        if (getAllPostOfUsers.length > 0) {
          getAllPostOfUsers.forEach((post) => {
            const findIndex = post?.user?.folowId?.followers!.findIndex(
              (id) => id === user?._id!
            );
            post?.user?.folowId?.followers!.splice(findIndex!, 1);
          });
          set({
            allPosts: [...allPosts],
          });
        }

        if (userPosts.length > 0) {
          userPosts.forEach((post) => {
            const findIndex = post?.user?.folowId?.followers!.findIndex(
              (id) => id === user?._id!
            );
            post?.user?.folowId?.followers!.splice(findIndex!, 1);
          });
          set({
            userPosts: [...userPosts],
          });
        }

        const getSavedProfile = savedProfiles.find((user) => user._id === id);
        const findIndexSave = getSavedProfile?.folowId?.followers!.findIndex(
          (id) => id === user?._id!
        );
        getSavedProfile?.folowId?.followers!.splice(findIndexSave!, 1);

        const getUser = filteredUsers.find((user) => user._id === id);
        const findIndex = getUser?.folowId?.followers!.findIndex(
          (id) => id === user?._id!
        );
        getUser?.folowId?.followers!.splice(findIndex!, 1);

        const newFollowingList = followingIds.filter((i) => i !== id);

        set({
          filteredUsers: [...filteredUsers],
          followingIds: [...newFollowingList],
          savedProfiles: [...savedProfiles],
        });
      }
    } catch (error) {
      console.log("Error following user", error);
    }
  },
  unfollowUser: async (id: string) => {
    try {
      const {
        filteredUsers,
        user,
        followingIds,
        allPosts,
        savedProfiles,
        userPosts,
        updateDailyPeopleFollowers,
      } = get();
      const getUser = filteredUsers.find((user) => user._id === id);
      const getSavedProfile = savedProfiles.find((user) => user._id === id);

      const getAllPostOfUsers = allPosts?.filter(
        (post) => post.user?._id === id
      );

      if (getAllPostOfUsers.length > 0) {
        getAllPostOfUsers.forEach((post) => {
          const findIndex = post?.user?.folowId?.followers!.findIndex(
            (id) => id === user?._id!
          );
          post?.user?.folowId?.followers!.splice(findIndex!, 1);
        });
        set({
          allPosts: [...allPosts],
        });
      }

      if (userPosts.length > 0) {
        userPosts.forEach((post) => {
          const findIndex = post?.user?.folowId?.followers!.findIndex(
            (id) => id === user?._id!
          );
          post?.user?.folowId?.followers!.splice(findIndex!, 1);
        });
        set({
          userPosts: [...userPosts],
        });
      }

      const findIndexSave = getSavedProfile?.folowId?.followers!.findIndex(
        (id) => id === user?._id!
      );
      getSavedProfile?.folowId?.followers!.splice(findIndexSave!, 1);

      const findIndex = getUser?.folowId?.followers!.findIndex(
        (id) => id === user?._id!
      );
      getUser?.folowId?.followers!.splice(findIndex!, 1);
      const newFollowingIds = followingIds.filter((i) => i !== id);
      updateDailyPeopleFollowers(id);

      set({
        filteredUsers: [...filteredUsers],
        followingIds: [...newFollowingIds],
        savedProfiles: [...savedProfiles],
      });
      const res = await __followUnfollowUser({
        id,
      });
      if (!res.success) {
        if (getAllPostOfUsers.length > 0) {
          getAllPostOfUsers.forEach((post) => {
            if (!post?.user?.folowId?.followers?.includes(user?._id!)) {
              if (post?.user?.folowId) {
                post?.user?.folowId?.followers!.push(user?._id!);
              }
              if (!post?.user?.folowId) {
                post!.user!.folowId = {
                  followers: [user?._id!],
                };
              }
            }
          });
          set({
            allPosts: [...allPosts],
          });
        }

        if (userPosts.length > 0) {
          userPosts.forEach((post) => {
            if (!post?.user?.folowId?.followers?.includes(user?._id!)) {
              if (post?.user?.folowId) {
                post?.user?.folowId?.followers!.push(user?._id!);
              }
              if (!post?.user?.folowId) {
                post!.user!.folowId = {
                  followers: [user?._id!],
                };
              }
            }
          });
          set({
            userPosts: [...userPosts],
          });
        }

        if (getUser?.folowId) {
          getUser?.folowId?.followers!.push(user?._id!);
        }
        if (!getUser?.folowId) {
          getUser!.folowId = {
            followers: [user?._id!],
          };
        }
        followingIds.push(id as string);
        set({
          filteredUsers: [...filteredUsers],
          followingIds: [...followingIds],
        });
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

  updateDailyPeopleFollowers: async (id) => {
    const { user } = get();

    const getDailyUSers = localStorage.getItem("dailyUsers");
    const decrypted = decodeURIComponent(getDailyUSers!);

    const dailyNewUsers = JSON.parse(decrypted) as ProfileResponse[];

    if (dailyNewUsers.length > 0) {
      let getUser = dailyNewUsers.find((user) => user._id === id);

      if (getUser) {
        if (!getUser?.folowId?.followers?.includes(user?._id!)) {
          if (getUser?.folowId) {
            getUser?.folowId?.followers!.push(user?._id!);
          } else {
            getUser = {
              ...getUser,
              folowId: {
                followers: [user?._id!],
              },
            } as ProfileResponse;

            const findIndex = dailyNewUsers.findIndex(
              (user) => user._id === getUser?._id
            );

            if (findIndex !== -1) {
              dailyNewUsers.splice(findIndex, 1, getUser);
            }
          }

          localStorage.setItem(
            "dailyUsers",
            encodeURIComponent(JSON.stringify(dailyNewUsers))
          );

          set({
            dailyNewUsers: [...dailyNewUsers],
          });
          // followingIds.push(id as string);
        } else {
          const findIndex = getUser?.folowId?.followers!.findIndex(
            (id) => id === user?._id!
          );

          if (findIndex !== -1)
            getUser?.folowId?.followers!.splice(findIndex!, 1);

          localStorage.setItem(
            "dailyUsers",
            encodeURIComponent(JSON.stringify(dailyNewUsers))
          );

          set({
            dailyNewUsers: [...dailyNewUsers],
            // followingIds: [...followingIds],
          });
        }
      }
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
