import {
  DiscoverSVG,
  FeedSVG,
  GroupSVG,
  InboxSVG,
  JobSVG,
  NotificationSVG,
  logo,
} from "@assets/index";
import { useAppBoundStore } from "@store";
import React, { useMemo } from "react";
import { CustomButton, Image, Link } from "..";
import { useRouter } from "next/router";
import FloatingProfileProgress from "./FloatingProfileProgress";

const SideMenu = [
  {
    name: "Feed",
    icon: <FeedSVG />,
    path: "/feed?tab=new",
    slug: "/feed",
    id: 1,
    isPrivate: false,
  },
  {
    name: "Network",
    icon: <DiscoverSVG className="w-6" />,
    path: "/explore?type=all",
    slug: "/explore",
    id: 2,
    isPrivate: false,
  },

  {
    name: "Jobs",
    icon: <JobSVG />,
    path: "/jobs?type=all",
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
    icon: <InboxSVG />,
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
  const {
    user,
    isLoggedIn,
    workExp,
    activity,
    socialLinks,
    notifications,
    allNotifications,
    setProfilePercent,
  } = useAppBoundStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    workExp: state.workExp,
    activity: state.activity,
    socialLinks: state.socialLinks,
    notifications: state.notifications,
    setProfilePercent: state.setProfilePercent,
    allNotifications: state.allNotifications,
  }));

  const pathname = useRouter().pathname;

  const [dataTo, setDataTo] = React.useState(data);

  const progress = useMemo(() => {
    if (user) {
      const newData = data;
      if (user?.title) newData[0].checked = true;
      if (user?.bio) newData[1].checked = true;
      if (workExp?.length > 0) newData[3].checked = true;
      if (activity?.length >= 1) newData[2].checked = true;
      if (socialLinks && Object.keys(socialLinks!)?.length > 0)
        newData[4].checked = true;
      if (user?.skills?.length > 0) newData[5].checked = true;
      const pr = newData.filter((item) => item.checked).length * 16.66;
      setProfilePercent(Math.round(pr));
      setDataTo(newData);
      return pr;
    }
    return 0;
  }, [user, workExp.length, socialLinks, activity.length, setProfilePercent]);

  const unreadNotificationsCount = React.useMemo(() => {
    return allNotifications.reduce((acc, curr) => {
      if (!curr.read) {
        return (acc = acc + 1);
      }
      return acc;
    }, 0);
  }, [allNotifications]);

  return (
    <div className="flex flex-col justify-between w-full h-full mt-4">
      <div className="flex lg:flex-col flex-row justify-between lg:px-0  font-poppins w-full">
        <div className="lg:flex w-full hidden mt-2">
          <Link href={isLoggedIn ? "/feed?tab=new" : "/"}>
            <Image src={logo} className="w-2/3" alt="logo" />
          </Link>
        </div>
        <div className="lg:py-8 py-2 lg:space-y-4 flex lg:flex-col flex-row justify-between blur__effect lg:px-0 px-6  font-poppins w-full">
          {SideMenu.map((item) =>
            !isLoggedIn && item.isPrivate ? null : (
              <Link
                href={item.path}
                className={`flex items-center justify-between hover:bg-gray-200 lg:px-4 lg:py-3 px-2 py-2 rounded-full md:text-lg relative transition-all duration-300 ${
                  pathname === item.slug || pathname.includes(item.path)
                    ? "text-dark bg-gray-200 lg:bg-transparent"
                    : "text-gray-500 hover:text-dark"
                }`}
                key={item.id}
              >
                <div className="flex items-center gap-2 fill-primary">
                  {item.icon}
                  <span className="font-medium lg:block hidden">
                    {item.name}
                  </span>
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
                  <span className="bg-primary text-primary text-white w-5 h-5 flex justify-center items-center rounded-full text-xs font-semibold absolute top-1 left-7">
                    {unreadNotificationsCount}
                  </span>
                ) : null}
              </Link>
            )
          )}
        </div>
      </div>
      {isLoggedIn && progress < 90 && (
        <div className="w-full mt-7 py-4 lg:block hidden mb-5">
          <FloatingProfileProgress data={dataTo} progress={progress} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
