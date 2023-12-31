/* eslint-disable @next/next/no-img-element */
import { ArrowSVG } from "@assets/index";
import { Button, CustomTooltip, Layout, Loader } from "@components";
import SendMessageModal from "@components/app-components/Explore/SendMessageModal";
import MeetNewPeople from "@components/app-components/MeetNewPeople";
import CampfirePostPreview from "@components/app-components/campfire/CampfirePostPreview";
import CommentStructure from "@components/app-components/campfire/CommentStructure";
import ReplyInput from "@components/app-components/campfire/ReplyInput";
import { useAppBoundStore } from "@store/mainStore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { memo, useEffect, useRef, useState } from "react";

const CampfirePostPage = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [sendMessageModal, setSendMessageModal] = useState(false);

  const inititalLoad = useRef(true);

  const commentRef = React.useRef<HTMLTextAreaElement>(null);

  const {
    selectedPost,
    selectedPostComment,
    getAllComments,
    getPostById,
    isLoggedIn,
  } = useAppBoundStore((state) => ({
    selectedPost: state.selectedPost,
    selectedPostComment: state.selectedPostComment,
    getAllComments: state.getAllComments,
    getPostById: state.getPostById,

    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    if (inititalLoad.current && postId) {
      setLoading(true);
      setCommentLoading(true);
      const obj = {
        postId,
        page,
      };
      Promise.all([
        getPostById(postId).then(() => {
          setLoading(false);
        }),
        getAllComments(obj).then(() => {
          setCommentLoading(false);
        }),
      ]);
    }
  }, [postId]);

  return (
    <Layout>
      <Head>
        <title>Feed | Piqr </title>
        <meta
          name="description"
          content="Discover & Collaborate with the best talent around the world"
        />
        <meta
          name="keywords"
          content="Talent, Networking, Founders, hackathon partners, students, monetize, network"
        />
        <meta name="author" content="Piqr" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Piqr" />
      </Head>
      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader col="text-gray-800" />
        </div>
      ) : selectedPost ? (
        <div className="flex w-full gap-5">
          <div className="w-full font-poppins lg:w-3/4 md:mb-10 mb-16">
            <CustomTooltip id="postId-tooltip" />
            <Button
              onClick={() => {
                router.back();
                // window.history.back();
                //scroll to same position
                // console.log(path);
                // router.push(path as string, undefined, { scroll: false });
              }}
              variant="tertiary"
              cls="font-medium gap-1 w-24 h-12 px-4"
            >
              <ArrowSVG className="-rotate-90 w-5" /> Post
            </Button>

            <CampfirePostPreview item={selectedPost!} shouldShowFullContent />
            <div className="mt-4">
              {isLoggedIn ? (
                <div className="px-3 ">
                  <ReplyInput
                    replyRef={commentRef}
                    postId={selectedPost?._id!}
                  />
                </div>
              ) : null}
              {commentLoading ? (
                <div className="flex justify-center mt-10">
                  <Loader col="text-gray-800" />
                </div>
              ) : null}
              <div className="mt-4 px-4">
                <p className=" text-sm font-medium mb-4">Comments</p>
                {!commentLoading &&
                selectedPostComment?.comments?.length! > 0 ? (
                  selectedPostComment?.comments?.map((comment, i) => {
                    if (!comment.user) return null;
                    return (
                      <CommentStructure
                        key={comment._id}
                        userDetail={comment.user}
                        replyDetails={comment}
                        postUserId={selectedPost?.user?.username!}
                      />
                    );
                  })
                ) : (
                  <div className="flex justify-center text-gray-600 mt-5 ">
                    {" "}
                    No comments yet{" "}
                  </div>
                )}
              </div>
            </div>
          </div>

          <MeetNewPeople />
        </div>
      ) : (
        <div className="flex justify-center mt-20 h-[80vh]">
          <p>
            No post found.{" "}
            <span
              onClick={() => router.push("/feed")}
              className="text-primary cursor-pointer"
            >
              Go back
            </span>
          </p>
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
