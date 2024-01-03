import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Button, Image, Link, TextArea } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import toast from "react-hot-toast";
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";

type Props = {
  replyRef: React.RefObject<HTMLTextAreaElement>;
  postId: string | null;
  selectedId?: string;
  commentId?: string;
  replyInput?: ICommentState;
  setReplyInput?: React.Dispatch<React.SetStateAction<ICommentState>>;
};

const ReplyInput: FC<Props> = ({
  replyRef,
  postId,
  selectedId,
  commentId,
  setReplyInput,
  replyInput,
}) => {
  const [replyMessage, setReplyMessage] = React.useState("");
  const [replying, setReplying] = React.useState(false);

  useAutosizeTextArea(replyRef.current, replyMessage);

  const { commentOnPost, user, replyOnComment } = useAppBoundStore((state) => ({
    commentOnPost: state.commentOnPost,
    user: state.user,
    replyOnComment: state.replyOnComment,
  }));

  const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyMessage) return toast.error("Comment cannot be empty");

    setReplying(true);
    if (typeof postId === "string") {
      if (postId) {
        const obj = {
          text: replyMessage,
          id: postId,
        };
        commentOnPost(obj).then(() => {
          setReplyMessage("");
          setReplying(false);
        });
      }
    }

    if (typeof selectedId === "string") {
      let obj: {
        text: string;
        commentId: string;
        replyId?: string;
        replyingToUsername?: string;
      } = {
        text: replyMessage,
        commentId: commentId as string,
      };

      if (commentId !== selectedId) obj = { ...obj, replyId: selectedId };

      if (replyInput?.isReply && replyInput?.replyingTo?.username) {
        obj = {
          ...obj,
          replyingToUsername: replyInput?.replyingTo?.username,
          text: replyMessage.replace(
            `@${replyInput?.replyingTo?.username} `,
            ""
          ),
        };
      }

      replyOnComment(obj).then(() => {
        setReplying(false);
        setReplyMessage("");
        setReplyInput!({
          id: "",
          shouldVisible: false,
          isReply: false,
          replyingTo: {
            username: "",
            name: "",
          },
        });
      });

      const cmtDiv = document.getElementById(commentId as string);
      if (cmtDiv) {
        cmtDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (replyInput?.shouldVisible) {
      replyRef.current?.focus();
    }

    if (replyInput?.isReply && replyInput?.replyingTo?.username) {
      setReplyMessage(`@${replyInput?.replyingTo?.username} `);
    }
  }, [replyInput]);

  return (
    <form className="flex mb-4 mt-3" onSubmit={handleSubmition}>
      <Link href={`/${user?.username}`} className="md:w-10 md:h-10 h-9 w-9">
        <Image
          src={user?.avatar!}
          alt={user?.name}
          className={`rounded-full object-cover h-9 w-9`}
        />
      </Link>
      <div className="flex flex-col w-[calc(100%-2.5rem)] border rounded-lg px-2">
        <TextArea
          placeholder="Post your reply..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          cls="w-full resize-none border-none placeholder:text-gray-500 !px-0"
          ref={replyRef}
          rows={1}
        />
        {replyMessage ? (
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={replying || !replyMessage}
              isLoading={replying}
              variant="primary"
              cls="rounded-lg md:text-sm text-xs h-8 w-16 my-2 font-medium"
            >
              Post
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ReplyInput;
