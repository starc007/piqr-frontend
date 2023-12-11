/* eslint-disable @next/next/no-img-element */
import { MessageSVG } from "@assets/index";
import { CustomButton, CustomTooltip, Link } from "@components";
import React from "react";
import SendMessageModal from "../Explore/SendMessageModal";
import { toast } from "react-hot-toast";
import { useAppBoundStore } from "@store/mainStore";

const RecommedPeople = (props: ProfileResponse) => {
  const item = props;

  const [sendMessageModal, setSendMessageModal] = React.useState(false);

  const { isLoggedIn, user, unfollowUser, followUser } = useAppBoundStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      user: state.user,
      unfollowUser: state.unfollowUser,
      followUser: state.followUser,
    })
  );

  const isFollowing = item?.folowId?.followers?.includes(user?._id!);

  return (
    <div className=" p-4 border-b">
      <CustomTooltip id="tool-tip" />
      <div className="flex justify-between">
        <div className="w-4/5">
          <div className="flex items-center">
            <img
              src={item.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <Link href={`/${item.username}`} className="ml-2 cursor-pointer">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-gray-500">@{item.username}</p>
            </Link>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">{item.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CustomButton
            data-tooltip-id="tool-tip"
            data-tooltip-content="Message"
            onClick={() => {
              isLoggedIn
                ? setSendMessageModal(true)
                : toast.error("Please login to collaborate!");
            }}
            variant="default"
            cls={`rounded-full border h-9 w-9 text-sm bg-gray-100 text-dark`}
          >
            <MessageSVG className="w-5" />
          </CustomButton>
          <CustomButton
            onClick={() => {
              // isLoggedIn ? FollowUnfollow() : toast.error("Please login!");
              isLoggedIn
                ? isFollowing
                  ? unfollowUser(item._id!).then(() =>
                      console.log("unfollowed")
                    )
                  : followUser(item._id!).then(() => console.log("followed"))
                : toast.error("Please login!");
            }}
            cls={`rounded-full group font-medium h-9 text-sm px-4 text-xs transition duration-300 ${
              isFollowing
                ? "bg-dark/10  hover:text-red-500 hover:bg-red-100"
                : "bg-dark  text-white hover:bg-dark/80"
            }`}
            variant="default"
          >
            <span className={isFollowing ? "group-hover:hidden block" : ""}>
              {isFollowing ? "Following" : "Follow"}
            </span>
            {isFollowing ? (
              <span className="group-hover:block hidden">Unfollow</span>
            ) : null}
          </CustomButton>
        </div>
      </div>
      {sendMessageModal && (
        <SendMessageModal
          isOpen={sendMessageModal}
          closeModal={() => setSendMessageModal(false)}
          name={item.name}
          userId={item._id}
        />
      )}
    </div>
  );
};

export default RecommedPeople;
