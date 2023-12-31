import React, { useState } from "react";
import { PrivateLayout, Loader, Button } from "@components";
import MeetNewPeople from "@components/app-components/MeetNewPeople";
import { __getNotifications } from "@api/api";
import { useAppBoundStore } from "@store/mainStore";

import NotificationsRow from "@components/app-components/NotificationsRow";

const cmnCls =
  "w-20 flex justify-center items-center h-8 text-sm font-medium rounded-full transition-all duration-300";

const Notifications: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    allNotifications,
    notificationsLoading,
    notificationsPageSize,
    fetchNotifications,
  } = useAppBoundStore((state) => ({
    allNotifications: state.allNotifications,
    notificationsLoading: state.notificationsLoading,
    notificationsPageSize: state.notificationsPageSize,
    fetchNotifications: state.fetchNotifications,
  }));

  const fetchNextNotifications = (pageNo: number) => {
    setPage((prev) => prev + 1);
    setLoading(true);
    fetchNotifications(pageNo).then(() => {
      setLoading(false);
    });
  };

  return (
    <PrivateLayout title="Notifications">
      <div className="w-full flex gap-5">
        <div className="lg:w-3/4 w-full border-r min-h-screen">
          <div className="w-full border-b p-2.5 pl-7">
            <p className={`bg-primary text-white ${cmnCls}`}>All</p>
          </div>
          <div className="divide-y">
            {allNotifications.length > 0 &&
              allNotifications.map((item) => (
                <NotificationsRow
                  data={item as INotificationResponse}
                  key={item._id}
                />
              ))}

            {allNotifications.length === 0 &&
              (!loading || !notificationsLoading) && (
                <div className="flex justify-center items-center flex-col text-sm mt-20 w-full">
                  <p>No notifications found.</p>
                </div>
              )}
          </div>
          {(!loading || !notificationsLoading) && (
            <div className="flex justify-center mb-20 lg:mb-10 mt-6">
              {notificationsPageSize > page + 1 ? (
                <Button
                  isLoading={false}
                  loaderColor="text-primary"
                  disabled={notificationsLoading}
                  cls="w-28 text-sm h-10 font-semibold"
                  onClick={() => {
                    fetchNextNotifications(page + 1);
                  }}
                >
                  Load More
                </Button>
              ) : null}
            </div>
          )}
          {(loading || notificationsLoading) && (
            <div className="mt-10 flex justify-center">
              <Loader col="text-gray-800" />
            </div>
          )}
        </div>
        <MeetNewPeople />
      </div>
    </PrivateLayout>
  );
};

export default Notifications;
