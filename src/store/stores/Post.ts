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
  __upvoteIdea,
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
  commentReplies: {
    [key: string]: CommentResponse[];
  };
  getAllPosts: (page: number, filter: string) => Promise<void>;
  createNewPost: (params: FormData) => Promise<void>;
  getPostsByUser: (page: number, userId: string) => Promise<void>;
  getPostById: (id: string) => Promise<void>;
  commentOnPost: (params: { text: string; id: string }) => Promise<void>;
  getAllComments: (params: { postId: string; page: number }) => Promise<void>;
  setSelectPost: (post: IdeaResponse) => void;
  replyOnComment: (params: { text: string; id: string }) => Promise<void>;
  getReplies: (params: { commentId: string }) => Promise<void>;
  upvotePost: (
    params: { id: string },
    isSelectedPost?: boolean
  ) => Promise<void>;
  downvotePost: (
    params: { id: string },
    isSelectedPost?: boolean
  ) => Promise<void>;
  deleteIdea: (params: { id: string }) => Promise<void>;
  resetPosts: () => void;
  deleteComment: (params: { id: string }) => Promise<void>;
  deleteReply: (params: { id: string; replyId: string }) => Promise<void>;
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
  commentReplies: {},
};

export const createPostSlice: StateCreator<AppState, [], [], IPostStore> = (
  set,
  get
) => ({
  ...initialPostState,
  getAllPosts: async (page, filter) => {
    try {
      const response = await __getIdeas({ page, filter });
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
          date: Date.now(),
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
        const { user, selectedPostComment, commentReplies } = get();
        const comment = selectedPostComment.comments.find(
          (c) => c._id === params.id
        );
        const obj = {
          ...response.data!,
          user: user!,
          date: Date.now(),
        };
        comment!.replies.push(response?.data?._id as any);
        const index = selectedPostComment.comments.findIndex(
          (c) => c._id === params.id
        );
        selectedPostComment.comments[index] = comment!;
        set({
          selectedPostComment: {
            comments: selectedPostComment.comments,
            toalCommentPages: selectedPostComment.toalCommentPages,
          },
          commentReplies: {
            ...commentReplies,
            [params.id]: [obj, ...commentReplies[params.id]],
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
        const { commentReplies } = get();
        set({
          commentReplies: {
            ...commentReplies,
            [params.commentId]: response.data!,
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
      // if (!isSelectedPost) {
      //   // if (post?.upvotes?.includes(user?._id!)) {
      //   //   post!.upvotes = post!.upvotes.filter((id) => id !== user?._id!);
      //   //   // post.count = post.count - 1;
      //   // } else {
      //   //   post!.upvotes.push(user?._id!);
      //   // }
      //   // set({
      //   //   allPosts: [...allPosts],
      //   // });

      // } else {
      //   if (selectedPost?.upvotes?.includes(user?._id!)) {
      //     selectedPost!.upvotes = selectedPost!.upvotes.filter(
      //       (id) => id !== user?._id!
      //     );
      //   } else {
      //     selectedPost!.upvotes.push(user?._id!);
      //   }
      //   set({
      //     selectedPost: selectedPost!,
      //   });
      // }

      if (post) {
        if (post?.upvotes?.includes(user?._id!)) {
          post!.upvotes = post!.upvotes.filter((id) => id !== user?._id!);
          post.count = post.count - 1;
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
            post.count = post.count + 1;
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
  downvotePost: async (params, isSelectedPost = false) => {
    try {
      const { allPosts, user, selectedPost } = get();
      const post = allPosts.find((p) => p._id === params.id);
      if (!isSelectedPost) {
        if (post?.downvotes?.includes(user?._id!)) {
          post!.downvotes = post!.downvotes.filter((id) => id !== user?._id!);
          post.count = post.count + 1;
        } else {
          post!.downvotes.push(user?._id!);
          post!.count = post!.count - 1;
          if (post?.upvotes?.includes(user?._id!)) {
            post!.count = post!.count - 1;
            post!.upvotes = post!.upvotes.filter((id) => id !== user?._id!);
          }
        }

        set({
          allPosts: [...allPosts],
        });
      } else {
        if (selectedPost?.downvotes?.includes(user?._id!)) {
          selectedPost!.downvotes = selectedPost!.downvotes.filter(
            (id) => id !== user?._id!
          );
          selectedPost!.count = selectedPost!.count + 1;
        } else {
          selectedPost!.downvotes.push(user?._id!);
          selectedPost!.count = selectedPost!.count - 1;
          if (selectedPost?.upvotes?.includes(user?._id!)) {
            selectedPost!.count = selectedPost!.count - 1;
            selectedPost!.upvotes = selectedPost!.upvotes.filter(
              (id) => id !== user?._id!
            );
          }
        }

        set({
          selectedPost: selectedPost!,
        });
      }
      const response = await __downvoteIdea(params);
      if (response.success) {
      } else {
        if (!selectedPost) {
          set({
            allPosts: allPosts.map((p) => {
              if (p._id === params.id) {
                if (post?.downvotes.includes(user?._id!)) {
                  post!.downvotes = post!.downvotes.filter(
                    (id) => id !== user?._id!
                  );
                  post!.count = post!.count + 1;
                } else {
                  post!.downvotes.push(user?._id!);
                  post!.count = post!.count - 1;
                  if (post?.upvotes.includes(user?._id!)) {
                    post!.count = post!.count - 1;
                    post!.upvotes = post!.upvotes.filter(
                      (id) => id !== user?._id!
                    );
                  }
                }

                return post!;
              }
              return p;
            }),
          });
        } else {
          set({
            selectedPost: {
              ...selectedPost!,
              upvotes: selectedPost?.upvotes.filter(
                (id) => id !== user?._id!
              ) as string[],
              downvotes: selectedPost?.downvotes.filter(
                (id) => id !== user?._id!
              ) as string[],
              count: selectedPost?.downvotes.includes(user?._id!)
                ? selectedPost?.count! + 1
                : selectedPost?.upvotes.includes(user?._id!)
                ? selectedPost?.count! - 2
                : selectedPost?.count! - 1,
            },
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
      const { commentReplies } = get();
      const response = await __deleteReply(params);
      if (response.success) {
        const newObj = {
          ...commentReplies!,
          [params.id]: commentReplies![params.id].filter(
            (r) => r._id !== params.replyId
          ),
        };
        set({
          commentReplies: newObj,
        });
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
});
