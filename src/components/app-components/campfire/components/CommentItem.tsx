import React, { FC, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  Image,
  Link,
} from "@components";
import { ArrowSVG, CommenetSVG, ThreeDotsSVG, deleteIcon } from "@assets/index";
import { useAppBoundStore } from "@store/mainStore";
import { formatText } from "@utils";
import toast from "react-hot-toast";
import { urlify } from "../../../../utils/index";

const cmnCls =
  "w-6 h-6 flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 !rounded-full ";

interface Props {
  userDetail: ProfileResponse;
  postUserId: string;
  id: string;
  isReply?: boolean;
  replyDetails: ReplyProps | CommentResponse;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  setReplyInput: React.Dispatch<React.SetStateAction<ICommentState>>;
  commentId?: string;
}

const CommentItem: FC<Props> = ({
  userDetail,
  postUserId,
  id,
  isReply = false,
  replyDetails,
  inputRef,
  setReplyInput,
  commentId,
}) => {
  const { isLoggedIn, user, deleteComment, upvoteReplyComment, deleteReply } =
    useAppBoundStore((state) => ({
      isLoggedIn: state.isLoggedIn,
      user: state.user,
      deleteComment: state.deleteComment,
      upvoteReplyComment: state.upvoteReplyComment,
      deleteReply: state.deleteReply,
    }));

  const [upvoteState, setupvoteState] = useState({
    isUpvoted: replyDetails?.isUpvoted as boolean,
    upvoteCount: replyDetails?.upvoteCount as number,
  });

  const isDeleteButtonVisible =
    user?._id === userDetail?._id || user?._id === postUserId;

  const handleDelete = async () => {
    if (!id) return toast.error("Something went wrong");

    if (id && !isReply) {
      await deleteComment({ id: id });
    }

    if (id && isReply && commentId) {
      await deleteReply({ id: commentId, replyId: id });
    }
  };

  const handleUpvoteClick = async () => {
    if (!isLoggedIn) return toast.error("You need to login first");

    if (!id) return toast.error("Something went wrong");

    if (upvoteState.isUpvoted) {
      setupvoteState({
        isUpvoted: false,
        upvoteCount: upvoteState.upvoteCount - 1,
      });
    } else {
      setupvoteState({
        isUpvoted: true,
        upvoteCount: upvoteState.upvoteCount + 1,
      });
    }

    if (isReply) {
      await upvoteReplyComment({
        replyId: id,
        commentId: commentId!,
        isReply: true,
        setupvoteState,
      });
    } else {
      await upvoteReplyComment({
        commentId: id,
        isReply: false,
        setupvoteState,
      });
    }
  };

  const isSameUser = userDetail?._id === user?._id;
  return (
    <>
      {/* User Info */}
      <div className="flex justify-between w-full">
        <Link href={`/${userDetail?.username}`} className="flex flex-col w-max">
          <p className="text-sm font-medium flex items-center gap-1">
            {userDetail?.name}{" "}
          </p>
          <p className="text-gray-400 text-xs font-medium ">
            {formatText(userDetail?.title!, 65)}
          </p>
        </Link>

        {isLoggedIn && isDeleteButtonVisible ? (
          <div className="flex items-center gap-2">
            {/* <p className="text-gray-500 text-xs  italic">
                {moment(item?.createdAt).fromNow()}
              </p> */}
            <Dropdown>
              <DropdownButton cls="w-full">
                <ThreeDotsSVG className="w-4" />
              </DropdownButton>
              <DropdownContent cls="w-40 space-y-1 py-1.5 h-min text-sm z-10 top-4 bg-white shadow-xl">
                {isDeleteButtonVisible ? (
                  <DropdownItem
                    className="flex items-center gap-2 hover:bg-gray-100"
                    onClick={handleDelete}
                  >
                    <Image src={deleteIcon.src} className="w-5" alt="del" />
                    Delete
                  </DropdownItem>
                ) : null}

                {/* <DropdownItem
                  className="flex items-center gap-2"
                  // onClick={() => copyProfile(item.username as string)}
                >
                  <ReportSVG className="w-5" />
                  Report
                </DropdownItem> */}
              </DropdownContent>
            </Dropdown>
          </div>
        ) : null}
      </div>
      {/* Comment here we gi*/}
      <div className="flex flex-col gap-1 w-full mt-1">
        <p
          className="text-dark text-sm whitespace-pre-line break-all md:break-normal"
          dangerouslySetInnerHTML={{
            __html: `<a 
            href="/${
              "replyingToUsername" in replyDetails
                ? replyDetails.replyingToUsername
                : ""
            }"
            class="text-primary font-medium">${
              "replyingToUsername" in replyDetails &&
              //add @username to the reply
              replyDetails.replyingToUsername
                ? `@${replyDetails.replyingToUsername} `
                : ""
            }</a> ${urlify(replyDetails.msg)}`,
          }}
        />
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-5 w-full mt-2">
        <Button
          onClick={() => {
            setReplyInput({
              id: replyDetails._id!,
              shouldVisible: true,
              isReply: isReply,
              replyingTo: {
                username: isSameUser ? "" : userDetail.username!,
                name: isSameUser ? "" : userDetail.name!,
              },
            });

            const cmtDiv = document.getElementById(replyDetails._id!);
            if (cmtDiv) {
              cmtDiv.scrollIntoView({ behavior: "smooth" });
              inputRef?.current?.focus();
            }
          }}
          disabled={!isLoggedIn}
          variant="tertiary"
        >
          <CommenetSVG className="w-5 text-gray-600 hover:text-primary" />
          <p className="text-center pl-1 text-sm">
            {("repliesCount" in replyDetails ? replyDetails.repliesCount : 0) ||
              0}{" "}
          </p>
        </Button>

        <div className="flex items-center">
          <Button
            cls={`${cmnCls} ${
              upvoteState.isUpvoted
                ? "bg-primary text-white hover:bg-primary hover:text-white hover:border-primary border-primary"
                : "hover__effect text-gray-600"
            }`}
            onClick={handleUpvoteClick}
            disabled={!isLoggedIn}
            variant="tertiary"
          >
            <ArrowSVG className="w-3.5" />
          </Button>
          <p className="text-center pl-2 text-sm">
            {upvoteState?.upvoteCount || 0}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
