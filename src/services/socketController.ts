import { useAppBoundStore } from "@store/mainStore";
import {
  API_ENDPOINT_DEV,
  API_ENDPOINT_PROD,
  CHAT_CONST,
  NOTIFICATION_TYPES,
} from "@utils";
import { Socket, io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "development" ? API_ENDPOINT_DEV : API_ENDPOINT_PROD;

export class SocketSDK {
  private static socket: Socket | null;

  static async init() {
    SocketSDK.socket = io(URL, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 100,
      reconnectionDelay: 2000,
    });

    SocketSDK.socket.emit(CHAT_CONST.SETUP);

    SocketSDK.socket.on(CHAT_CONST.CONNECTED, () => {
      console.log("*******socket connected*******");
    });
  }

  static isConnected = () => {
    return SocketSDK.socket?.connected === true && SocketSDK.socket !== null;
  };

  static getInstance = () => {
    return SocketSDK.socket;
  };

  static isInitialized() {
    return SocketSDK.socket != null;
  }

  static joinChat(chatId: string) {
    const checkConnected = SocketSDK.isConnected();

    if (checkConnected) {
      SocketSDK.socket?.emit(CHAT_CONST.USER_JOINED_CHAT, chatId);
      //   console.log(">>>join chat", chatId);
    } else {
      throw new Error("Socket not connected");
    }
  }

  static msgReceived(callback: (data: MessageListResponse) => void) {
    SocketSDK.socket?.on(CHAT_CONST.MESSAGE_RECIEVED, callback);
  }

  static leaveChat() {
    SocketSDK.socket?.off(CHAT_CONST.SETUP);
  }

  static leaveRoom(chatId: string) {
    SocketSDK.socket?.emit(CHAT_CONST.LEAVE_CHAT, chatId);
  }

  static sendNewNotification(notification: INotificationResponse) {
    SocketSDK.socket?.emit(CHAT_CONST.SEND_NOTIFICATION, notification);
  }

  static listenNotification() {
    SocketSDK.socket?.on(
      CHAT_CONST.NOTIFICATION_RECIEVED,
      (data: INotificationResponse) => {
        const allNoti = useAppBoundStore.getState().allNotifications;
        const isNoti = allNoti.find((noti) => noti._id === data._id);

        const setNotifications =
          useAppBoundStore.getState().fetchReceivedNotifications;

        if (data?.type === NOTIFICATION_TYPES.UPVOTE && !isNoti) {
          if (data?.isNew) {
            setNotifications([data, ...allNoti]);
          } else {
            const getPostNotification = allNoti.find(
              (noti) => noti.postId === data.postId
            );

            const isSenderPresent = getPostNotification?.sender?.find(
              (sender) => sender._id === data.sender[0]._id
            );

            if (!isSenderPresent) {
              getPostNotification!.sender = [
                data.sender[0],
                ...getPostNotification?.sender!,
              ];
              getPostNotification!.read = false;

              const filterNotifications = allNoti.filter(
                (noti) => noti.postId !== data.postId
              );

              setNotifications([
                getPostNotification as INotificationResponse,
                ...filterNotifications,
              ]);
            }
          }
        }

        if (!isNoti && data?.type !== NOTIFICATION_TYPES.UPVOTE) {
          const setNotifications =
            useAppBoundStore.getState().fetchReceivedNotifications;

          setNotifications([data, ...allNoti]);

          const senderId = data.sender[0]._id;
          const type = data.type;

          const isPresent = allNoti.find(
            (noti) => noti.sender[0]._id === senderId && noti.type === type
          );

          if (isPresent) {
            const filteredNoti = allNoti.filter(
              (noti) => noti.sender[0]?._id !== senderId && noti.type !== type
            );
            setNotifications([data, ...filteredNoti]);
          } else {
            setNotifications([data, ...allNoti]);
          }
        }
      }
    );
  }

  static listenNewMessage(cb: (data: MessageListResponse) => void) {
    SocketSDK.socket?.on(
      CHAT_CONST.MESSAGE_RECIEVED,
      (data: MessageListResponse) => {
        cb(data);
      }
    );
  }

  static disposeSDK() {
    if (SocketSDK.socket !== null) {
      SocketSDK.socket?.close();
      SocketSDK.socket = null;
    }
  }
}
