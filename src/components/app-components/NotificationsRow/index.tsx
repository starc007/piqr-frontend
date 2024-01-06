/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Link, Image, Button } from "@components";
import { ArrowSVG, CommenetSVG, AvatarSVG, MedalSVG } from "@assets/index";
import { NOTIFICATION_TYPES } from "@utils";
import toast from "react-hot-toast";
import moment from "moment";
import { useAppBoundStore } from "@store/mainStore";

interface NotificationsRowProps {
  data: INotificationResponse;
}

const IconsTOoSHow = {
  [NOTIFICATION_TYPES.UPVOTE]: <ArrowSVG className="w-full text-gray-600" />,
  [NOTIFICATION_TYPES.UPVOTE_COMMENT]: (
    <ArrowSVG className="w-full text-gray-600" />
  ),
  [NOTIFICATION_TYPES.UPVOTE_REPLY]: (
    <ArrowSVG className="w-full text-gray-600" />
  ),
  [NOTIFICATION_TYPES.COMMENT]: (
    <CommenetSVG className="w-full text-gray-600" />
  ),
  [NOTIFICATION_TYPES.REPLY]: <CommenetSVG className="w-full text-gray-600" />,
  [NOTIFICATION_TYPES.FOLLOW]: <AvatarSVG className="w-full text-primary" />,
  [NOTIFICATION_TYPES.ENDORSE]: <MedalSVG className="w-full fill-primary" />,
};

const NotificationsRow: React.FC<NotificationsRowProps> = ({ data }) => {
  const [isFollowing, setIsFollowing] = React.useState<boolean>(
    data?.isFollowing || false
  );

  const { isLoggedIn, followUser, unfollowUser, markNotificationsAsRead } =
    useAppBoundStore((state) => ({
      isLoggedIn: state.isLoggedIn,
      followUser: state.followUser,
      unfollowUser: state.unfollowUser,
      markNotificationsAsRead: state.markNotificationsAsRead,
    }));

  const handleFollowCLick = (e: any) => {
    e.preventDefault();
    if (!isLoggedIn) return toast.error("Please login First!!");

    if (data?.postId) return toast.error("You can't follow a post");

    if (isFollowing) {
      unfollowUser(data?.sender[0]._id!).then(() => setIsFollowing(false));
    } else {
      followUser(data?.sender[0]?._id!).then(() => {
        setIsFollowing(true);
      });
    }
  };

  const handleNotificationClick = async (id: string | undefined) => {
    if (id && !data.read) {
      await markNotificationsAsRead(id);
    }
  };

  return (
    <Link
      href={
        data.type === NOTIFICATION_TYPES.FOLLOW
          ? `/${data?.sender[0]?.username}`
          : (data.link as string)
      }
      key={data._id}
      className={`flex items-center justify-between md:px-4 px-2 py-2.5 ${
        data.read ? "" : "bg-gray-50"
      }`}
      onClick={() => handleNotificationClick(data._id)}
    >
      <div className="ml-3 flex gap-4">
        <div className="w-5 mt-1">{IconsTOoSHow[data.type]}</div>
        <div className="flex flex-col">
          {data.type !== NOTIFICATION_TYPES.UPVOTE ? (
            <>
              <Image
                className="rounded-full border object-contain object-center w-8 h-8"
                src={data?.sender[0].avatar}
                alt={data?.sender[0].name}
              />
              <div className="">
                <p className="text-sm mt-2">
                  {data.content}.&nbsp;&nbsp;
                  <span className="text-xs pr-5 text-gray-500">
                    {moment(data.updatedAt).fromNow()}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                {data?.sender.slice(0, 4).map((it, i) => (
                  <Image
                    key={it._id}
                    className={`rounded-full border object-contain object-center bg-white w-8 h-8 ${
                      i !== 0 ? "-ml-2" : ""
                    }`}
                    src={it.avatar}
                    alt={it.name}
                  />
                ))}
              </div>

              {data?.sender.length > 1 ? (
                <div className="flex">
                  <p className="text-sm mt-2">
                    <span className="font-bold">{data?.sender[0].name}</span> &{" "}
                    {data?.senderCount} more people liked your post.&nbsp;&nbsp;
                    <span className="text-xs pr-5 text-gray-500">
                      {moment(data.updatedAt).fromNow()}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex">
                  <p className="text-sm mt-2 ">
                    <span className="font-semibold">
                      {data?.sender[0].name}
                    </span>{" "}
                    liked your post &nbsp;&nbsp;
                    <span className="text-xs pr-5 text-gray-500">
                      {moment(data.updatedAt).fromNow()}
                    </span>
                  </p>
                </div>
              )}
            </>
          )}
          <p
            className="text-xs mt-2 text-gray-500 whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: data?.data as string,
            }}
          />
        </div>
      </div>

      <div
        className={`flex gap-4 ${
          data.type === NOTIFICATION_TYPES.FOLLOW ? "self-start mt-0.25" : ""
        }`}
      >
        {data.type === NOTIFICATION_TYPES.FOLLOW && (
          <Button
            variant={isFollowing ? "default" : "secondary"}
            onClick={handleFollowCLick}
            cls={`h-8 group text-sm px-3 font-medium ${
              isFollowing ? "hover:text-red-500 hover:bg-red-100" : ""
            }  transition`}
          >
            <span className={isFollowing ? "group-hover:hidden block" : ""}>
              {isFollowing ? "Following" : "Follow Back"}
            </span>
            {isFollowing ? (
              <span className="group-hover:block hidden">Unfollow</span>
            ) : null}
          </Button>
        )}
      </div>
    </Link>
  );
};

export default NotificationsRow;
