import React from "react";
import { Image, Link } from "@components";
import CommentItem from "./CommentItem";

const ReplyItem = ({
  it,
  replyRef,
  setReplyInput,
  commentId,
  postUserId,
}: {
  it: ReplyProps;
  replyRef: React.RefObject<HTMLTextAreaElement>;
  setReplyInput: React.Dispatch<React.SetStateAction<ICommentState>>;
  commentId?: string;
  postUserId?: string;
}) => {
  return (
    <div className="flex mt-3" id={it._id}>
      <Link href={`/${it.user?.username}`} className="w-9 h-9">
        <Image
          src={it.user?.avatar!}
          alt={"profile-pic"}
          className="rounded-full object-cover w-full h-full"
        />
      </Link>
      <div
        className="flex flex-col w-[calc(100%-2.5rem)] px-3 py-2 ml-1 rounded-r-2xl rounded-bl-2xl bg-secondGray/60"
        id={it._id}
      >
        <CommentItem
          userDetail={it.user}
          replyDetails={it as ReplyProps}
          postUserId={postUserId!}
          isReply
          inputRef={replyRef}
          id={it._id}
          setReplyInput={setReplyInput}
          commentId={commentId}
        />
      </div>
    </div>
  );
};

export default ReplyItem;
