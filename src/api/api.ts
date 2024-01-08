import { AxiosRequestConfig } from "axios";
import { getFetch, postFetch, putFetch } from "./api-wrapper";
import * as Types from "./api.types";

export const __getTopUsersToShow = (
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<
    {
      avatar: string;
      username: string;
      count: number;
    }[]
  >
> => getFetch("/user/images/all", undefined, config);

export const __checkSession = (
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    user: ProfileResponse;
    accessToken: string;
  }>
> => getFetch("/auth/check-session", undefined, config);

export const __logout = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  getFetch("/auth/logout", undefined, config);

export const __getUserProfile = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<UserResponse>> =>
  getFetch("/user", undefined, config);

export const __getAllUsers = (
  params: {
    page: number;
    type: string;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    totalPages: number;
    users: ProfileResponse[];
  }>
> =>
  getFetch(
    `/user/all?page=${params.page}&type=${params.type}`,
    undefined,
    config
  );

export const __checkUsername = (
  params: {
    username: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  getFetch(`/user/check-username/${params.username}`, undefined, config);

//Content API
export const __updateProfile = (
  params: UpdateUserProps,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ProfileResponse>> =>
  putFetch("/user", params, config);

export const __updateProfileImage = (
  params: FormData,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  putFetch("/user/update/avatar", params, config);

export const __addSocialLink = (
  params: {
    data: SocialsResponse;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<SocialsResponse>> =>
  postFetch("/user/social", params.data, config);

export const __addEducation = (
  params: {
    data: EducationType;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<EducationType>> =>
  postFetch("/user/education", params.data, config);

export const __addExperience = (
  params: {
    data: WorkExperienceType;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<WorkExperienceType>> =>
  postFetch("/user/experience", params.data, config);

export const __updateEducation = (
  params: {
    id: string;
    data: Partial<EducationType>;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<EducationType>> =>
  putFetch(`/user/education/${params.id}`, params.data, config);

export const __deleteEducation = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/user/education/${params.id}`, undefined, config);

export const __updateExperience = (
  params: {
    id: string;
    data: Partial<WorkExperienceType>;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<WorkExperienceType>> =>
  putFetch(`/user/experience/${params.id}`, params.data, config);

export const __deleteExperience = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/user/experience/${params.id}`, undefined, config);

export const __getUsersbyUsername = (
  params: {
    username: string;
    page?: number;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    totalPages: number;
    users: ProfileResponse[];
  }>
> =>
  getFetch(
    `/user/users/${params.username}?page=${params.page || 0}`,
    undefined,
    config
  );

export const __addActivity = (
  params: {
    data: ActivityType;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ActivityItemResponse>> =>
  postFetch("/user/activity", params.data, config);

export const __deleteActivity = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/user/activity/${params.id}`, undefined, config);

export const __updateActivity = (
  params: {
    id: string;
    data: Partial<ActivityType>;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ActivityItemResponse>> =>
  putFetch(`/user/activity/${params.id}`, params.data, config);

export const __sendMessage = (
  params: MessageType,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch("/message", params, config);

export const _getAllMessageList = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<MessageListResponse[]>> =>
  getFetch("/message", undefined, config);

export const __getMessageOfUser = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<MessageResponse[]>> =>
  getFetch(`/message/${params.id}`, undefined, config);

export const __updateReadBy = (
  params: {
    msgId: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  putFetch(`/message/${params.msgId}`, undefined, config);

export const __endorseUser = (
  params: EndorseType,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch("/user/endorse", params, config);

export const __getUserDetailsByUsername = (
  params: {
    username: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<UserResponse>> =>
  getFetch(`/user/${params.username}`, undefined, config);

export const __saveUser = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/user/save/${params.id}`, params, config);

export const __getSavedUsers = (
  params: {
    page?: number;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ProfileResponse[]>> =>
  getFetch(`/user/saved/get?page=${params.page || 0}`, undefined, config);

export const __getUsersByCategory = (
  params: {
    data: CategoryProp;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    totalCount: number;
    totalPages: number;
    users: ProfileResponse[];
  }>
> =>
  postFetch(
    `/user/category?page=${params.data.page}`,
    {
      category: params.data.category!,
      city: params.data.city!,
      offering: params.data.offering!,
    },
    config
  );

//Opportunities

export const __createOpportunity = (
  params: OpportunityProps,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<OpportunityProps>> =>
  postFetch("/opp/create", params, config);

export const __getOpportunities = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<OpportunityProps[]>> =>
  getFetch("/opp/get-all", undefined, config);

export const __getMyOpportunities = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<OpportunityProps[]>> =>
  getFetch("/opp/get-all-by-user", undefined, config);

export const __getOpportunityById = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<OpportunityProps>> =>
  getFetch(`/opp/getOpp/${params.id}`, undefined, config);

export const __applyForOpportunity = (
  params: {
    opportunityId: string;
    proposal: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch("/opp/apply", params, config);

export const __fetchApplications = (
  params: {
    opportunityId: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ApplicationProps[]>> =>
  postFetch("/opp/get-applicants", params, config);

export const __accepetOrReject = (
  params: {
    opportunityId: string;
    applicantId: string;
    status: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch("/opp/accept-or-reject-applicant", params, config);

export const __deleteOpportunity = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/opp/delete/${params.id}`, undefined, config);

export const __followUnfollowUser = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/user/follow-unfollow/${params.id}`, undefined, config);

export const __getFollowersFollowingIds = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<string[]>> =>
  getFetch(`/user/following-ids/get`, undefined, config);

export const __getFollowersFollowing = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    user: ProfileResponse;
    followers: ProfileResponse[];
    following: ProfileResponse[];
  }>
> => getFetch(`/user/followers-following/get/${params.id}`, undefined, config);

export const __getNotifications = (
  params: {
    pageNo: number;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    notifications: INotificationResponse[];
    totalPages: number;
  }>
> =>
  getFetch(
    `/user/notifications/get?page=${params.pageNo || 0}`,
    undefined,
    config
  );

export const __markNotificationsAsRead = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/user/notifications/read/${params.id}`, undefined, config);
