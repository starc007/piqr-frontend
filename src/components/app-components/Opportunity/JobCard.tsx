/* eslint-disable @next/next/no-img-element */
import { Badge, Button, Image, Link } from "@components";
import { useAppBoundStore } from "@store";
import React, { memo, useState } from "react";
import { formatDistance } from "date-fns";
import SendProposalModal from "./SendProposalModal";
import { TimeSVG, UsersSVG } from "@assets/index";
// import moment from "moment";
import { JOB_TYPE, moneyFormatter } from "@utils";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import ReferToFriend from "./ReferToFriend";

const jobLocation = {
  remote: "Remote",
  office: "Onsite",
  hybrid: "Hybrid",
};

const JobCard = ({ item }: { item: OpportunityProps }) => {
  // const item = props;

  const [isOpen, setIsOpen] = useState(false);
  const [openReferalModal, setOpenReferalModal] = useState(false);

  const { user, deleteOpportunity, isLoggedIn } = useAppBoundStore((state) => ({
    user: state.user,
    deleteOpportunity: state.deleteOpportunity,
    isLoggedIn: state.isLoggedIn,
  }));

  const jobType = JOB_TYPE.find(
    (type) => type.value === item?.jobType.toString()
  );

  const isSalary = item?.salaryRange?.length > 0;

  const hasAccessToApplicants = item?.accessIds?.includes(user?._id as string);

  return (
    <>
      <div className="border rounded-2xl px-4 py-5">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={item?.company?.logo}
              alt="profile"
              className="w-12 h-12 rounded-lg"
            />
            <div className="flex flex-col ml-2">
              <Link
                href={`/jobs/${item?._id}`}
                className="font-semibold text-lg"
              >
                {item?.title}
              </Link>
              <p className="text-gray-500 -mt-1">{item?.company?.name}</p>
            </div>
          </div>
          <div className="pt-2">
            <label className="ui-bookmark">
              <input
                type="checkbox"
                // checked={isSavedUser}
                // onChange={() => {
                //   isLoggedIn
                //     ? saveUser(item._id!, !isSavedUser).then(() =>
                //         setIsSavedUser(!isSavedUser)
                //       )
                //     : toast.error("Please login to save");
                // }}
              />
              <div className="bookmark">
                <svg viewBox="0 0 32 32">
                  <g>
                    <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                  </g>
                </svg>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap mt-5 space-x-3">
          <Badge
            text={jobType?.label as string}
            cls="text-sm px-4 py-1 rounded-lg !bg-gray-100 !ring-0 !text-dark/80"
          />

          <Badge
            //@ts-ignore
            text={jobLocation[item.workLocation]}
            cls="text-sm px-4 py-1 rounded-lg !bg-gray-100 !ring-0 !text-dark/80"
          />
          <Badge
            text={item.experience as string}
            cls="text-sm px-4 py-1 rounded-lg !bg-gray-100 !ring-0 !text-dark/80"
          />

          {isSalary && (
            <Badge
              text={item.salaryRange}
              cls="text-sm px-4 py-1 rounded-lg !bg-gray-100 !ring-0 !text-dark/80"
            />
          )}
        </div>

        <div className="flex mt-4 gap-4">
          <div className="flex items-center">
            <TimeSVG className="w-4 mr-1 text-gray-500" />
            <p className="text-gray-500 text-sm">
              {formatDistance(new Date(), item.createdAt as string)}
            </p>
          </div>
          <div className="flex items-center">
            <UsersSVG className="w-5 mr-1 text-gray-500" />
            <p className="text-gray-500 text-sm">
              {item?.applicantsCount} applicants
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-5 gap-4">
          <Button
            onClick={() => {
              setOpenReferalModal(true);
            }}
            cls="h-10 px-4 font-medium text-sm w-1/2 rounded-lg"
          >
            Share
          </Button>
          <Button
            variant="secondary"
            disabled={hasAccessToApplicants}
            cls="h-10 px-4 font-medium text-sm w-1/2 rounded-lg"
            onClick={() => {
              if (!isLoggedIn) return toast.error("Please login to apply");

              if (item.externalLink) {
                window.open(item.externalLink, "_blank");
              } else setIsOpen(true);
            }}
          >
            Apply
          </Button>
        </div>
      </div>

      {isOpen && (
        <SendProposalModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          name={item?.company?.name as string}
          jobId={item?._id as string}
        />
      )}

      {openReferalModal && (
        <ReferToFriend
          isOpen={openReferalModal}
          closeModal={() => setOpenReferalModal(false)}
          oppId={item?._id as string}
          text={item?.title}
        />
      )}
    </>
  );
};

export default memo(JobCard);
