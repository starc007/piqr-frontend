import { AxiosRequestConfig } from "axios";
import { getFetch, postFetch, putFetch } from "./api-wrapper";
import * as Types from "./api.types";

export const __createIdea = (
  params: FormData,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<IdeaResponse>> =>
  postFetch("/posts", params, config);

export const __getIdeas = (
  params: {
    page: number;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    totalPages: number;
    ideas: IdeaResponse[];
  }>
> => getFetch(`/posts?page=${params.page}`, undefined, config);

export const __getIdeasByUser = (
  params: {
    page: number;
    userId: string;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    totalPages: number;
    ideas: IdeaResponse[];
  }>
> =>
  getFetch(
    `/posts/get/post/${params.userId}?page=${params.page}`,
    undefined,
    config
  );

export const __getIdeaById = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<IdeaResponse>> =>
  getFetch(`/posts/${params.id}`, undefined, config);

export const __getAllComments = (
  params: {
    postId: string;
    page: number;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    totalPages: number;
    comments: CommentResponse[];
  }>
> =>
  getFetch(
    `/posts/comment/${params.postId}?page=${params.page}`,
    undefined,
    config
  );

export const __addComment = (
  params: {
    text: string;
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<CommentResponse>> =>
  postFetch("/posts/comment/post", params, config);

export const __replyComment = (
  params: {
    text: string;
    commentId: string;
    replyId?: string;
    replyingToUsername?: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ReplyProps>> =>
  postFetch("/posts/reply/post", params, config);

export const __getReplies = (
  params: {
    commentId: string;
    page: number;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    totalPages: number;
    replies: ReplyProps[];
  }>
> =>
  getFetch(
    `/posts/reply/${params.commentId}?page=${params.page}`,
    undefined,
    config
  );

export const __upvoteIdea = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/posts/upvote/${params.id}`, undefined, config);

export const __downvoteIdea = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/posts/downvote/${params.id}`, undefined, config);

export const __deleteIdea = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/posts/${params.id}`, undefined, config);

export const __getNewPeoplDailyToMeet = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ProfileResponse[]>> =>
  getFetch(`/user/newPeople/users`, undefined, config);

export const __deleteComment = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/posts/comment/delete/${params.id}`, undefined, config);

export const __deleteReply = (
  params: {
    id: string;
    replyId: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(
    `/posts/reply/delete/${params.id}/${params.replyId}`,
    undefined,
    config
  );

export const __upvoteComment = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/posts/comment/upvote/${params.id}`, undefined, config);

export const __upvoteReply = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/posts/reply/upvote/${params.id}`, undefined, config);
