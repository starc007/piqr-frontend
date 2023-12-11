/* eslint-disable @next/next/no-img-element */
import {
  ArrowSVG,
  CommenetSVG,
  DeleteSVG,
  MessageSVG,
  ThreeDotsSVG,
  // UpArrowSVG,
  // VerifiedSVG,
  deleteIcon,
} from "@assets/index";
import {
  CustomButton,
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
import React, { useState, memo, useEffect } from "react";
import { toast } from "react-hot-toast";
import SendMessageModal from "../Explore/SendMessageModal";
import { urlify, formatText } from "../../../utils/index";
import ShareContent from "./ShareContent";

const cmnCls =
  "md:w-8 md:h-8 w-7 h-7 flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 border rounded-full ";

const CampfirePostPreview = ({ item }: { item: IdeaResponse }) => {
  const router = useRouter();
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [enlargeImage, setEnlargeImage] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);

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
  const isFollowing = item?.user?.folowId?.followers?.includes(user?._id!);

  const isEitherPresent = (isSameUser || isFollowing) && isLoggedIn;
  const isUpvoted = item?.upvotes?.includes(user?._id!);

  const handleUpvoteClick = () => {
    if (isLoggedIn) {
      upvotePost({
        id: item?._id!,
      }).then((res) => {
        console.log("upvoted");
        // socket?.emit("upvoted", item);
      });
    } else toast.error("Please login to upvote");
  };

  const handleComment = () => {
    if (!isLoggedIn) return toast.error("Please login to comment");
    setSelectPost(item);
    router.push(`/feed/${item?._id}`);
  };

  return (
    <div className="font-poppins w-full md:px-6 px-4">
      <CustomTooltip id="post-tooltip" />
      <div className="py-4">
        <div className="flex justify-between">
          <Link
            href={`/${item?.user?.username}`}
            className="flex items-center gap-3 sm:w-auto w-3/4"
          >
            <img
              src={item?.user?.avatar!}
              alt={"profile-pic"}
              className="rounded-full object-cover w-10 h-10"
            />
            <div>
              <p className="md:text-base text-sm font-semibold flex items-center gap-1">
                {item?.user?.name}{" "}
                {/* {item?.user?.isVerified ? <VerifiedSVG /> : null} */}
                {isFollowing ? (
                  <span className="text-xs font-medium text-gray-500 hover:text-dark">
                    · following
                  </span>
                ) : null}
              </p>
              <p className="text-gray-500 text-xs font-medium ">
                {formatText(item?.user?.title!, 65)}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {/* <p className="text-gray-500 text-xs  italic">
                {moment(item?.createdAt).fromNow()}
              </p> */}

            {!isSameUser && !isFollowing ? (
              <CustomButton
                onClick={() => {
                  if (!isLoggedIn) return toast.error("Please login First!!");
                  // setToggle(!toggle);
                  followUser(item?.user?._id).then(() =>
                    console.log("followed")
                  );
                }}
                cls="h-8 rounded-lg text-sm px-2 font-medium  bg-gray-200 hover:bg-gray-300 duration-300 transition"
              >
                + Follow
              </CustomButton>
            ) : null}

            {isEitherPresent ? (
              <Dropdown>
                <DropdownButton cls="">
                  <ThreeDotsSVG className="w-4" />
                </DropdownButton>
                <DropdownContent cls="w-40 space-y-1 py-1.5 h-min text-sm">
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
                      <Image src={deleteIcon} className="w-5" alt="del" />
                      Delete
                    </DropdownItem>
                  ) : null}
                  {isFollowing ? (
                    <DropdownItem
                      className="flex items-center gap-2 hover:bg-gray-100"
                      onClick={() => {
                        // setToggle(!toggle);
                        unfollowUser(item?.user?._id!).then(() =>
                          console.log("unfollowed")
                        );
                      }}
                    >
                      <DeleteSVG className="w-5" />
                      Unfollow
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
            ) : null}
          </div>
        </div>

        <div className="mt-3">
          <p
            onClick={() => {
              setSelectPost(item);
              router.push(`/feed/${item?._id}`);
            }}
            className="text-gray-600  md:text-[15px] text-sm whitespace-pre-line break-all md:break-normal font-sans cursor-pointer"
            id="editor-text"
            dangerouslySetInnerHTML={{
              __html:
                item?.description?.length > 300 && !isReadMore
                  ? urlify(item?.description?.substring(0, 300)) + "..."
                  : urlify(item?.description),
            }}
          />
          {item?.description?.length > 300 && !isReadMore ? (
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
            <div className="flex justify-center gap-2 overflow-hidden px-2 mt-2">
              {item.imgUrl.slice(0, 2).map((img, i) => (
                <img
                  src={img}
                  alt="img"
                  className={`object-contain object-center border rounded-lg sm:max-h-[500px] h-auto  ${
                    item.imgUrl?.length > 1 ? "w-1/2" : "w-full"
                  }`}
                  key={i}
                  onClick={() => {
                    setEnlargeImage(img);
                  }}
                />
              ))}
            </div>
          ) : null}
          {enlargeImage.length > 0 && (
            <>
              <div
                className="fixed top-0 z-50 left-0 p-20 flex justify-center w-full h-screen"
                style={{
                  backgroundColor: "rgba(0,0,0,0.84)",
                }}
                id="imgEnlarge"
                onClick={() => setEnlargeImage("")}
              >
                <div className="h-screen">
                  <img
                    src={enlargeImage}
                    alt="img"
                    className="object-contain object-center w-full max-h-[80vh]"
                  />
                </div>
              </div>
              <button
                className="absolute top-10 right-10 z-50"
                onClick={() => setEnlargeImage("")}
              >
                <DeleteSVG className="w-8 text-white" />
              </button>
            </>
          )}
        </div>
        <div className="flex justify-between w-full mt-3">
          <div className="flex items-center">
            <button
              className={`${cmnCls} ${
                isUpvoted
                  ? "bg-primary text-white hover:bg-primary hover:text-white hover:border-primary border-primary"
                  : "hover__effect"
              }`}
              disabled={!user || item?.user?._id === user?._id}
              onClick={handleUpvoteClick}
            >
              <ArrowSVG className="w-5" />
            </button>
            <p className="text-center pl-2"> {item?.upvotes?.length || 0} </p>
          </div>

          {item?.user?._id !== user?._id ? (
            <>
              <CustomButton
                onClick={() => {
                  if (!isLoggedIn)
                    return toast.error("Please login to message");
                  setSendMessageModal(true);
                }}
                cls="w-10 h-10 font-semibold hover:bg-gray-100 !rounded-full"
                data-tooltip-id="post-tooltip"
                data-tooltip-content="Message"
              >
                <MessageSVG className="sm:w-6 w-5" />
              </CustomButton>
            </>
          ) : null}
          <CustomButton
            onClick={handleComment}
            cls="w-10 h-10 font-semibold hover:bg-gray-100 !rounded-full"
            data-tooltip-id="post-tooltip"
            data-tooltip-content="Comment"
          >
            <CommenetSVG className="sm:w-6 w-5" />
          </CustomButton>

          <ShareContent name={item?.user?.name!} _id={item?._id!} />
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
    </div>
  );
};

export default CampfirePostPreview;
