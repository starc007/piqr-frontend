import { toast } from "react-hot-toast";
import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";
import {
  __addComment,
  __createIdea,
  __deleteComment,
  __deleteIdea,
  __deleteReply,
  __downvoteIdea,
  __getAllComments,
  __getIdeaById,
  __getIdeas,
  __getIdeasByUser,
  __getNotifications,
  __getReplies,
  __replyComment,
  __upvoteComment,
  __upvoteIdea,
  __upvoteReply,
} from "@api";

export interface IPostStore {
  allPosts: IdeaResponse[];
  userPosts: IdeaResponse[];
  totalPostPages: number;
  totalUserPostPages: number;
  selectedPost: IdeaResponse | null;
  selectedPostComment: {
    comments: CommentResponse[];
    toalCommentPages: number;
  };
  getAllPosts: (page: number) => Promise<void>;
  createNewPost: (params: FormData) => Promise<void>;
  getPostsByUser: (page: number, userId: string) => Promise<void>;
  getPostById: (id: string) => Promise<void>;
  commentOnPost: (params: { text: string; id: string }) => Promise<void>;
  getAllComments: (params: { postId: string; page: number }) => Promise<void>;
  setSelectPost: (post: IdeaResponse) => void;
  replyOnComment: (params: {
    text: string;
    commentId: string;
    replyId?: string;
    replyingToUsername?: string;
  }) => Promise<void>;
  getReplies: (params: { commentId: string; page: number }) => Promise<void>;
  upvotePost: (
    params: { id: string },
    isSelectedPost?: boolean
  ) => Promise<void>;
  deleteIdea: (params: { id: string }) => Promise<void>;
  resetPosts: () => void;
  deleteComment: (params: { id: string }) => Promise<void>;
  deleteReply: (params: { id: string; replyId: string }) => Promise<void>;
  upvoteReplyComment: (params: {
    commentId: string;
    replyId?: string;
    isReply: boolean;
  }) => Promise<void>;
}

export const initialPostState = {
  allPosts: [],
  totalPostPages: 0,
  userPosts: [],
  totalUserPostPages: 0,
  selectedPost: null,
  selectedPostComment: {
    comments: [],
    toalCommentPages: 0,
  },
};

