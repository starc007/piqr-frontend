/* eslint-disable @next/next/no-img-element */
import { Button, CustomButton } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { useRouter } from "next/router";
import React, { FC, memo, use } from "react";

interface Props {
  name: string;
  username: string;
  avatar: string;
  title: string;
  id: string;
}

const FollowCard: FC<Props> = ({ name, username, avatar, title, id }) => {
  const router = useRouter();

  const { followingIds, user, unfollowUser, followUser } = useAppBoundStore(
    (state) => ({
      followingIds: state.followingIds,
      user: state.user,
      unfollowUser: state.unfollowUser,
      followUser: state.followUser,
    })
  );

  const isFollowing = followingIds.includes(id);
  const isSameUser = user?._id === id;

  const FollowUnfollow = async () => {
    if (isFollowing) {
      await unfollowUser(id);
    } else {
      await followUser(id);
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div
        onClick={() => {
          router.push(`/${username}`);
        }}
        className="flex items-center cursor-pointer"
      >
        <img
          className="rounded-full sm:w-10 sm:h-10 w-9 h-9  object-cover object-center"
          src={avatar}
          alt="profile-picture"
        />
        <div className="ml-3">
          <p className="font-bold sm:text-base text-sm">
            {name}
            <span className="text-gray-500 text-xs font-medium ml-1">
              @{username}
            </span>
          </p>

          <p className="text-sm">{title}</p>
        </div>
      </div>
      {isSameUser ? null : (
        <div className="flex items-center">
          <CustomButton
            onClick={() => {
              FollowUnfollow();
            }}
            cls={`rounded-full group font-medium h-10 text-sm w-24 transition duration-300 ${
              isFollowing
                ? "bg-dark/5  hover:text-red-500 hover:bg-red-100"
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
      )}
    </div>
  );
};

export default memo(FollowCard);
