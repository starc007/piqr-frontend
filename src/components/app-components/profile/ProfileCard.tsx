/* eslint-disable @next/next/no-img-element */
import {
  DribbleSVG,
  EditSVG,
  FuelerSVG,
  GithubSVG,
  InboxSVG,
  InstagramSVG,
  LinkTilted,
  LinkedinSVG,
  MediumSVG,
  TwitterSVG,
  YoutubeSVG,
  locationIcon,
} from "@assets/index";
import {
  Link,
  Button,
  Image,
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  Badge,
} from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { formatURL } from "@utils";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  setSendMessageModal: Dispatch<SetStateAction<boolean>>;
};

const Icons: Record<string, React.ReactElement> = {
  twitter: <TwitterSVG />,
  github: <GithubSVG />,
  linkedin: <LinkedinSVG className="text-gray-500 w-6" />,
  website: <LinkTilted className="w-6" />,
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

  const isLocationAvailable =
    userDetailsByUsername?.profile?.location?.city ||
    userDetailsByUsername?.profile?.location?.country;

  return (
    <div className="w-full">
      <div className="flex w-full bg-gray-100 sm:h-36 h-28" />
      <div className="flex justify-between md:px-6 px-4">
        <Image
          className="rounded-full sm:w-36 sm:h-36 w-28 h-28 sm:-mt-16 -mt-12 object-cover object-center"
          src={userDetailsByUsername?.profile?.avatar as string}
          alt="profile-picture"
        />

        <div className="mt-4">
          {user?._id !== userDetailsByUsername?.profile?._id ? (
            <div className="flex items-center gap-3">
              <Button
                variant="tertiary"
                data-tooltip-id="msg-tooltip"
                data-tooltip-content="Message"
                onClick={() =>
                  isLoggedIn ? setSendMessageModal(true) : router.push("/login")
                }
                cls={`border font-medium h-11 w-11 gap-2 hover:bg-gray-100`}
              >
                <InboxSVG className="w-5" />
              </Button>
              <Button
                onClick={() => {
                  isLoggedIn ? FollowUnfollow() : toast.error("Please login!");
                }}
                cls={`group font-medium h-11 text-sm transition duration-300 ${
                  isFollowing
                    ? "hover:text-red-500 hover:bg-red-100 w-28"
                    : "sm:w-28 w-24"
                }`}
                variant={isFollowing ? "default" : "primary"}
              >
                <span className={isFollowing ? "group-hover:hidden block" : ""}>
                  {isFollowing ? "Following" : "Follow"}
                </span>
                {isFollowing ? (
                  <span className="group-hover:block hidden">Unfollow</span>
                ) : null}
              </Button>
            </div>
          ) : (
            <Button
              variant="tertiaryOutline"
              data-tooltip-id="msg-tooltip"
              data-tooltip-content="Message"
              onClick={() => router.push("/user/profile")}
              cls={`h-10 px-4 font-medium text-sm gap-2 hover:bg-gray-100`}
            >
              <EditSVG className="w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col md:px-6 px-4">
        <p className="font-semibold text-2xl mt-4">
          {userDetailsByUsername?.profile?.name}{" "}
        </p>
        <div>
          <Badge
            text={userDetailsByUsername?.profile?.category?.[0] as string}
            cls="px-3 rounded-lg py-1 text-xs"
          />
        </div>

        <p className="text-dark mt-1">
          {userDetailsByUsername?.profile?.title}
        </p>

        <div className="flex items-center gap-5 mt-2">
          <p className="text-gray-500 text-sm">
            @{userDetailsByUsername?.profile?.username}
          </p>

          {isLocationAvailable ? (
            <div className="flex items-center gap-1.5 ">
              <Image src={locationIcon.src} alt="pin" className="w-3" />
              <p className="text-sm text-gray-500">
                {userDetailsByUsername?.profile?.location?.city} ,{" "}
                {userDetailsByUsername?.profile?.location?.country}
              </p>
            </div>
          ) : null}

          {socialLinks.length > 0 ? (
            <Dropdown>
              <DropdownButton cls="z-0 flex items-center text-sm text-gray-500">
                <LinkTilted className="w-5 mr-1" /> <span>Social</span>
              </DropdownButton>
              <DropdownContent cls="w-36 py-2 mt-4 z-10 top-3 !left-0 bg-white shadow-xl">
                {socialLinks.map((it) => {
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
                    <DropdownItem
                      key={it}
                      className="hover:bg-gray-100 w-full text-sm "
                    >
                      <Link
                        href={it as string}
                        target="_blank"
                        className="flex items-center capitalize"
                      >
                        {
                          Icons[
                            Object.keys(socials).find(
                              (key) => formatURL(socials[key]) === it
                            )!
                          ]
                        }

                        {/* name */}
                        <span className="ml-2">
                          {Object.keys(socials).find(
                            (key) => formatURL(socials[key]) === it
                          )}
                        </span>
                      </Link>
                    </DropdownItem>
                  );
                })}
              </DropdownContent>
            </Dropdown>
          ) : null}
        </div>

        <div className="flex items-center mt-3 gap-2 text-sm text-gray-500 font-medium">
          <Button
            disabled={!isLoggedIn}
            variant="tertiary"
            onClick={() =>
              router.replace(
                `/network/${userDetailsByUsername?.profile?._id}?type=following`
              )
            }
          >
            {followData.following?.length} following
          </Button>
          ·
          <Button
            variant="tertiary"
            disabled={!isLoggedIn}
            onClick={() =>
              router.replace(`/network/${userDetailsByUsername?.profile?._id}`)
            }
          >
            {followData.followers?.length} followers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
