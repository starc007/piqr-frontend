/* eslint-disable @next/next/no-img-element */
import { Link, Button, Image } from "@components";
import { useAppBoundStore } from "@store";
import { useRef } from "react";
import { useRouter } from "next/router";
import useAnalyticsEventTracker from "@hooks/useAnalyticsEventTracker";

import { useMediaQuery } from "src/utils/useMediaQuery";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({
  isHero = false,
  subTitle,
}: {
  isHero?: boolean;
  subTitle?: string;
}) => {
  const initialLoad = useRef(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    isLoggedIn,
    user,
    checkSession,
    loginLoading,
    getMessageList,
    getUser,
    notifications,
    setUserMessages,
    setMessageList,
    setNotifications,
    messageList,
    selectedChat,
    updateReadBy,
    isUserDetailsFetched,
    setIsUserDetailsFetched,
    getFollowersFollowingIds,
    fetchNotifications,
    setNotificationsLoading,
  } = useAppBoundStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    checkSession: state.checkSession,
    loginLoading: state.loginLoading,
    getMessageList: state.getMessageList,
    getUser: state.getUser,
    notifications: state.notifications,
    setUserMessages: state.setUserMessages,
    setMessageList: state.setMessageList,
    setNotifications: state.setNotifications,
    messageList: state.messageList,
    selectedChat: state.selectedChat,
    updateReadBy: state.updateReadBy,
    isUserDetailsFetched: state.isUserDetailsFetched,
    setIsUserDetailsFetched: state.setIsUserDetailsFetched,
    getFollowersFollowingIds: state.getFollowersFollowingIds,
    fetchNotifications: state.fetchNotifications,
    setNotificationsLoading: state.setNotificationsLoading,
  }));

  const router = useRouter();

  const pathname = router.pathname;

  const gaEvents = useAnalyticsEventTracker("Navbar");

  return (
    <nav
      className={`flex w-full items-center justify-between z-20 border-b border-r sticky top-0 h-16 blur__effect mx-auto px-2 py-3 ${
        isHero ? "container w-full" : "rounded-none"
      } ${pathname === "/" ? "mt-3" : "mt-0 "}
      `}
    >
      <div className="flex items-center gap-3">
        <Link
          href={isLoggedIn ? "/feed" : "/"}
          className="text-xl font-semibold lg:px-5 px-2"
        >
          {/* <Image src={logo} className="w-24" alt="logo" /> */}
          Piqr
        </Link>
      </div>

      <div className="flex items-center sm:space-x-5 space-x-4 font-poppins">
        {isLoggedIn && user ? (
          <>
            {subTitle === "Jobs" ? (
              <Button
                variant="primary"
                cls="sm:h-10 h-9 sm:px-4 px-3 sm:text-sm text-xs font-medium"
                onClick={() => router.push("/jobs/create")}
              >
                Post a Job
              </Button>
            ) : null}
            <ProfileDropdown
              extraCls="w-40 py-2 mt-4 z-10 top-6 bg-white shadow-xl"
              btnChildren={
                <Image
                  className="rounded-full border w-7 h-7 object-cover object-center"
                  src={user?.avatar}
                  alt=""
                />
              }
            />
          </>
        ) : (
          <Button
            variant="secondary"
            cls="w-20 md:h-10 h-9 font-medium"
            onClick={() => {
              router.push("/login");
              gaEvents("login_cta", "click_login");
            }}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
