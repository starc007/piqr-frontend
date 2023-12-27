/* eslint-disable @next/next/no-img-element */
import { CommenetSVG, VerifiedSVG, deleteIcon } from "@assets/index";
import {
  Button,
  CustomButton,
  Image,
  Input,
  Link,
  Loader,
  TextArea,
} from "@components";
import { useAppBoundStore } from "@store/mainStore";
import moment from "moment";
import React from "react";
import { toast } from "react-hot-toast";

import { urlify } from "../../../utils/index";
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";

type CommentProps = {
  name: string;
  createdAt: number;
  pfp: string;
  comment: string;
  id: string | number;
  replies?: CommentResponse[];
  username: string;
  title: string;
  postUserId: string;
  commentUserId: string;
  isVerified: boolean;
};

const Comment = ({
  name,
  createdAt,
  pfp,
  comment: text,
  id,
  replies = [],
  username,
  title,
  postUserId,
  commentUserId,
  isVerified,
}: CommentProps) => {
  const [showReply, setShowReply] = React.useState(false);
  const replyRef = React.useRef<HTMLTextAreaElement>(null);
  const [addReply, setAddReply] = React.useState("");
  const [replying, setReplying] = React.useState(false);
  const [repliesLoading, setRepliesLoading] = React.useState(false);
  const [viewReplies, setViewReplies] = React.useState(false);

  useAutosizeTextArea(replyRef.current, addReply);

  const {
    replyOnComment,
    getReplies,
    commentReplies,
    isLoggedIn,
    user,
    deleteComment,
    deleteReply,
  } = useAppBoundStore((state) => ({
    replyOnComment: state.replyOnComment,
    getReplies: state.getReplies,
    commentReplies: state.commentReplies,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    deleteComment: state.deleteComment,
    deleteReply: state.deleteReply,
  }));

  const handleReply = () => {
    if (!addReply || !id) return toast.error("Something went wrong");
    setReplying(true);
    const obj = {
      text: addReply,
      id: id.toString(),
    };
    replyOnComment(obj).then(() => {
      setReplying(false);
      setAddReply("");
    });
  };

  const handleViewReplies = () => {
    if (!id) return toast.error("Something went wrong");
    setRepliesLoading(true);
    setViewReplies(true);
    getReplies({ commentId: id.toString() }).then(() => {
      setRepliesLoading(false);
    });
  };

  const handleDeleteComment = (cmtId: string) => {
    toast.promise(deleteComment({ id: cmtId }), {
      loading: "Deleting comment...",
      success: "Comment deleted",
      error: "Something went wrong",
    });
  };

  const handleDeleteReply = (replyId: string, cmtId: string) => {
    toast.promise(deleteReply({ replyId, id: cmtId }), {
      loading: "Deleting reply...",
      success: "Reply deleted",
      error: "Something went wrong",
    });
  };

  const isDeleteButtonVisible =
    user?._id === commentUserId || user?._id === postUserId;

  return (
    <div className="flex flex-col gap-x-4 border-b md:px-4 px-3 mt-4">
      <div className="font-medium flex justify-between items-center gap-2 text-sm">
        <Link className="flex items-center gap-2" href={`/${username}`}>
          <Image
            src={pfp}
            alt={"profile-pic"}
            className="rounded-full object-cover w-9 h-9"
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-semibold flex items-center">
                {name}
                {/* {isVerified ? <VerifiedSVG className="ml-1" /> : null} */}
              </span>

              {/* <span className="text-gray-400 text-xs ml-1">
                {" "}
                • {moment(createdAt).fromNow()}{" "}
              </span> */}
            </div>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
        </Link>
        {isDeleteButtonVisible && isLoggedIn ? (
          <button
            onClick={() => handleDeleteComment(id.toString())}
            className="border rounded-xl p-2 hover:bg-gray-100 transition-all duration-300"
          >
            <Image
              src={deleteIcon.src}
              alt={"delete"}
              className="w-4"
              onClick={() => {}}
            />
          </button>
        ) : null}
      </div>{" "}
      <p
        className="text-gray-600 text-sm mt-3 ml-11 whitespace-pre-line"
        id="editor-text"
        dangerouslySetInnerHTML={{ __html: urlify(text) }}
      ></p>
      <div className="flex flex-col gap-x-4 py-2 ml-8">
        <div className="flex gap-x-4">
          {isLoggedIn ? (
            <CustomButton
              onClick={() => {
                setShowReply(!showReply);
              }}
              cls="w-20 h-9 font-semibold hover:bg-gray-100 rounded-lg text-xs gap-1"
            >
              <CommenetSVG className="w-4" />
              <span className="text-gray-600">Reply</span>
            </CustomButton>
          ) : null}
          {replies?.length > 0 ? (
            <button
              onClick={
                viewReplies ? () => setViewReplies(false) : handleViewReplies
              }
              className="h-9 font-semibold text-xs text-primary"
            >
              {viewReplies ? "Hide replies" : `View ${replies?.length} replies`}
            </button>
          ) : null}
        </div>
        {showReply && isLoggedIn ? (
          <form
            className="w-full mt-3 ml-2 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              // handleComment(selectedPost?._id!);
              handleReply();
            }}
          >
            <TextArea
              placeholder="Reply to this comment..."
              value={addReply}
              onChange={(e) => setAddReply(e.target.value)}
              ref={replyRef}
              cls="resize-none bg-gray-100 rounded-xl border-none"
              rows={1}
            />

            <Button
              type="submit"
              disabled={replying || !addReply}
              isLoading={replying}
              variant="primary"
              cls="text-sm rounded-full w-20 h-9 font-semibold"
            >
              Reply
            </Button>
          </form>
        ) : null}

        {repliesLoading ? (
          <div className="flex justify-center items-center">
            <Loader col="text-gray-800" />
          </div>
        ) : null}
        {viewReplies ? (
          <div className="md:ml-2 ml-2 mt-3">
            {!repliesLoading
              ? commentReplies[id]?.map((reply) => {
                  const isDeleteReplyButtonVisible =
                    user?._id.toString() === reply?.user?._id.toString() ||
                    user?._id.toString() === postUserId;

                  return (
                    <div key={reply._id} className="flex flex-col gap-x-4 pb-3">
                      <div className="font-medium flex justify-between items-center gap-2 text-sm">
                        <Link
                          className="flex items-center gap-2"
                          href={`/${reply?.user?.username}`}
                        >
                          <Image
                            src={reply.user?.avatar}
                            alt={"profile-pic"}
                            className="rounded-full object-cover w-8 h-8"
                          />
                          {/* <span>{reply?.user?.name}</span> */}
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <span className="font-semibold flex items-center">
                                {reply?.user?.name}{" "}
                                {/* {reply?.user?.isVerified ? (
                                  <VerifiedSVG className="ml-1" />
                                ) : null} */}
                              </span>

                              {/* <span className="text-gray-400 text-xs ml-1">
                                {" "}
                                • {moment(reply?.date).fromNow()}{" "}
                              </span> */}
                            </div>
                            <p className="text-xs text-gray-500">
                              {reply?.user?.title}
                            </p>
                          </div>
                        </Link>
                        {isDeleteReplyButtonVisible && isLoggedIn ? (
                          <button
                            onClick={() =>
                              handleDeleteReply(
                                reply?._id.toString(),
                                id.toString()
                              )
                            }
                            className="border rounded-xl p-2 hover:bg-gray-100 transition-all duration-300"
                          >
                            <Image
                              src={deleteIcon.src}
                              alt={"delete"}
                              className="w-4"
                              onClick={() => {}}
                            />
                          </button>
                        ) : null}
                      </div>{" "}
                      <p
                        className="text-gray-600 text-sm mt-2 ml-10 break-words whitespace-pre-line"
                        id="editor-text"
                        dangerouslySetInnerHTML={{ __html: urlify(reply?.msg) }}
                      ></p>
                    </div>
                  );
                })
              : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
