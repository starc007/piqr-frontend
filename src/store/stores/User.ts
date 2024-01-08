import {
  _getAllMessageList,
  __addActivity,
  __addEducation,
  __addExperience,
  __addSocialLink,
  __deleteActivity,
  __deleteEducation,
  __deleteExperience,
  __endorseUser,
  __getAllUsers,
  __getMessageOfUser,
  __getUserDetailsByUsername,
  __getUserProfile,
  __sendMessage,
  __updateActivity,
  __updateEducation,
  __updateExperience,
  __updateProfile,
  __getUsersByCategory,
  __getNewPeoplDailyToMeet,
  __getSavedUsers,
  __saveUser,
  __updateReadBy,
} from "@api";
import { toast } from "react-hot-toast";
import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";
import { NOT_ALLOWED_PEOPLE } from "@utils";

export interface UserState {
  allUsers: ProfileResponse[];
  filteredUsers: ProfileResponse[];
  savedProfiles: ProfileResponse[];
  socialLinks: SocialsResponse | undefined;
  dataToUpdate: Partial<UpdateUserProps>;
  education: EducationType[];
  workExp: WorkExperienceType[];
  activity: ActivityItemResponse[];
  selectedId: string | null;
  totalPages: number;
  messageList: MessageListResponse[];
  userMessages: MessageResponse[];
  usersLoading: boolean;
  profileLoading: boolean;
  userDetailsByUsername: UserResponse | null;
  notifications: MessageListResponse[];
  selectedChat: {
    id: string;
    profile: ProfileResponse;
  } | null;
  dailyNewUsers: ProfileResponse[];
  profilePercent: number;
  isUserDetailsFetched: boolean;
  getAllUsers: (page: number, type: string) => Promise<void>;
  updateUser: (data: Partial<UpdateUserProps>) => Promise<void>;
  endorseUser: (data: EndorseType) => Promise<void>;
  addWorkExperience: (data: WorkExperienceType) => Promise<void>;
  addEducation: (data: EducationType) => Promise<void>;
  addSocials: (data: SocialsResponse) => Promise<void>;
  addActivity: (data: ActivityType) => Promise<void>;
  deleteWorkExperience: (id: string) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  setDatatoUpdate: (data: Partial<UpdateUserProps>) => void;
  getUser: () => Promise<void>;
  // getUsersByUsername: (username: string) => Promise<void>;
  updateActivity: (data: Partial<ActivityType>, id: string) => Promise<void>;
  setSelectedId: (id: string) => void;
  updateEducation: (data: Partial<EducationType>, id: string) => Promise<void>;
  updateWorkExperience: (
    data: Partial<WorkExperienceType>,
    id: string
  ) => Promise<void>;
  getMessageList: () => Promise<void>;
  getUserMessages: (id: string) => Promise<void>;
  sendMessage: (data: MessageType) => Promise<void>;
  getUserdDetailsByUsername: (username: string) => Promise<void>;
  // likeUser: (id: string, isLike: boolean) => Promise<void>;
  setFilteredUsers: (users: ProfileResponse[], page?: number) => void;
  getUsersByCategory: (data: CategoryProp) => Promise<void>;
  setUsersLoading: (loading: boolean) => void;
  setMessageList: (data: MessageListResponse[]) => void;
  resetAllUsers: () => void;
  setUserMessages: (data: MessageResponse) => void;
  setNotifications: (data: MessageListResponse[]) => void;
  setSelectedChat: (
    data: {
      id: string;
      profile: ProfileResponse;
    } | null
  ) => void;
  updateReadBy: (id: string) => Promise<void>;
  getNewUserDailyToMeet: () => Promise<void>;
  setProfilePercent: (percent: number) => void;
  saveUser: (id: string, shouldSave: boolean) => Promise<void>;
  getSavedUsers: (page: number) => Promise<void>;
  setIsUserDetailsFetched: (isFetched: boolean) => void;
}

export const initialUserState = {
  allUsers: [],
  filteredUsers: [],
  savedProfiles: [],
  socialLinks: undefined,
  dataToUpdate: {},
  education: [],
  workExp: [],
  activity: [],
  selectedId: null,
  messageList: [],
  userMessages: [],
  userDetailsByUsername: null,
  usersLoading: false,
  profileLoading: false,
  totalPages: 0,
  notifications: [],
  selectedChat: null,
  dailyNewUsers: [],
  profilePercent: 0,
  isUserDetailsFetched: false,
};

