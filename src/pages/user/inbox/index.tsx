/* eslint-disable @next/next/no-img-element */
import {
  Link,
  Input,
  Button,
  PrivateLayout,
  Loader,
  TextArea,
  Image,
} from "@components";
import ChatBox from "@components/app-components/ChatBox";
import useAnalyticsEventTracker from "@hooks/useAnalyticsEventTracker";
import { useAppBoundStore } from "@store";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";

import { CHAT_CONST } from "@utils";
import { ArrowSVG } from "@assets/index";
import { SocketSDK } from "src/services/socketController";
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";

// const ENDPOINT = "http://localhost:6969";
// var socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const InboxPage = () => {
  const {
    messageList,
    user,
    getUserMessages,
    sendMessage,
    setMessageList,
    // setUserMessages,
    notifications,
    setNotifications,
    setSelectedChat,
    selectedChat,
  } = useAppBoundStore((state) => ({
    messageList: state.messageList,
    user: state.user,
    getUserMessages: state.getUserMessages,
    sendMessage: state.sendMessage,
    setMessageList: state.setMessageList,
    // setUserMessages: state.setUserMessages,
    notifications: state.notifications,
    setNotifications: state.setNotifications,
    setSelectedChat: state.setSelectedChat,
    selectedChat: state.selectedChat,
  }));
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dataToRender, setDataToRender] = useState<MessageListResponse[] | []>(
    []
  );

  const chatRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(chatRef.current, message);

  const handleSelectChat = (id: string, profile: ProfileResponse) => {
    if (id === selectedChat?.id) return;
    // if (id !== selectedChat?.id) {
    //   socket.emit(CHAT_CONST.user_disconnected, selectedChat?.id);
    // }
    setSelectedChat({ id, profile });
    setLoading(true);
    getUserMessages(id).then((res) => {
      setLoading(false);
      const newList = messageList?.map((item) => {
        if (item.messageDataId.toString() === id.toString()) {
          return {
            ...item,
            readBy: user?._id!,
          };
        }
        return item;
      });

      SocketSDK.joinChat(id);
      const filteredList = notifications?.filter((item) => {
        if (item?.messageDataId !== id) {
          return item;
        }
      });

      if (notifications?.length === 0 && filteredList?.length === 0) return;

      setMessageList(newList);
      setNotifications(filteredList);
    });
  };

  const gaEvents = useAnalyticsEventTracker("Inbox");

  const handleSubmit = () => {
    // socketConn?.emit(CHAT_CONST.stop_typing, selectedChat?.id);
    if (message.trim().length === 0) return;
    const obj = {
      message: message,
      uid: selectedChat?.profile?._id! as string,
    };
    if (selectedChat?.id) {
      gaEvents("send_message", "send_msg");
      setSending(true);
      sendMessage(obj).then((res) => {
        setSending(false);
        setMessage("");
        let newList = messageList?.find((item) => {
          if (item?.messageDataId === selectedChat?.id) {
            return item;
          }
        });
        newList = {
          ...newList!,
          updatedAt: Date.now(),
          sender: user?._id!,
        };

        const filteredList = messageList?.filter((item) => {
          if (item?.messageDataId !== selectedChat?.id) {
            return item;
          }
        });
        setMessageList([newList!, ...filteredList!]);
        // setMessageList(newList);
      });
    }
  };

  useEffect(() => {
    if (selectedTab === 0) {
      const filteredMessageList = messageList?.filter(
        (item) => item?.isJobProposal === false || !item?.isJobProposal
      );
      setDataToRender(filteredMessageList);
    }
    if (selectedTab === 1) {
      const filteredMessageList = messageList?.filter(
        (item) => item.isJobProposal === true
      );
      setDataToRender(filteredMessageList);
    }
  }, [messageList, selectedTab]);

  const filteredNotifications = notifications?.filter(
    (item) => item.isJobProposal === true
  );
  // lg:h-[calc(100vh-4rem)] h-[calc(100vh-6rem)]

  return (
    <PrivateLayout title="Inbox">
      <div className="py-3 w-full h-screen border-r divide-x flex lg:flex-row flex-col">
        <div
          className={`lg:flex flex-col lg:w-1/3 overflow-y-auto ${
            selectedChat?.id != null ? "hidden" : "flex"
          }`}
        >
          {/* <div className="border-b p-4 font-bold text-xl">Inbox</div> */}
          <div className="flex w-full px-4 border-b py-2">
            {["General", "Proposal"].map((item, i) => (
              <button
                key={i}
                className={`w-1/2 h-11 font-medium transition-all duration-300 ${
                  selectedTab === i ? "bg-gray-100 rounded-xl" : "text-gray-500"
                }`}
                onClick={() => {
                  setSelectedTab(i);
                }}
              >
                <p className="relative">
                  {item}
                  {i === 1 && notifications?.length > 0 && (
                    <span className="rounded-full w-4 h-4 flex justify-center items-center text-xs font-semibold absolute -top-2 right-6 bg-dark text-white">
                      {filteredNotifications?.length}
                    </span>
                  )}
                </p>
              </button>
            ))}
          </div>
          {dataToRender?.length === 0 && !loader && (
            <span className="text-center mt-8 text-sm">No {"one's"} here</span>
          )}
          {loader && (
            <div className="p-5">
              <Loader loaderType="bars" />
            </div>
          )}
          <div className="overflow-y-auto w-full h-max hide__scrollbar pb-14">
            {!loader &&
              dataToRender?.map((item) => {
                const isNewMessage = notifications?.find((i) => {
                  return i?.messageDataId === item?.messageDataId;
                });

                return (
                  <button
                    key={item.messageDataId}
                    onClick={() => {
                      const pf =
                        item?.profile1?._id === user?._id
                          ? item?.profile2
                          : item?.profile1;
                      handleSelectChat(item.messageDataId, pf!);
                    }}
                    className={`px-4 py-3 border-b flex items-center justify-between duration-200 ease-out cursor-pointer w-full ${
                      isNewMessage ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          item?.profile1?._id === user?._id
                            ? item?.profile2?.avatar
                            : item?.profile1?.avatar
                        }
                        alt={
                          item?.profile1?._id === user?._id
                            ? item?.profile2?.name
                            : item?.profile1?.name
                        }
                        className="rounded-full border w-10 h-10 bg-gray-200 object-center object-cover"
                      />
                      <div className="font-medium text-left text-gray-600 ">
                        <div className="truncate text-sm font-medium">
                          {item?.profile1?._id === user?._id
                            ? item?.profile2?.name
                            : item?.profile1?.name}
                        </div>
                        <div className="text-xs whitespace-pre text-gray-400">
                          {moment(item?.updatedAt).calendar()}
                        </div>
                      </div>
                    </div>
                    {!isNewMessage ? null : (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    )}
                  </button>
                );
              })}
          </div>
        </div>
        {/* Main */}
        <div
          className={`lg:w-2/3 relative lg:block ${
            selectedChat?.id != null ? "block" : "hidden"
          }`}
        >
          {selectedChat?.id != null ? (
            <div className="lg:mt-0 mt-4">
              <button
                onClick={() => {
                  setSelectedChat(null);
                  // SocketSDK.leaveRoom(selectedChat?.id!);
                }}
                className="font-medium text-sm px-4 text-primary flex items-center gap-1 lg:hidden"
              >
                <ArrowSVG className="-rotate-90 w-5" /> go back
              </button>
              <div className="text-lg flex items-center justify-between w-full font-semibold bg-white z-20 px-6 py-4 border-b">
                <p>{selectedChat?.profile?.name}</p>
                <Link
                  href={"/" + selectedChat?.profile?.username}
                  className="text-gray-500 hover:text-primary"
                >
                  @
                  <span className="underline underline-offset-4 ">
                    {`${selectedChat?.profile?.username}`}
                  </span>
                </Link>
              </div>
              {loading ? (
                <div className="p-5">
                  <Loader loaderType="bars" />
                </div>
              ) : (
                <>
                  <ChatBox userId={selectedChat?.profile?.user!} />
                  <div className="pt-3 lg:px-4 lg:py-4 px-2 py-1 lg:absolute border-t bottom-10 lg:bottom-0 flex w-full bg-white">
                    <div className="flex gap-2 w-full">
                      <TextArea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        cls="px-4 resize-none border-none w-full bg-gray-100 rounded-full"
                        placeholder="Write a message ..."
                        rows={1}
                        ref={chatRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                      />
                      <Button
                        onClick={handleSubmit}
                        variant="primary"
                        disabled={message === "" || !message || sending}
                        cls="lg:px-6 px-4 h-10 bg-primary text-white lg:text-sm text-xs rounded-full"
                        isLoading={sending}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 font-semibold text-xl">
              Please select a chat to see messages
            </div>
          )}
        </div>
      </div>
    </PrivateLayout>
  );
};

export default InboxPage;
