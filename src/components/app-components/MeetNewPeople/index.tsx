import React from "react";
import { useAppBoundStore } from "@store/mainStore";

import RecommedPeople from "@components/app-components/campfire/RecommedPeople";

const MeetNewPeople = () => {
  const firstTime = React.useRef(true);

  const {
    dailyNewUsers = [],
    user,
    getNewUserDailyToMeet,
  } = useAppBoundStore((state) => ({
    dailyNewUsers: state.dailyNewUsers,
    user: state.user,
    getNewUserDailyToMeet: state.getNewUserDailyToMeet,
  }));

  React.useEffect(() => {
    if (firstTime.current) {
      getNewUserDailyToMeet().then(() => {
        firstTime.current = false;
      });
    }
  }, [getNewUserDailyToMeet]);

  const userId = user?._id;

  return (
    <div className="sticky top-20 lg:block hidden w-1/2 h-min rounded-xl bg-secondGray/60 px-2 py-1">
      <p className="p-3 font-medium">People to Connect ✨</p>
      <div className="flex flex-col  ">
        {(dailyNewUsers || []).length > 0 &&
          dailyNewUsers
            ?.filter((us) => us._id !== userId)
            ?.slice(0, 4)
            .map((user) => <RecommedPeople key={user._id} {...user} />)}
      </div>
    </div>
  );
};

export default MeetNewPeople;
