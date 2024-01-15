import {
  DiscoverSVG,
  FeedSVG,
  InboxSVG,
  JobSVG,
  NotificationSVG,
} from "@assets/index";
import { useAppBoundStore } from "@store";
import React, { useEffect, useState } from "react";
import { Link } from "..";
import { useRouter } from "next/router";
// import FloatingProfileProgress from "./FloatingProfileProgress";

const SideMenu = [
  {
    name: "Feed",
    icon: <FeedSVG className="w-6" />,
    path: "/feed",
    slug: "/feed",
    id: 1,
    isPrivate: false,
  },
  {
    name: "Network",
    icon: <DiscoverSVG className="w-7" />,
    path: "/explore?type=all",
    slug: "/explore",
    id: 2,
    isPrivate: false,
  },

  {
    name: "Jobs",
    icon: <JobSVG className="w-6" />,
    path: "/jobs?type=full-time",
    slug: "/jobs",
    id: 4,
    isPrivate: false,
  },
  {
    name: "Notifications",
    icon: <NotificationSVG className="w-6" />,
    path: "/notifications",
    slug: "/notifications",
    id: 3,
    isPrivate: true,
  },
  {
    name: "Inbox",
    icon: <InboxSVG className="w-6" />,
    path: "/user/inbox",
    slug: "user/inbox",
    id: 5,
    isPrivate: true,
  },
];

const data = [
  {
    id: 0,
    title: "Add Title",
    checked: false,
    url: "/user/profile",
  },
  {
    id: 1,
    title: "Add Bio",
    checked: false,
    url: "/user/profile",
  },
  {
    id: 2,
    title: "Add 3 Projects",
    checked: false,
    url: "/user/profile",
  },
  {
    id: 3,
    title: "Add Work Exp",
    checked: false,
    url: "/user/profile",
  },

  {
    id: 4,
    title: "Add Socials",
    checked: false,
    url: "/user/profile",
  },
  {
    id: 5,
    title: "Add Skills",
    checked: false,
    url: "/user/profile",
  },
];

const Sidebar = () => {
  // const [newPostModal, setNewPostModal] = useState(false);

  const {
    user,
    isLoggedIn,
    workExp,
    activity,
    socialLinks,
    notifications,
    allNotifications,
  } = useAppBoundStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    workExp: state.workExp,
    activity: state.activity,
    socialLinks: state.socialLinks,
    notifications: state.notifications,
    allNotifications: state.allNotifications,
  }));

  const router = useRouter();
  const pathname = router.pathname;

  const [dataTo, setDataTo] = React.useState(data);

  // const progress = useMemo(() => {
  //   if (user) {
  //     const newData = data;
  //     if (user?.title) newData[0].checked = true;
  //     if (user?.bio) newData[1].checked = true;
  //     if (workExp?.length > 0) newData[3].checked = true;
  //     if (activity?.length >= 1) newData[2].checked = true;
  //     if (socialLinks && Object.keys(socialLinks!)?.length > 0)
  //       newData[4].checked = true;
  //     if (user?.skills?.length > 0) newData[5].checked = true;
  //     const pr = newData.filter((item) => item.checked).length * 16.66;
  //     setProfilePercent(Math.round(pr));
  //     setDataTo(newData);
  //     return pr;
  //   }
  //   return 0;
  // }, [user, workExp.length, socialLinks, activity.length, setProfilePercent]);

  const unreadNotificationsCount = React.useMemo(() => {
    return allNotifications.reduce((acc, curr) => {
      if (!curr.read) {
        return (acc = acc + 1);
      }
      return acc;
    }, 0);
  }, [allNotifications]);

  return (
    <div className="flex flex-row justify-between px-6 w-full h-12 my-1 md:my-2">
      {SideMenu.map((item) =>
        !isLoggedIn && item.isPrivate ? null : (
          <Link
            href={item.path}
            className={`flex items-center justify-center hover:bg-dark/5 rounded-full h-11 w-11 relative transition-all duration-300 ${
              pathname === item.slug || pathname.includes(item.path)
                ? "text-dark bg-dark/5"
                : "text-dark hover:text-dark/80"
            }`}
            key={item.id}
          >
            <div className="flex items-center gap-2 fill-primary">
              {item.icon}
            </div>
            {item.id === 5 && notifications?.length > 0 ? (
              <span
                className={`rounded-full w-5 h-5 flex justify-center items-center text-xs font-semibold md:relative absolute  md:top-0 -top-1 md:-right-1 -right-2 ${
                  pathname === item.path || pathname.includes(item.path)
                    ? "bg-dark text-white"
                    : "bg-primary text-white"
                }`}
              >
                {notifications?.length}
              </span>
            ) : null}
            {item.id === 3 && unreadNotificationsCount > 0 ? (
              <span className="bg-primary text-white  w-5 h-5 flex justify-center items-center rounded-full text-xs font-semibold absolute top-1 left-7">
                {unreadNotificationsCount}
              </span>
            ) : null}
          </Link>
        )
      )}
    </div>
  );
};

export default Sidebar;
