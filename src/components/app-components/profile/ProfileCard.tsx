/* eslint-disable @next/next/no-img-element */
import {
  DribbleSVG,
  FuelerSVG,
  GithubSVG,
  GlobeSVG,
  InstagramSVG,
  LinkedinSVG,
  MediumSVG,
  MessageSVG,
  TwitterSVG,
  YoutubeSVG,
  locationIcon,
  pinIcon,
} from "@assets/index";
import { CustomButton, Link, CustomTooltip } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { formatURL } from "@utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type Props = {
  setSendMessageModal: Dispatch<SetStateAction<boolean>>;
};

const socialCls =
  "h-11 w-11 flex justify-center items-center border hover:bg-gray-50 duration-200 ease-out rounded-full cursor-pointer";

const Icons: Record<string, React.ReactElement> = {
  twitter: <TwitterSVG />,
  github: <GithubSVG />,
  linkedin: <LinkedinSVG className="text-gray-500 w-6" />,
  website: <GlobeSVG />,
  medium: <MediumSVG className="w-6 text-gray-500" />,
  youtube: <YoutubeSVG />,
  instagram: <InstagramSVG />,
  dribble: <DribbleSVG className="w-6 text-gray-500" />,
  fueler: <FuelerSVG className="w-6" />,
};

const ProfileCard = ({ setSendMessageModal }: Props) => {
  const router = useRouter();
  const [followData, setFollowData] = useState<{
    followers: string[] | [];
    following: string[] | [];
  }>({
    followers: [],
    following: [],
  });

  const { userDetailsByUsername, user, isLoggedIn, followUser, unfollowUser } =
    useAppBoundStore((state) => ({
      userDetailsByUsername: state.userDetailsByUsername,
      user: state.user,
      isLoggedIn: state.isLoggedIn,
      followUser: state.followUser,
      unfollowUser: state.unfollowUser,
    }));

  const isFollowersEmpty = userDetailsByUsername?.followers
    ? Object.keys(userDetailsByUsername?.followers!).length === 0
    : true;

  const isFollowing = followData?.followers?.includes(user?._id! as never);

  useEffect(() => {
    if (!isFollowersEmpty) {
      setFollowData({
        followers: userDetailsByUsername?.followers?.followers!,
        following: userDetailsByUsername?.followers?.following!,
      });
    }
  }, [isFollowersEmpty, userDetailsByUsername]);

  const FollowUnfollow = async () => {
    if (isFollowing) {
      const index = followData?.followers?.indexOf(user?._id! as never);
      setFollowData((prev) => ({
        ...prev,
        followers: [
          ...prev.followers.slice(0, index!),
          ...prev.followers.slice(index! + 1),
        ],
      }));
      await unfollowUser(userDetailsByUsername?.profile?._id!);
    } else {
      setFollowData((prev) => ({
        ...prev,
        followers: [...prev.followers, user?._id!],
      }));
      await followUser(userDetailsByUsername?.profile?._id!);
    }
  };

  const socials: any = userDetailsByUsername?.socials || {};
  const socialLinks = userDetailsByUsername?.socials
    ? Object.keys(userDetailsByUsername?.socials)
        .map((it) => {
          if (socials[it]?.length > 0) {
            return formatURL(socials[it]);
          }
        })
        .filter((it) => it)
    : [];

  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3 sm:border  border-gray-200 lg:w-80 w-full h-min md:sticky md:top-20">
      <CustomTooltip id="msg-tooltip" />
      {/* Profile Picture */}
      <div className="flex justify-center">
        <img
          className="rounded-full sm:w-40 sm:h-40 w-28 h-28  object-cover object-center"
          src={userDetailsByUsername?.profile?.avatar}
          alt="profile-picture"
        />
      </div>
      <div>
        <p className="text-center gap-1 z-20 font-bold text-lg">
          {userDetailsByUsername?.profile?.name}{" "}
          {/* {userDetailsByUsername?.profile?.isVerified && (
            // <Image src={VerifiedSVG} alt="Verified" width={18} height={18} />
            <VerifiedSVG />
          )} */}
        </p>
        <p className="text-gray-500 text-center mt-1">
          @{userDetailsByUsername?.profile?.username}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-800 font-medium">
          <CustomButton
            onClick={() =>
              router.replace(
                `/network/${userDetailsByUsername?.profile?._id}?type=following`
              )
            }
          >
            {followData.following?.length} following
          </CustomButton>
          ·
          <CustomButton
            onClick={() =>
              router.replace(`/network/${userDetailsByUsername?.profile?._id}`)
            }
          >
            {followData.followers?.length} followers
          </CustomButton>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex items-center gap-2 w-full">
        <Image src={pinIcon} alt="pin" width={18} height={18} />
        <p className="text-sm w-11/12">
          {userDetailsByUsername?.profile?.title}
        </p>
      </div>
      {userDetailsByUsername?.profile?.location?.city ? (
        <p className="flex items-center gap-2 text-gray-600 font-medium text-sm">
          <Image src={locationIcon} alt="location" width={18} height={18} />{" "}
          {userDetailsByUsername?.profile?.location?.city} ,{" "}
          {userDetailsByUsername?.profile?.location?.country}
        </p>
      ) : null}
      {user?._id !== userDetailsByUsername?.profile?._id ? (
        <div className="border-t pt-4 mt-2 w-full flex justify-center items-center gap-5">
          <CustomButton
            data-tooltip-id="msg-tooltip"
            data-tooltip-content="Message"
            onClick={() =>
              isLoggedIn ? setSendMessageModal(true) : router.push("/login")
            }
            cls={`border font-medium rounded-full h-11 w-11 gap-2 hover:bg-gray-100`}
          >
            <MessageSVG className="w-5" />
          </CustomButton>
          <CustomButton
            onClick={() => {
              isLoggedIn ? FollowUnfollow() : toast.error("Please login!");
            }}
            cls={`rounded-full group font-medium h-11 text-sm w-40 transition duration-300 ${
              isFollowing
                ? "bg-dark/10  hover:text-red-500 hover:bg-red-100"
                : "bg-dark  text-white hover:bg-dark/80"
            }`}
            variant="default"
          >
            <span className={isFollowing ? "group-hover:hidden block" : ""}>
              {isFollowing ? "Following" : "+ Follow"}
            </span>
            {isFollowing ? (
              <span className="group-hover:block hidden">Unfollow</span>
            ) : null}
          </CustomButton>
        </div>
      ) : null}
      <hr className="my-2" />
      {/* Social Media Icons */}
      <div className="flex flex-wrap gap-2">
        {socialLinks.length > 0
          ? socialLinks.map((it) => {
              // if key is not present in Icons object then return null
              if (
                !Object.keys(Icons).includes(
                  Object.keys(socials).find(
                    (key) => formatURL(socials[key]) === it
                  )!
                )
              ) {
                return null;
              }

              return (
                <Link
                  key={it}
                  href={it as string}
                  target="_blank"
                  className={socialCls}
                >
                  {
                    Icons[
                      Object.keys(socials).find(
                        (key) => formatURL(socials[key]) === it
                      )!
                    ]
                  }
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ProfileCard;
