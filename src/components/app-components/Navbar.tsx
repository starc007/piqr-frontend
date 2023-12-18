/* eslint-disable @next/next/no-img-element */
import {
  Link,
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  Button,
  Image,
  CustomButton,
} from "@components";
import { useAppBoundStore } from "@store";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useAnalyticsEventTracker from "@hooks/useAnalyticsEventTracker";

import { SocketSDK } from "src/services/socketController";
import { useMediaQuery } from "src/utils/useMediaQuery";
import { logo } from "@assets/index";

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
    logout,
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
    logout: state.logout,
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

  const url = router.pathname;

  useEffect(() => {
    if (!isLoggedIn && loginLoading) checkSession();

    if (user?.firstTime) {
      router.push("/onboarding");
    }

    if (isLoggedIn && initialLoad.current) {
      initialLoad.current = false;
      if (isLoggedIn && url === "/") {
        router.push("/feed?tab=new");
      }

      if (!isUserDetailsFetched) {
        setNotificationsLoading(true);
        Promise.all([
          getUser(),
          getMessageList(),
          getFollowersFollowingIds(),
          fetchNotifications(0),
        ])
          .then(() => {
            setIsUserDetailsFetched(true);
            setNotificationsLoading(false);
          })
          .catch(() => {
            setNotificationsLoading(false);
          });
      }
    }

    // if (url !== "/user/inbox" && selectedChat !== null) {
    //   setSelectedChat(null);
    // }
  }, [isLoggedIn, loginLoading, user, url]);

  const isSocketConnected = SocketSDK.isConnected();

  useEffect(() => {
    if (user && !isSocketConnected) {
      const renderSocket = async () => {
        await SocketSDK.init();
      };
      renderSocket();
    }
  }, [user, isSocketConnected]);

  const recieveResponse = useCallback(
    (data: MessageListResponse) => {
      if (selectedChat?.id === data.messageDataId) {
        let fileteredList = messageList?.filter((item) => {
          if (item?.messageDataId !== data.messageDataId) {
            return item;
          }
        });
        setMessageList([data, ...fileteredList!]);
        setUserMessages(data?.msgResp!);
        if (data?.readBy?.toString() !== user?._id?.toString()) {
          updateReadBy(data?.messageDataId!).then(() => {});
        }
      } else {
        const isAlreadyNotified = notifications?.find((item) => {
          if (item?._id === data._id) {
            return item;
          }
        });
        if (!isAlreadyNotified) {
          const newData = [data, ...notifications!];
          setNotifications(newData);
        }
      }
    },
    [selectedChat]
  );

  useEffect(() => {
    if (isSocketConnected) {
      SocketSDK.listenNotification();
      SocketSDK.listenNewMessage(recieveResponse);
    }
  }, [isSocketConnected, recieveResponse]);

  const pathname = router.pathname;

  const gaEvents = useAnalyticsEventTracker("Navbar");

  return (
    <nav
      className={`flex w-full items-center justify-between z-20 sticky top-0 h-16 blur__effect mx-auto px-2 ${
        isHero ? "container rounded-full w-full" : "rounded-none"
      } ${pathname === "/" ? "mt-3" : "mt-0 border-b border-r"}
      `}
    >
      <div className="flex items-center gap-3">
        {isHero ? (
          <Link
            href={isLoggedIn ? "/feed?tab=new" : "/"}
            className="sm:text-2xl text-xl font-bold"
          >
            {/* <Image src={logo} className="w-2/3" alt="logo" /> */}
            Piqr
          </Link>
        ) : !isMobile ? (
          <p className="text-xl font-semibold px-5">{subTitle}</p>
        ) : (
          <Link
            href={isLoggedIn ? "/feed?tab=new" : "/"}
            className="text-xl font-semibold lg:px-5 px-2"
          >
            {/* <Image src={logo} className="w-24" alt="logo" /> */}
            Piqr
          </Link>
        )}
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
            <Dropdown>
              <DropdownButton>
                <img
                  className="rounded-full border w-7 h-7 object-cover object-center"
                  src={user?.avatar}
                  alt=""
                />
              </DropdownButton>
              <DropdownContent cls="w-40 py-2">
                <DropdownItem
                  className="hover:bg-gray-100 w-full"
                  onClick={() => router.push("/user/profile")}
                >
                  <span className="text-sm">Edit Profile</span>
                </DropdownItem>
                <DropdownItem
                  className="hover:bg-gray-100"
                  onClick={() => router.push(`/${user?.username}`)}
                >
                  <span className="text-sm">View Profile</span>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    onClick={() => {
                      logout().then(() => router.push("/login"));
                      gaEvents("logout_cta", "click_logout");
                    }}
                    cls="w-full text-sm h-9"
                    variant="primary"
                  >
                    Logout
                  </Button>
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </>
        ) : (
          <CustomButton
            variant="secondary"
            cls="md:w-24 w-20 md:h-10 h-8 font-semibold"
            onClick={() => {
              router.push("/login");
              gaEvents("login_cta", "click_login");
            }}
          >
            Login
          </CustomButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
