/* eslint-disable @next/next/no-img-element */
import { BookmarkSVG, MessageSVG, ShareSVG, VerifiedSVG } from "@assets";
import {
  CustomButton,
  CustomTooltip,
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  Link,
} from "@components";
import { FC, useState } from "react";
import SendMessageModal from "./SendMessageModal";
import EndorseModal from "./EndorseModal";
import { useAppBoundStore } from "@store/mainStore";
import { toast } from "react-hot-toast";

interface ExploreCardProps {
  item: ProfileResponse;
}

const ExploreCard: FC<ExploreCardProps> = ({ item }) => {
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [endorseModal, setEndorseModal] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const { user, isLoggedIn, saveUser, followUser } = useAppBoundStore(
    (state) => ({
      user: state.user,
      isLoggedIn: state.isLoggedIn,
      saveUser: state.saveUser,
      followUser: state.followUser,
    })
  );

  const isSameUser = user?._id === item?._id;
  const isSavedUser = item?.savedBy?.includes(user?._id!);

  const isFollowing = item?.folowId?.followers?.includes(user?._id!);

  const copyProfile = (username: string) => {
    const url = `https://www.piqr.xyz/${username}`;
    navigator.clipboard.writeText(url);
    toast.success("Profile link Copied");
  };

  return (
    <div className="border border-gray-300 rounded-3xl md:px-5 py-4 px-3 flex flex-col transition duration-300 w-full font-poppins">
      <CustomTooltip id="saveProfile" />
      <div className="flex justify-between ">
        <div className="flex items-center">
          <img
            src={item.avatar}
            alt={item.name}
            className="rounded-lg md:w-11 md:h-11 w-10 h-10 object-cover object-center"
          />
          <Link href={`/${item.username}`} className="ml-3 flex flex-col w-max">
            <span className="text-gray-800 font-semibold flex items-center gap-1">
              {item.name}{" "}
              {/* {item?.isVerified && (
                // <Image
                //   src={VerifiedSVG}
                //   alt="Verified"
                //   width={18}
                //   height={18}
                // />
                <VerifiedSVG />
              )} */}
            </span>
            <span className="text-gray-500 text-xs font-medium truncate w-56 lg:w-60">
              {item.title}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {!isSameUser ? (
            <CustomButton
              data-tooltip-id="saveProfile"
              data-tooltip-content={isSavedUser ? "Unsave" : "Save"}
              cls="transition duration-300"
              onClick={() => {
                setToggleState(!toggleState);
                isLoggedIn
                  ? saveUser(item._id!, !isSavedUser).then(() =>
                      console.log("saved")
                    )
                  : toast.error("Please login to save");
              }}
            >
              <BookmarkSVG
                className={`w-5 hover:fill-black ${
                  isSavedUser ? "fill-black" : "fill-none"
                }`}
              />
            </CustomButton>
          ) : null}
          <Dropdown>
            <DropdownButton cls="border rounded-full h-10 w-10">
              <ShareSVG className="w-5" />
            </DropdownButton>
            <DropdownContent cls="w-40 mt-6 h-10 text-sm flex justify-center items-center">
              <DropdownItem
                onClick={() => copyProfile(item.username as string)}
              >
                Copy Profile Link
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
      <div className="mt-5">
        {item?.availableFor?.length > 0 && (
          <>
            <p className="text-xs font-bold text-gray-500">Open to</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item?.availableFor?.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium text-gray-500 bg-gray-100 rounded-lg px-2.5 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col mt-2 h-14 overflow-hidden">
        {item?.endorsements?.length! > 0 && (
          <>
            <p className="text-xs font-bold text-gray-600">Endorsed by</p>
            <div className="flex gap-1 mt-2 items-center">
              {item?.endorsements?.slice(0, 5).map((endorse, i) => (
                <Link
                  key={endorse._id}
                  href={`/${endorse.user?.username}`}
                  className={`w-7 h-7 ${i !== 0 && "-ml-3"}`}
                >
                  <img
                    src={endorse.user?.avatar!}
                    alt={endorse.user?.name!}
                    className={`rounded-full w-full h-full object-center object-cover bg-white border`}
                  />
                </Link>
              ))}
              {item?.endorsements?.length > 5 && (
                <span className="text-sm font-bold text-gray-500">
                  +{item?.endorsements?.length - 5} more
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {!isSameUser ? (
        <div className="border-t pt-4 mt-2 w-full flex items-center justify-center space-x-4 text-sm ">
          {!isFollowing ? (
            <CustomButton
              onClick={() => {
                isLoggedIn
                  ? followUser(item._id!).then(() => console.log("followed"))
                  : toast.error("Please login!");
              }}
              cls={`rounded-full bg-dark hover:bg-dark/80 text-white font-medium h-11 w-2/5`}
              variant="default"
            >
              + Follow
            </CustomButton>
          ) : null}
          {/* ${!isFollowing ? "w-2/5" : "w-3/4"} */}
          <CustomButton
            onClick={() => {
              isLoggedIn
                ? setSendMessageModal(true)
                : toast.error("Please login to collaborate!");
            }}
            variant="default"
            cls={`rounded-full border border-dark h-11 ${
              !isFollowing ? "w-2/5" : "w-3/4"
            }`}
          >
            <MessageSVG className="text-dark w-5" />
            <span className="ml-2 font-medium">Get in Touch</span>
          </CustomButton>
        </div>
      ) : null}
      <SendMessageModal
        isOpen={sendMessageModal}
        userId={item?._id!}
        name={item.name}
        closeModal={() => setSendMessageModal(false)}
      />
      <EndorseModal
        isOpen={endorseModal}
        userId={item?._id!}
        name={item.name}
        closeModal={() => setEndorseModal(false)}
      />
    </div>
  );
};

export default ExploreCard;