export const createPostSlice: StateCreator<AppState, [], [], IPostStore> = (
  set,
  get
) => ({
  ...initialPostState,
  getAllPosts: async (page) => {
    try {
      const response = await __getIdeas({ page });
      if (response.success) {
        const { allPosts } = get();
        const posts =
          page > 0
            ? [...allPosts, ...response.data!.ideas]
            : response.data!.ideas;
        set({
          allPosts: posts,
          totalPostPages: response.data!.totalPages,
          isPostsFetched: true,
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  createNewPost: async (params) => {
    try {
      const response = await __createIdea(params);
      if (response.success) {
        const { allPosts, user } = get();
        const newPost = response.data;
        const newP: IdeaResponse = {
          ...newPost!,
          user: user!,
        };
        set({
          allPosts: [newP!, ...allPosts],
        });
        toast.success("Post created!!");
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getPostsByUser: async (page, userId) => {
    try {
      const response = await __getIdeasByUser({ page, userId });
      if (response.success) {
        const { userPosts } = get();

        const posts =
          page > 0
            ? [...userPosts, ...response.data!.ideas]
            : response.data!.ideas;

        set({
          userPosts: posts,
          totalUserPostPages: response.data!.totalPages,
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getPostById: async (id) => {
    try {
      const response = await __getIdeaById({ id });
      if (response.success) {
        set({
          selectedPost: response?.data,
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  commentOnPost: async (params) => {
    try {
      const response = await __addComment(params);
      if (response.success) {
        const { user, selectedPostComment } = get();
        const obj = {
          ...response.data!,
          user: user!,
        };
        set({
          selectedPostComment: {
            comments: [obj, ...selectedPostComment.comments],
            toalCommentPages: selectedPostComment.toalCommentPages,
          },
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllComments: async (params) => {
    try {
      const response = await __getAllComments(params);
      if (response.success) {
        set({
          selectedPostComment: {
            comments: response?.data?.comments!,
            toalCommentPages: response?.data?.totalPages!,
          },
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  setSelectPost: (post) => {
    set({
      selectedPost: post,
    });
  },
  replyOnComment: async (params) => {
    try {
      const response = await __replyComment(params);
      if (response.success) {
        const { selectedPostComment, user } = get();
        const comment = selectedPostComment.comments.find(
          (c) => c._id === params.commentId
        );
        const obj = {
          ...response.data!,
          user: user!,
        };
        //pust it to the first index
        comment!.firstTwoReplies.push(obj);
        comment!.repliesCount = (comment?.repliesCount || 0) + 1;

        set({
          selectedPostComment: {
            comments: selectedPostComment.comments,
            toalCommentPages: selectedPostComment.toalCommentPages,
          },
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getReplies: async (params) => {
    try {
      const response = await __getReplies(params);
      if (response.success) {
        const { selectedPostComment } = get();

        const comment = selectedPostComment.comments.find(
          (c) => c._id === params.commentId
        );

        comment!.firstTwoReplies = [
          ...comment!.firstTwoReplies,
          ...response.data?.replies!,
        ];

        set({
          selectedPostComment: {
            ...selectedPostComment,
            comments: selectedPostComment.comments,
          },
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  upvotePost: async (params, isSelectedPost = false) => {
    try {
      const { allPosts, user, selectedPost, userPosts } = get();
      const post = allPosts.find((p) => p._id === params.id);
      const userPost = userPosts.find((p) => p._id === params.id);

      if (post) {
        if (post?.upvotes?.includes(user?._id!)) {
          post!.upvotes = post!.upvotes.filter((id) => id !== user?._id!);
        } else {
          post!.upvotes.push(user?._id!);
        }
        set({
          allPosts: [...allPosts],
        });
      }

      if (userPost) {
        if (userPost?.upvotes?.includes(user?._id!)) {
          userPost!.upvotes = userPost!.upvotes.filter(
            (id) => id !== user?._id!
          );
        } else {
          userPost!.upvotes.push(user?._id!);
        }
        set({
          userPosts: [...userPosts],
        });
      }

      if (selectedPost) {
        if (selectedPost?.upvotes?.includes(user?._id!)) {
          selectedPost!.upvotes = selectedPost!.upvotes.filter(
            (id) => id !== user?._id!
          );
        } else {
          selectedPost!.upvotes.push(user?._id!);
        }
        set({
          selectedPost: selectedPost!,
        });
      }

      const response = await __upvoteIdea(params);
      if (!response.success) {
        if (post) {
          if (post?.upvotes?.includes(user?._id!)) {
            post!.upvotes = post!.upvotes.filter((id) => id !== user?._id!);
          } else {
            post!.upvotes.push(user?._id!);
          }
          set({
            allPosts: [...allPosts],
          });
        }

        if (userPost) {
          if (userPost?.upvotes?.includes(user?._id!)) {
            userPost!.upvotes = userPost!.upvotes.filter(
              (id) => id !== user?._id!
            );
          } else {
            userPost!.upvotes.push(user?._id!);
          }
          set({
            userPosts: [...userPosts],
          });
        }

        if (selectedPost) {
          if (selectedPost?.upvotes?.includes(user?._id!)) {
            selectedPost!.upvotes = selectedPost!.upvotes.filter(
              (id) => id !== user?._id!
            );
          } else {
            selectedPost!.upvotes.push(user?._id!);
          }
          set({
            selectedPost: selectedPost!,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteIdea: async (params) => {
    try {
      const { userPosts, allPosts } = get();
      const response = await __deleteIdea(params);
      if (response.success) {
        set({
          userPosts: userPosts.filter((p) => p._id !== params.id),
          allPosts: allPosts.filter((p) => p._id !== params.id),
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  resetPosts: () => {
    set({
      allPosts: [],
      totalPostPages: 0,
      userPosts: [],
      totalUserPostPages: 0,
    });
  },
  deleteComment: async (params) => {
    try {
      const { selectedPostComment } = get();
      const response = await __deleteComment(params);
      if (response.success) {
        set({
          selectedPostComment: {
            ...selectedPostComment!,
            comments: selectedPostComment?.comments.filter(
              (c) => c._id !== params.id
            ),
          },
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteReply: async (params) => {
    try {
      const { selectedPostComment } = get();
      const response = await __deleteReply(params);
      if (response.success) {
        const comment = selectedPostComment.comments.find(
          (c) => c._id === params.id
        );
        comment!.firstTwoReplies = comment!.firstTwoReplies.filter(
          (r) => r._id !== params.replyId
        );
        comment!.repliesCount = (comment?.repliesCount || 0) - 1;

        set({
          selectedPostComment: {
            ...selectedPostComment!,
            comments: selectedPostComment?.comments,
          },
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
  upvoteReplyComment: async (params) => {
    try {
      const isReply = params.isReply;

      const { selectedPostComment, user } = get();

      if (!isReply) {
        const comment = selectedPostComment.comments.find(
          (c) => c._id === params.commentId
        );
        if (comment?.upvotes?.includes(user?._id!)) {
          comment!.upvotes = comment!.upvotes.filter((id) => id !== user?._id!);
        } else {
          comment!.upvotes.push(user?._id!);
        }
      } else {
        const comment = selectedPostComment.comments.find(
          (c) => c._id === params.commentId
        );
        const reply = comment?.firstTwoReplies.find(
          (r) => r._id === params.replyId
        );

        if (typeof reply?.upvotes === "undefined") reply!.upvotes = [];

        if (reply?.upvotes?.includes(user?._id!)) {
          reply!.upvotes = reply!.upvotes.filter((id) => id !== user?._id!);
        } else {
          reply!.upvotes.push(user?._id!);
        }
      }
      set({
        selectedPostComment: {
          ...selectedPostComment!,
          comments: selectedPostComment?.comments,
        },
      });

      if (isReply) {
        const res = await __upvoteReply({
          id: params.replyId as string,
        });

        if (!res.success) {
          const comment = selectedPostComment.comments.find(
            (c) => c._id === params.commentId
          );
          const reply = comment?.firstTwoReplies.find(
            (r) => r._id === params.replyId
          );
          if (reply?.upvotes?.includes(user?._id!)) {
            reply!.upvotes = reply!.upvotes.filter((id) => id !== user?._id!);
          } else {
            reply!.upvotes.push(user?._id!);
          }
          set({
            selectedPostComment: {
              ...selectedPostComment!,
              comments: selectedPostComment?.comments,
            },
          });
        }
      } else {
        const res = await __upvoteComment({
          id: params.commentId,
        });

        if (!res.success) {
          const comment = selectedPostComment.comments.find(
            (c) => c._id === params.commentId
          );
          if (comment?.upvotes?.includes(user?._id!)) {
            comment!.upvotes = comment!.upvotes.filter(
              (id) => id !== user?._id!
            );
          } else {
            comment!.upvotes.push(user?._id!);
          }
          set({
            selectedPostComment: {
              ...selectedPostComment!,
              comments: selectedPostComment?.comments,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
});
