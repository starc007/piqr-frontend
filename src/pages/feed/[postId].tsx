/* eslint-disable @next/next/no-img-element */
import { ArrowSVG, DeleteSVG, MessageSVG, ShareSVG } from "@assets/index";
import {
  Button,
  CustomButton,
  CustomTooltip,
  Image,
  Input,
  Layout,
  Link,
  Loader,
  TextArea,
} from "@components";
import SendMessageModal from "@components/app-components/Explore/SendMessageModal";
import Navbar from "@components/app-components/Navbar";
import Comment from "@components/app-components/campfire/Comment";
import ShareContent from "@components/app-components/campfire/ShareContent";
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";
import { usePreviousRoute } from "@hooks/usePreviousRoute";
import { useAppBoundStore } from "@store/mainStore";
import { urlify } from "@utils";
// import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const cmnCls =
  "md:w-8 md:h-8 w-7 h-7 flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 border rounded-full hover:bg-gray-100 ";

const CampfirePostPage = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const [commentAdd, setCommentAdd] = useState("");
  const [commeting, setCommenting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [enlargeImage, setEnlargeImage] = useState("");
  const [forceRender, setForceRender] = useState(false);

  const commentRef = React.useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(commentRef.current, commentAdd);

  const {
    selectedPost,
    commentOnPost,
    selectedPostComment,
    getAllComments,
    getPostById,
    upvotePost,
    // downvotePost,
    isLoggedIn,
    user,
  } = useAppBoundStore((state) => ({
    selectedPost: state.selectedPost,
    commentOnPost: state.commentOnPost,
    selectedPostComment: state.selectedPostComment,
    getAllComments: state.getAllComments,
    getPostById: state.getPostById,
    upvotePost: state.upvotePost,
    // downvotePost: state.downvotePost,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  }));

  useEffect(() => {
    if (postId) {
      setCommentLoading(true);
      const obj = {
        postId,
        page,
      };
      getAllComments(obj).then(() => {
        setCommentLoading(false);
      });
    }

    if (postId) {
      setLoading(true);
      getPostById(postId).then(() => {
        setLoading(false);
      });
    }
  }, [postId]);

  const handleComment = (_id: string) => {
    if (!_id) return toast.error("Something went wrong");
    if (!commentAdd) return toast.error("Comment cannot be empty");
    const obj = {
      text: commentAdd,
      id: _id,
    };
    setCommenting(true);
    commentOnPost(obj).then(() => {
      setCommenting(false);
      setCommentAdd("");
    });
  };

  return (
    <Layout>
      <Head>
        <title>Feed | Sanchar </title>
        <meta
          name="description"
          content="Discover & Collaborate with the best talent around the world"
        />
        <meta
          name="keywords"
          content="Talent, Networking, Founders, hackathon partners, students, monetize, network"
        />
        <meta name="author" content="Sanchar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Sanchar" />
      </Head>
      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader col="text-gray-800" />
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-full border-r min-h-screen font-poppins lg:w-3/4 md:mb-10 mb-16">
            <CustomTooltip id="postId-tooltip" />
            <button
              onClick={() => {
                router.back();
                // window.history.back();
                //scroll to same position
                // console.log(path);
                // router.push(path as string, undefined, { scroll: false });
              }}
              className="font-semibold text-primary flex items-center gap-1 border-b w-full h-16 px-4 text-lg sticky top-0 bg-white"
            >
              <ArrowSVG className="-rotate-90 w-6" /> go back
            </button>

            <div className=" space-y-4 p-4 md:p-5  mb-6 border-b">
              <div className="font-medium flex justify-between gap-2 text-sm ">
                <Link
                  href={`/${selectedPost?.user?.username}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={selectedPost?.user?.avatar!}
                    alt={"profile-pic"}
                    className="rounded-full object-cover w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <p className="text-base text-gray-700 flex items-center gap-1.5">
                      {selectedPost?.user?.name}{" "}
                      {/* {selectedPost?.user?.isVerified && <VerifiedSVG />} */}
                    </p>

                    <p className="text-xs text-gray-500">
                      {selectedPost?.user?.title}{" "}
                    </p>
                  </div>
                </Link>
                {/* <p className="text-gray-500 text-xs pt-[2px]">
              {moment(selectedPost?.createdAt).fromNow()}
            </p> */}
              </div>
              <div
                className="text-gray-700 mb-8 whitespace-pre-wrap font-sans"
                id="editor-text"
                dangerouslySetInnerHTML={{
                  __html: urlify(selectedPost?.description!),
                }}
              />
              <div className="flex flex-wrap gap-2 text-sm mt-3">
                {selectedPost?.tags?.map((tag, i) => {
                  return (
                    <p key={i} className={`text-primary font-medium`}>
                      #{tag}
                    </p>
                  );
                })}
              </div>
              {selectedPost!?.imgUrl?.length > 0 ? (
                <div className="flex justify-center gap-2 overflow-hidden  p-2">
                  {selectedPost?.imgUrl.slice(0, 2).map((img, i) => (
                    <img
                      src={img}
                      alt="img"
                      className={`object-contain object-center cursor-pointer sm:max-h-[500px] h-auto border rounded-lg ${
                        selectedPost?.imgUrl?.length > 1 ? "w-1/2" : "w-full"
                      }`}
                      key={i}
                      onClick={() => {
                        setEnlargeImage(img);
                      }}
                    />
                  ))}
                </div>
              ) : null}
              {enlargeImage && (
                <div
                  className="fixed top-0 z-50 left-0 p-20 flex justify-center w-full h-screen bg-dark/50"
                  id="imgEnlarge"
                  onClick={() => setEnlargeImage("")}
                >
                  <div className="h-screen">
                    <img
                      src={enlargeImage}
                      alt="img"
                      className="object-contain object-center max-w-screen-xl max-h-[80vh]"
                    />
                  </div>
                  <button
                    className="absolute top-10 right-10"
                    onClick={() => setEnlargeImage("")}
                  >
                    <DeleteSVG className="w-8" />
                  </button>
                </div>
              )}
              <div className="flex justify-between md:gap-4 gap-2 flex-wrap">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (isLoggedIn) {
                        setForceRender(!forceRender);
                        upvotePost(
                          {
                            id: selectedPost?._id!,
                          },
                          true
                        );
                      } else toast.error("Please login to upvote");
                    }}
                    className={`${cmnCls} ${
                      selectedPost?.upvotes?.includes(user?._id!)
                        ? "bg-primary text-white hover:bg-primary hover:text-white hover:border-primary border-primary"
                        : "hover__effect"
                    }`}
                    disabled={
                      !user ||
                      selectedPost?.user?._id === user?._id ||
                      !isLoggedIn
                    }
                  >
                    <ArrowSVG className="w-5" />
                  </button>
                  {/* <p className="text-center"> {selectedPost?.count} </p> */}
                  <p className="text-center">
                    {" "}
                    {selectedPost?.upvotes?.length || 0}{" "}
                  </p>
                </div>
                {selectedPost?.user?._id !== user?._id || !isLoggedIn ? (
                  <>
                    <CustomButton
                      onClick={() => {
                        if (!isLoggedIn)
                          return toast.error("Please login to message");
                        setSendMessageModal(true);
                      }}
                      cls="px-2 h-9 font-semibold hover:bg-gray-200/70 rounded-full md:text-sm text-xs"
                      data-tooltip-id="postId-tooltip"
                      data-tooltip-content="Message"
                    >
                      <MessageSVG className="w-6" />
                    </CustomButton>
                  </>
                ) : null}

                <ShareContent
                  name={selectedPost?.user?.name!}
                  _id={selectedPost?._id!}
                />
              </div>
            </div>

            <div className="">
              {isLoggedIn ? (
                <form
                  className="flex justify-between gap-2 border-b pb-4 sm:px-4 px-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleComment(selectedPost?._id!);
                  }}
                >
                  <Link
                    href={`/${user?.username}`}
                    className="md:w-10 md:h-10 h-9 w-9"
                  >
                    <img
                      src={user?.avatar!}
                      alt={"profile-pic"}
                      className="rounded-full object-cover md:w-10 md:h-10 h-9 w-9"
                    />
                  </Link>
                  <div className="w-3/4">
                    <TextArea
                      placeholder="Post your reply..."
                      value={commentAdd}
                      onChange={(e) => setCommentAdd(e.target.value)}
                      cls="w-full resize-none border-none placeholder:text-gray-500 px-0"
                      ref={commentRef}
                      rows={1}
                    />
                  </div>
                  <CustomButton
                    type="submit"
                    disabled={commeting || !commentAdd}
                    isLoading={commeting}
                    cls="md:text-sm text-xs bg-primary text-white hover:border-primary rounded-full md:w-20 w-16 h-10 font-semibold disabled:opacity-60"
                  >
                    Reply
                  </CustomButton>
                </form>
              ) : null}
              {commentLoading ? (
                <div className="flex justify-center mt-10">
                  <Loader col="text-gray-800" />
                </div>
              ) : null}
              {!commentLoading ? (
                selectedPostComment?.comments?.length! > 0 ? (
                  selectedPostComment?.comments?.map((comment, i) => (
                    <Comment
                      key={i}
                      id={comment?._id!}
                      pfp={comment?.user?.avatar!}
                      name={comment?.user?.name!}
                      createdAt={comment?.date!}
                      comment={comment?.msg}
                      replies={comment?.replies!}
                      username={comment?.user?.username!}
                      title={comment?.user?.title!}
                      postUserId={selectedPost?.user?._id!}
                      commentUserId={comment?.user?._id!}
                      isVerified={comment?.user?.isVerified!}
                    />
                  ))
                ) : (
                  <div className="flex justify-center text-gray-600 mt-5">
                    {" "}
                    No comments yet{" "}
                  </div>
                )
              ) : null}
            </div>
          </div>
          <div className="lg:flex flex-col hidden w-1/2 border-r">
            <Navbar />
            <div className="flex flex-col items-center px-3 py-5 border-b sticky top-16">
              <div className="flex flex-col items-center">
                <img
                  src={selectedPost?.user?.avatar!}
                  alt={"profile-pic"}
                  className="rounded-lg object-cover w-20 h-20 border"
                />
                <Link
                  href={`/${selectedPost?.user?.username}`}
                  className="flex flex-col text-center items-center mt-2"
                >
                  <span className="md:text-base text-sm text-dark flex items-center font-semibold">
                    {selectedPost?.user?.name}{" "}
                    {/* {item?.user?.isVerified ? <VerifiedSVG /> : null} */}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center">
                    @{selectedPost?.user?.username}
                  </span>
                  <span className="text-gray-600 text-xs pt-1">
                    {selectedPost?.user?.title}
                  </span>
                </Link>
              </div>
              <CustomButton
                onClick={() => {
                  isLoggedIn
                    ? setSendMessageModal(true)
                    : toast.error("Please login to collaborate!");
                }}
                variant="default"
                cls={`rounded-full border h-10 w-2/3 bg-dark/90 text-white mt-4`}
              >
                <MessageSVG className="text-white w-4" />
                <span className="ml-2 font-medium text-sm">Get in Touch</span>
              </CustomButton>
            </div>
          </div>
        </div>
      )}
      <SendMessageModal
        isOpen={sendMessageModal}
        userId={selectedPost?.user?._id!}
        name={selectedPost?.user?.name!}
        closeModal={() => setSendMessageModal(false)}
      />
    </Layout>
  );
};

export default memo(CampfirePostPage);
