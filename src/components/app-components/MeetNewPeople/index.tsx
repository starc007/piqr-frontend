import React from "react";
import { Link } from "@components";

import { useMediaQuery } from "src/utils/useMediaQuery";
import { useAppBoundStore } from "@store/mainStore";

import Navbar from "@components/app-components/Navbar";
import RecommedPeople from "@components/app-components/campfire/RecommedPeople";

interface MeetNewPeopleProps {
  showNavbar: boolean;
}

const MeetNewPeople: React.FC<MeetNewPeopleProps> = ({ showNavbar = true }) => {
  const isMobile = useMediaQuery("(max-width: 1006px)");

  const firstTime = React.useRef(true);

  const {
    isLoggedIn,
    dailyNewUsers = [],
    user,
    getNewUserDailyToMeet,
  } = useAppBoundStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    dailyNewUsers: state.dailyNewUsers,
    user: state.user,
    getNewUserDailyToMeet: state.getNewUserDailyToMeet,
  }));

  React.useEffect(() => {
    if (isLoggedIn && firstTime.current) {
      getNewUserDailyToMeet().then(() => {
        firstTime.current = false;
      });
    }
  }, [isLoggedIn, getNewUserDailyToMeet]);

  const userId = user?._id;

  return (
    <div className="lg:block hidden w-1/2 border-r">
      {!isMobile && showNavbar && <Navbar />}
      {isLoggedIn ? (
        <div className="sticky top-16 font-poppins">
          <p className="border-b p-3">
            <span className="font-semibold text-primary">
              Today&apos;s 4 New People{" "}
            </span>
            to meet 🎉
          </p>
          <div className="flex flex-col  ">
            {(dailyNewUsers || []).length > 0 &&
              dailyNewUsers
                ?.filter((us) => us._id !== userId)
                ?.slice(0, 4)
                .map((user) => <RecommedPeople key={user._id} {...user} />)}
          </div>
        </div>
      ) : (
        <div className="sticky top-16 font-poppins text-center p-4 text-lg font-medium border-b">
          <Link href="/login" className="text-primary mr-2">
            LOGIN
          </Link>
          <p>to meet best talent everyday</p>
        </div>
      )}
    </div>
  );
};

export default MeetNewPeople;
