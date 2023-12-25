import { FC, useCallback, useEffect, useRef } from "react";

import { LayoutProps } from "./typings";
import Navbar from "@appComp/Navbar";
import { useAppBoundStore } from "@store";
import Sidebar from "@components/app-components/Sidebar";
import { useRouter } from "next/router";
import { useMediaQuery } from "src/utils/useMediaQuery";
import { SocketSDK } from "src/services/socketController";

const nameToShow = (name: string) => {
  if (name.includes("user/inbox")) return "Inbox";
  if (name.includes("feed")) return "Feed";
  if (name.includes("explore")) return "Explore";
  if (name.includes("jobs") || name.includes("jobs?*")) return "Jobs";
  if (name.includes("notifications")) return "Notifications";
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1006px)");

  const isShowHeader =
    router.pathname.includes("feed") || router.pathname.includes("explore");

  const initialLoad = useRef(true);

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

  const url = router.pathname;

  useEffect(() => {
    if (!isLoggedIn && loginLoading) checkSession();

    if (user?.firstTime) {
      router.push("/onboarding");
    }

    if (isLoggedIn && initialLoad.current) {
      initialLoad.current = false;
      if (isLoggedIn && url === "/") {
        router.push("/feed");
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

  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="w-full flex lg:h-screen overflow-hidden">
        <div className="lg:w-72 w-full lg:static fixed bottom-0 left-0 z-20 lg:border-r lg:px-4">
          <Sidebar />
        </div>
        <div className="w-full overflow-y-auto hide__scrollbar">
          {isMobile ? <Navbar subTitle={nameToShow(router.pathname)} /> : null}

          {/* {!isShowHeader ? (
            <Navbar subTitle={nameToShow(router.pathname)} />
          ) : null} */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
