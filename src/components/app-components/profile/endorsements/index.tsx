import { useAppBoundStore } from "@store/mainStore";
import EndorsementItem from "./EndorsementItem";
import { CustomButton } from "@components";
import { MedalSVG } from "@assets/index";
import { useState } from "react";
import toast from "react-hot-toast";
import EndorseModal from "@components/app-components/Explore/EndorseModal";

type Props = {
  endorsements: EndorseTypeResponse[];
};

const Endorsements = (props: Props) => {
  const { endorsements } = props;

  const [endorseModal, setEndorseModal] = useState(false);

  const { userDetailsByUsername, user, isLoggedIn } = useAppBoundStore(
    (state) => ({
      userDetailsByUsername: state.userDetailsByUsername,
      user: state.user,
      isLoggedIn: state.isLoggedIn,
    })
  );

  const isEndorsed = userDetailsByUsername?.profile?.endorsements?.find(
    (endorse) => endorse.user?._id === user?._id
  );

  const isSameUser = user?._id === userDetailsByUsername?.profile?._id;

  return (
    <div className="space-y-4">
      {!isEndorsed && !isSameUser && isLoggedIn ? (
        <div className="flex justify-end">
          <CustomButton
            onClick={() => {
              isLoggedIn ? setEndorseModal(true) : toast.error("Please login!");
            }}
            cls="px-6 border border-dark rounded-full h-12 text-gray-700 font-medium"
          >
            <MedalSVG />
            <span className="ml-1 text-sm">
              Endorse {userDetailsByUsername?.profile?.name}
            </span>
          </CustomButton>
        </div>
      ) : null}
      <div className="grid lg:grid-cols-2 gap-4">
        {endorsements?.map((item, id) => (
          <EndorsementItem key={id} {...item} />
        ))}
      </div>
      {endorsements?.length === 0 && (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500">No Endorsements</p>
        </div>
      )}

      {endorseModal && (
        <EndorseModal
          isOpen={endorseModal}
          userId={userDetailsByUsername?.profile?._id!}
          name={userDetailsByUsername?.profile?.name!}
          closeModal={() => setEndorseModal(false)}
        />
      )}
    </div>
  );
};

export default Endorsements;
