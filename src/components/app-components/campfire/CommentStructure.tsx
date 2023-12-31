import React, { FC } from "react";
import { Button, Image, Link, Loader } from "@components";

import { useAppBoundStore } from "@store/mainStore";
import ReplyInput from "./ReplyInput";
import CommentItem from "./components/CommentItem";
import ReplyItem from "./components/ReplyItem";

const CommentStructure: FC<{
  userDetail: ProfileResponse;
  replyDetails: CommentResponse;
  postUserId: string;
}> = ({ userDetail, replyDetails, postUserId }) => {
  const replyRef = React.useRef<HTMLTextAreaElement>(null);
  const commentRef = React.useRef<HTMLTextAreaElement>(null);
  const [replyPage, setReplyPage] = React.useState(0);
  const [replyLoading, setReplyLoading] = React.useState(false);

  const [replyInput, setReplyInput] = React.useState<ICommentState>({
    id: "",
    shouldVisible: false,
    isReply: false,
    replyingTo: {
      username: "",
      name: "",
    },
  });

  const { getReplies } = useAppBoundStore((state) => ({
    getReplies: state.getReplies,
  }));

  const handleGetReplies = async (id: string) => {
    setReplyPage(replyPage + 1);
    setReplyLoading(true);
    await getReplies({ commentId: id, page: replyPage });
    setReplyLoading(false);
  };

  return (
    <div className="flex w-full mt-4">
      <Link href={`/${userDetail?.username}`} className="w-10 h-10">
        <Image
          src={userDetail?.avatar!}
          alt={"profile-pic"}
          className="rounded-full object-cover w-full h-full"
        />
      </Link>
      {/* w-[calc(100%-2.5rem)] */}
      <div
        className="flex flex-col w-[calc(100%-2.5rem)] ml-1"
        id={replyDetails._id}
      >
        <div className="bg-secondGray/60 px-3 py-2 rounded-r-2xl rounded-bl-2xl">
          <CommentItem
            userDetail={userDetail}
            postUserId={postUserId}
            id={replyDetails._id}
            inputRef={commentRef}
            replyDetails={replyDetails}
            setReplyInput={setReplyInput}
          />
        </div>

        {/*Comment's Replies */}
        {replyDetails?.repliesCount > 0
          ? replyDetails?.firstTwoReplies.map((it) => (
              <ReplyItem
                it={it}
                key={it._id}
                replyRef={replyRef}
                setReplyInput={setReplyInput}
                commentId={replyDetails._id}
                postUserId={postUserId}
              />
            ))
          : null}

        {/* View More Replies */}
        {replyDetails?.repliesCount > replyDetails?.firstTwoReplies?.length &&
        !replyLoading ? (
          <div className="flex justify-center mt-2">
            <Button
              onClick={() => {
                handleGetReplies(replyDetails._id);
              }}
              variant="tertiary"
              cls="text-xs font-medium text-dark underline"
            >
              View {replyDetails?.repliesCount - 2} more replies
            </Button>
          </div>
        ) : null}

        {replyLoading ? (
          <div className="flex justify-center mt-2">
            <Loader col="text-dark" h="h-6" w="w-6" />
          </div>
        ) : null}

        {/* Reply Input */}
        {replyInput.shouldVisible ? (
          <ReplyInput
            replyRef={replyRef}
            postId={null}
            selectedId={replyInput.id}
            replyInput={replyInput}
            commentId={replyDetails._id}
            setReplyInput={setReplyInput}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CommentStructure;
