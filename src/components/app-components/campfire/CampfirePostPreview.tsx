/* eslint-disable @next/next/no-img-element */
import {
  ArrowSVG,
  AvatarSVG,
  CommenetSVG,
  DeleteSVG,
  MessageSVG,
  ThreeDotsSVG,
  // UpArrowSVG,
  // VerifiedSVG,
  deleteIcon,
} from "@assets/index";
import {
  Button,
  CustomTooltip,
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  Image,
  Link,
} from "@components";
import { useAppBoundStore } from "@store/mainStore";
// import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import SendMessageModal from "../Explore/SendMessageModal";
import { urlify, formatText } from "../../../utils/index";
import ShareContent from "./ShareContent";

const cmnCls =
  "w-7 h-7 flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 border rounded-full";

const CampfirePostPreview = ({
  item,
  shouldShowFullContent = false,
}: {
  item: IdeaResponse;
  shouldShowFullContent?: boolean;
}) => {
  const router = useRouter();
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [enlargeImage, setEnlargeImage] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(
    item?.isFollowing || false
  );

  const {
    setSelectPost,
    upvotePost,
    user,
    isLoggedIn,
    deleteIdea,
    followUser,
    unfollowUser,
  } = useAppBoundStore((state) => ({
    setSelectPost: state.setSelectPost,
    upvotePost: state.upvotePost,
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    deleteIdea: state.deleteIdea,
    followUser: state.followUser,
    unfollowUser: state.unfollowUser,
  }));

  const isSameUser = user?._id === item?.user?._id;
  const [upvoteState, setupvoteState] = useState({
    isUpvoted: item?.isUpvoted as boolean,
    upvoteCount: item?.upvoteCount as number,
  });

  const handleUpvoteClick = () => {
    const { isUpvoted, upvoteCount } = upvoteState;
    if (isUpvoted) {
      setupvoteState({
        isUpvoted: false,
        upvoteCount: upvoteCount - 1,
      });
    } else {
      setupvoteState({
        isUpvoted: true,
        upvoteCount: upvoteCount + 1,
      });
    }

    if (isLoggedIn) {
      upvotePost({
        id: item?._id!,
        setupvoteState,
      }).then((res) => {
        console.log("upvoted");
      });
    } else toast.error("Please login to upvote");
  };

  const handleComment = () => {
    if (!isLoggedIn) return toast.error("Please login to comment");
    setSelectPost(item);
    router.push(`/feed/${item?._id}`);
  };

  return (
    <>
      <CustomTooltip id="post-tooltip" />
      <div className="flex justify-between w-full md:px-6 px-4 py-4">
        <Link
          href={`/${item?.user?.username}`}
          className="flex items-center gap-3 sm:w-auto w-10 h-10"
        >
          <Image
            src={item?.user?.avatar!}
            alt={item.user.name}
            className="rounded-full object-cover w-10 h-10"
          />
        </Link>
        <div className="flex flex-col gap-3 w-[calc(100%-2.5rem)] ml-3">
          {/* User Info */}
          <div className="flex items-center justify-between w-full">
            <Link
              href={`/${item?.user?.username}`}
              className="flex flex-col w-full"
            >
              <p className="md:text-base text-sm font-medium flex items-center gap-1">
                {item?.user?.name}{" "}
                {/* {item?.user?.isVerified ? <VerifiedSVG /> : null} */}
                {isFollowing ? (
                  <span className="text-xs text-gray-500 hover:text-dark pt-[1px]">
                    · following
                  </span>
                ) : null}
              </p>
              <p className="text-gray-500 text-xs font-medium ">
                {formatText(item?.user?.title!, 65)}
              </p>
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* <p className="text-gray-500 text-xs  italic">
                {moment(item?.createdAt).fromNow()}
              </p> */}
                <Dropdown>
                  <DropdownButton cls="w-full">
                    <ThreeDotsSVG className="w-4" />
                  </DropdownButton>
                  <DropdownContent cls="w-40 space-y-1 py-1.5 h-min text-sm z-10 top-4 bg-white shadow-xl">
                    {isSameUser ? (
                      <DropdownItem
                        className="flex items-center gap-2 hover:bg-gray-100"
                        onClick={() =>
                          toast.promise(
                            deleteIdea({
                              id: item?._id!,
                            }),
                            {
                              loading: "Deleting...",
                              success: "Deleted",
                              error: "Error deleting",
                            }
                          )
                        }
                      >
                        <Image src={deleteIcon.src} className="w-5" alt="del" />
                        Delete
                      </DropdownItem>
                    ) : null}
                    {isFollowing ? (
                      <DropdownItem
                        className="flex items-center gap-2 hover:bg-gray-100"
                        onClick={() => {
                          // setToggle(!toggle);
                          unfollowUser(item?.user?._id!).then(() => {
                            setIsFollowing(false);
                          });
                        }}
                      >
                        <DeleteSVG className="w-5" />
                        Unfollow
                      </DropdownItem>
                    ) : null}

                    {!isSameUser && !isFollowing ? (
                      <DropdownItem
                        className="flex items-center gap-2 hover:bg-gray-100"
                        onClick={() => {
                          if (!isLoggedIn)
                            return toast.error("Please login First!!");
                          followUser(item?.user?._id).then(() =>
                            setIsFollowing(true)
                          );
                        }}
                      >
                        <AvatarSVG className="w-5" />
                        Follow
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

          {/* Content */}
          <div className="">
            <p
              onClick={() => {
                if (shouldShowFullContent) return;
                setSelectPost(item);
                router.push(`/feed/${item?._id}`, undefined, {
                  scroll: false,
                });
              }}
              className={`text-gray-900  md:text-[15px] text-sm whitespace-pre-line break-all md:break-normal font-sans ${
                shouldShowFullContent ? "cursor-auto" : "cursor-pointer"
              }`}
              id="editor-text"
              dangerouslySetInnerHTML={{
                __html:
                  item?.description?.length > 300 &&
                  !isReadMore &&
                  !shouldShowFullContent
                    ? urlify(item?.description?.substring(0, 300)) + "..."
                    : urlify(item?.description),
              }}
            />
            {item?.description?.length > 300 &&
            !isReadMore &&
            !shouldShowFullContent ? (
              <button
                onClick={() => {
                  setIsReadMore(true);
                }}
                className="text-blue-800 underline"
              >
                Read more
              </button>
            ) : (
              <div className="flex flex-wrap text-sm mt-3 gap-1">
                {item?.tags?.map((tag, i) => {
                  return (
                    <p key={i} className={`font-medium text-primary`}>
                      #{tag}
                    </p>
                  );
                })}
              </div>
            )}

            {item.imgUrl?.length > 0 ? (
              <div className="flex justify-center overflow-hidden mt-2 border rounded-xl">
                {item.imgUrl.slice(0, 2).map((img, i) => (
                  <Image
                    src={img}
                    alt="img"
                    className={`object-cover object-center border  h-auto  ${
                      item.imgUrl?.length > 1
                        ? "w-1/2 sm:h-[300px]"
                        : "w-full max-h-[400px] rounded-xl"
                    }
                    `}
                    key={i}
                    onClick={() => {
                      setEnlargeImage(img);
                    }}
                  />
                ))}
              </div>
            ) : null}
            {enlargeImage.length > 0 && (
              <div
                className="fixed top-0 z-50 left-0 p-20 w-full h-screen hide__scrollbar"
                style={{
                  backgroundColor: "rgba(0,0,0,0.88)",
                }}
                id="imgEnlarge"
                onClick={() => setEnlargeImage("")}
              >
                <Image
                  src={enlargeImage}
                  alt="img"
                  className="object-contain w-full h-full"
                />

                <button
                  className="absolute top-5 right-5 z-50"
                  onClick={() => setEnlargeImage("")}
                >
                  <DeleteSVG className="w-8 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between w-full">
            <Button onClick={handleComment} variant="tertiary">
              <CommenetSVG className="w-6 text-gray-600 hover:text-primary" />
              <p className="text-center pl-1"> {item?.commentsCount || 0} </p>
            </Button>

            {item?.user?._id !== user?._id ? (
              <Button
                onClick={() => {
                  if (!isLoggedIn)
                    return toast.error("Please login to message");
                  setSendMessageModal(true);
                }}
                data-tooltip-id="post-tooltip"
                data-tooltip-content="Message"
                variant="tertiary"
              >
                <MessageSVG className="w-5 text-gray-500 hover:text-primary" />
              </Button>
            ) : null}

            <div className="flex items-center">
              <button
                className={`${cmnCls} ${
                  upvoteState.isUpvoted
                    ? "bg-primary text-white hover:bg-primary hover:text-white hover:border-primary border-primary"
                    : "hover__effect text-gray-600"
                }`}
                disabled={!isLoggedIn}
                onClick={handleUpvoteClick}
              >
                <ArrowSVG className="w-4" />
              </button>
              <p className="text-center pl-2">
                {" "}
                {upvoteState.upvoteCount || 0}{" "}
              </p>
            </div>

            <ShareContent name={item?.user?.name!} _id={item?._id!} />
          </div>
        </div>
      </div>

      {sendMessageModal && (
        <SendMessageModal
          isOpen={sendMessageModal}
          userId={item?.user?._id!}
          name={item.user.name}
          closeModal={() => setSendMessageModal(false)}
        />
      )}
    </>
  );
};

export default CampfirePostPreview;