export const createUserSlice: StateCreator<AppState, [], [], UserState> = (
  set,
  get
) => ({
  ...initialUserState,
  setIsUserDetailsFetched: (isFetched) =>
    set({ isUserDetailsFetched: isFetched }),
  setUsersLoading: (loading) => set({ usersLoading: loading }),
  getAllUsers: async (page, type) => {
    try {
      const res = await __getAllUsers({
        page,
        type,
      });
      if (res?.success) {
        const { allUsers } = get();
        if (type === "top") {
          const newuser =
            page > 0
              ? [...allUsers, ...res?.data?.users!]
              : [...res?.data?.users!];

          const filterUser = newuser?.filter(
            (user) =>
              user?.firstTime === false &&
              NOT_ALLOWED_PEOPLE.includes(user._id) === false
          );

          set({
            allUsers: filterUser,
            usersLoading: false,
            totalPages: res?.data?.totalPages,
            filteredUsers: filterUser,
            isProfilesFetched: true,
          });
        } else {
          const newuser =
            page > 0
              ? [...allUsers, ...res?.data?.users!]
              : ([...res?.data?.users!] as any[]);
          const filterUser = newuser?.filter(
            (user) => user?.firstTime === false
          );

          set({
            allUsers: filterUser,
            usersLoading: false,
            totalPages: res?.data?.totalPages,
            filteredUsers: filterUser,
            isProfilesFetched: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (data) => {
    try {
      // const { setDatatoUpdate } = get();
      const response = await __updateProfile(data);
      if (response.success) {
        set({
          user: response.data,
          isSuccess: true,
        });
        // setDatatoUpdate({});
        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },

  addSocials: async (data) => {
    try {
      const response = await __addSocialLink({
        data,
      });
      if (response.success) {
        set({
          socialLinks: response.data,
          addLinkModal: false,
        });
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  setDatatoUpdate: (data) => {
    set({
      dataToUpdate: data,
    });
  },
  getUser: async () => {
    const { user, reset } = get();
    try {
      const res = await __getUserProfile();
      if (res?.success) {
        set({
          dataToUpdate: user!,
          user: user,
          socialLinks: res?.data?.socials,
          education: res?.data?.education,
          workExp: res?.data?.experience,
          activity: res?.data?.activities,
          loginLoading: false,
          isUserDetailsFetched: true,
        });
      } else {
        reset();
      }
    } catch (error) {
      reset();
      console.log(error);
    }
  },
  getNewUserDailyToMeet: async () => {
    try {
      const getDailyUSers = localStorage.getItem("dailyUsers");
      const getDailyUSersTime = localStorage.getItem("dailyUsersTime");
      const decrypted = decodeURIComponent(getDailyUSers!);

      const prevDate = new Date(parseInt(getDailyUSersTime!));

      const currentDate = new Date();

      //check if new day has started
      if (
        prevDate.getDate() === currentDate.getDate() && // same day
        prevDate.getMonth() === currentDate.getMonth() && // same month
        prevDate.getFullYear() === currentDate.getFullYear() // same year
      ) {
        set({
          dailyNewUsers: JSON.parse(decrypted),
        });
        return;
      }

      const res = await __getNewPeoplDailyToMeet();
      if (res?.success) {
        const usersEncrypt = encodeURIComponent(JSON.stringify(res.data));
        localStorage.setItem("dailyUsers", usersEncrypt);
        localStorage.setItem("dailyUsersTime", Date.now().toString());
        set({
          dailyNewUsers: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  addEducation: async (data) => {
    try {
      const response = await __addEducation({
        data,
      });
      if (response.success) {
        const { education } = get();
        set({
          education: [response.data!, ...education],
          addEducationModal: false,
        });
        toast.success("Education added!!");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },

  updateEducation: async (data, id) => {
    try {
      const { education } = get();
      const res = await __updateEducation({
        data,
        id,
      });
      if (res.success) {
        set({
          education: education.map((item) =>
            item._id === id ? res.data! : item
          ),
          addEducationModal: false,
          selectedId: null,
        });
        toast.success("updated!!");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },

  addWorkExperience: async (data) => {
    try {
      const response = await __addExperience({
        data,
      });
      if (response.success) {
        const { workExp } = get();
        set({
          workExp: [response.data!, ...workExp],
          addPositionModal: false,
        });
        toast.success("Work experience added!!");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },

  updateWorkExperience: async (data, id) => {
    try {
      const { workExp } = get();
      const res = await __updateExperience({
        data,
        id,
      });
      if (res.success) {
        set({
          workExp: workExp.map((item) => (item._id === id ? res.data! : item)),
          addPositionModal: false,
          selectedId: null,
        });
        toast.success("updated!!");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  deleteEducation: async (id) => {
    try {
      const { education } = get();
      const res = await __deleteEducation({
        id,
      });
      if (res.success) {
        set({
          education: education.filter((item) => item._id !== id),
        });
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  deleteWorkExperience: async (id) => {
    try {
      const { workExp } = get();
      const res = await __deleteExperience({
        id,
      });
      if (res.success) {
        set({
          workExp: workExp.filter((item) => item._id !== id),
        });
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  addActivity: async (data) => {
    try {
      const { activity } = get();
      const res = await __addActivity({
        data,
      });
      if (res.success) {
        set({
          activity: [res.data!, ...activity],
          addHighlightModal: false,
        });
        toast.success("Added!!");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  deleteActivity: async (id) => {
    try {
      const { activity } = get();
      const res = await __deleteActivity({
        id,
      });
      if (res.success) {
        set({
          activity: activity.filter((item) => item._id !== id),
        });
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  updateActivity: async (data, id) => {
    try {
      const { activity } = get();
      const res = await __updateActivity({
        data,
        id,
      });
      if (res.success) {
        set({
          activity: activity.map((item) =>
            item._id === id ? res.data! : item
          ),
          addHighlightModal: false,
          selectedId: null,
        });
        toast.success("updated!!");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  setSelectedId: (id) => set({ selectedId: id }),
  endorseUser: async (data) => {
    try {
      const res = await __endorseUser({
        endorseTo: data.endorseTo,
        message: data.message,
      });
      if (res.success) {
        const { allUsers, user } = get();
        const endorse = {
          _id: new Date().getTime().toString(),
          message: data.message,
          user: user,
          endorseTo: data.endorseTo,
        };
        set({
          allUsers: allUsers.map((item) => {
            if (item._id === data.endorseTo) {
              return {
                ...item,
                endorsements: [...item.endorsements, endorse],
              };
            }
            return item;
          }),
        });
        toast.success("Endorsed!!");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  getMessageList: async () => {
    try {
      const res = await _getAllMessageList();
      if (res.success) {
        const { user } = get();
        const isNewMessage = res?.data?.map((item) => {
          const isReadByCurrentUser =
            item?.readBy?.toString() === user?._id.toString();
          const isSentByCurrentUser =
            item?.sender?.toString() === user?._id?.toString();

          const isRead =
            item.readBy === null
              ? item?.profile1._id?.toString() === user?._id.toString()
              : isSentByCurrentUser
              ? true
              : isReadByCurrentUser
              ? true
              : false;
          if (!isRead) {
            return item;
          }
        });
        set({
          messageList: res.data,
          notifications: isNewMessage?.filter(
            (item) => item !== undefined
          ) as MessageListResponse[],
        });
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  getUserMessages: async (id) => {
    try {
      const res = await __getMessageOfUser({
        id,
      });
      if (res.success) {
        set({
          userMessages: res.data,
        });
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  sendMessage: async (data) => {
    try {
      const res = await __sendMessage({
        message: data.message,
        uid: data.uid,
      });
      if (res.success) {
        const { userMessages, user } = get();
        set({
          userMessages: [
            ...userMessages,
            {
              message: data.message,
              sender: user?._id!,
              timestamp: Date.now(),
              _id: Date.now().toString(),
            },
          ],
        });
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  getUserdDetailsByUsername: async (username) => {
    try {
      const res = await __getUserDetailsByUsername({
        username,
      });
      if (res.success) {
        set({
          userDetailsByUsername: res.data,
        });
      }
    } catch (error: any) {
      set({
        userDetailsByUsername: null,
      });
    }
  },

  setFilteredUsers: (data, page) =>
    set({ filteredUsers: data, totalPages: page }),
  getUsersByCategory: async (data) => {
    try {
      const res = await __getUsersByCategory({
        data,
      });

      if (res.success) {
        const filterUser = res?.data?.users?.filter(
          (user) => user?.firstTime === false
        );

        const { filteredUsers } = get();
        const newData =
          data?.page === 0 ? filterUser : [...filteredUsers, ...filterUser!];
        set({
          filteredUsers: newData,
          usersLoading: false,
          totalPages: res?.data?.totalPages,
        });
      }
    } catch (error: any) {
      console.log("err", error);
      set({
        usersLoading: false,
      });
    }
  },
  setMessageList: (data) => set({ messageList: data }),
  resetAllUsers: () => set({ filteredUsers: [], totalPages: 0 }),
  setUserMessages: (data) => {
    const { userMessages } = get();
    set({
      userMessages: [...userMessages, data],
    });
  },
  setNotifications: (data) => {
    set({
      notifications: data,
    });
  },
  setSelectedChat: (data) => set({ selectedChat: data }),
  updateReadBy: async (id) => {
    try {
      const res = await __updateReadBy({
        msgId: id,
      });
      if (res.success) {
        console.log("<<<res<<<");
      }
    } catch (error: any) {
      console.log("err", error);
    }
  },
  setProfilePercent: (percent) => set({ profilePercent: percent }),
  saveUser: async (id, shouldSave) => {
    try {
      const { allUsers, filteredUsers, savedProfiles, user } = get();
      const getUser = allUsers.find((item) => item._id === id);
      const getFilteredUser = filteredUsers.find((item) => item._id === id);

      const newUser = {
        ...getUser,
      };

      const getNewFilteredUser = {
        ...getFilteredUser,
      };

      if (shouldSave) {
        newUser!.savedBy = newUser?.savedBy
          ? [...newUser.savedBy, user?._id!]
          : [user?._id!];
        getNewFilteredUser!.savedBy = getNewFilteredUser?.savedBy
          ? [...getNewFilteredUser.savedBy, user?._id!]
          : [user?._id!];

        set({
          allUsers: allUsers.map((item) => {
            if (item._id === id) {
              return newUser;
            }
            return item;
          }) as ProfileResponse[],
          filteredUsers: filteredUsers.map((item) => {
            if (item._id === id) {
              return getNewFilteredUser;
            }
            return item;
          }) as ProfileResponse[],
          savedProfiles: [...savedProfiles, getFilteredUser!],
        });
      } else {
        newUser!.savedBy = newUser?.savedBy?.filter(
          (item) => item !== user?._id!
        ) as string[];
        getNewFilteredUser!.savedBy = getNewFilteredUser?.savedBy?.filter(
          (item) => item !== user?._id!
        ) as string[];
        set({
          allUsers: allUsers.map((item) => {
            if (item._id === id) {
              return newUser;
            }
            return item;
          }) as ProfileResponse[],
          filteredUsers: filteredUsers.map((item) => {
            if (item._id === id) {
              return getNewFilteredUser;
            }
            return item;
          }) as ProfileResponse[],
          savedProfiles: savedProfiles.filter((item) => item._id !== id),
        });
      }

      const res = await __saveUser({
        id,
      });

      if (!res.success) {
        toast.error("Something went wrong");
        if (shouldSave) {
          newUser!.savedBy = newUser?.savedBy
            ? [...newUser.savedBy, user?._id!]
            : [user?._id!];
          getNewFilteredUser!.savedBy = getNewFilteredUser?.savedBy
            ? [...getNewFilteredUser.savedBy, user?._id!]
            : [user?._id!];

          set({
            allUsers: allUsers.map((item) => {
              if (item._id === id) {
                return newUser;
              }
              return item;
            }) as ProfileResponse[],
            filteredUsers: filteredUsers.map((item) => {
              if (item._id === id) {
                return getNewFilteredUser;
              }
              return item;
            }) as ProfileResponse[],
            savedProfiles: [...savedProfiles, getFilteredUser!],
          });
        } else {
          newUser!.savedBy = newUser?.savedBy?.filter(
            (item) => item !== user?._id!
          ) as string[];
          getNewFilteredUser!.savedBy = getNewFilteredUser?.savedBy?.filter(
            (item) => item !== user?._id!
          ) as string[];
          set({
            allUsers: allUsers.map((item) => {
              if (item._id === id) {
                return newUser;
              }
              return item;
            }) as ProfileResponse[],
            filteredUsers: filteredUsers.map((item) => {
              if (item._id === id) {
                return getNewFilteredUser;
              }
              return item;
            }) as ProfileResponse[],
            savedProfiles: savedProfiles.filter((item) => item._id !== id),
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  },
  getSavedUsers: async (page) => {
    try {
      const res = await __getSavedUsers({
        page,
      });
      if (res.success) {
        set({
          savedProfiles: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
});
