/* eslint-disable @next/next/no-img-element */
import { ArrowSVG } from "@assets/index";
import { CustomButton, Image, Link, Loader } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SendProposalModal from "./SendProposalModal";
import ProposalCard from "./ProposalCard";
import { moneyFormatter, urlify } from "@utils";
import moment from "moment";
import ReferToFriend from "./ReferToFriend";
import { toast } from "react-hot-toast";

const contractTypeDetails: {
  [key: string]: string;
} = {
  "0": "Freelance",
  "1": "Part Time",
  "2": "Contract Based",
  "3": "Full Time",
  "4": "Internship",
};

const OpportunityDetail = ({ item }: { item: OpportunityProps }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openReferalModal, setOpenReferalModal] = useState(false);

  const {
    user,
    fetchApplications,
    applicantsOfOpp,
    profilePercent,
    isLoggedIn,
  } = useAppBoundStore((state) => ({
    user: state.user,
    fetchApplications: state.fetchApplications,
    applicantsOfOpp: state.applicantsOfOpp,
    profilePercent: state.profilePercent,
    isLoggedIn: state.isLoggedIn,
  }));

  const postedByCurrentUser =
    user?._id.toString() === item?.user?._id.toString();

  const isApplied = item?.applicantId?.applicants?.some(
    (applicant) => applicant?.appliedBy?.toString() === user?._id.toString()
  );

  useEffect(() => {
    if (postedByCurrentUser && item?._id) {
      setLoading(true);
      fetchApplications(item?._id as string).then(() => {
        setLoading(false);
      });
    }
  }, [postedByCurrentUser, fetchApplications, item?._id]);

  return (
    <div>
      <button
        onClick={() => {
          router.back();
        }}
        className="font-medium text-secondary flex items-center gap-1"
      >
        <ArrowSVG className="-rotate-90 w-5" /> go back
      </button>
      <div className="flex lg:flex-row flex-col mt-4 lg:gap-4">
        <div className="lg:w-2/3 w-full flex flex-col lg:px-6 py-6 h-min">
          <div className="flex justify-between mb-4">
            <Link href={`/${item?.user?.username}`} className="flex gap-4">
              <Image
                src={item?.user?.avatar}
                alt="profile"
                className="rounded-xl h-11 w-11 object-cover object-center"
              />
              <div className="flex flex-col">
                <p className="text-secondary font-medium">
                  {item?.user?.name}{" "}
                </p>
                <p className="text-sm text-gray-500">@{item?.user?.username}</p>
                {/* <p className="text-xs text-gray-500">
                  {moment(item?.createdAt).fromNow()}
                </p> */}
              </div>
            </Link>
          </div>
          <p className="text-secondary text-2xl font-medium">{item?.title} </p>
          <p
            className="text-gray-500 font-medium mt-4 whitespace-pre-line"
            id="editor-text"
            dangerouslySetInnerHTML={{
              __html: urlify(item?.description as string),
            }}
          ></p>
          <div className="flex flex-col mt-4">
            <p className="text-sm font-medium">Skills Required:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item?.skills?.map((skill, index) => (
                <p
                  key={index}
                  className="bg-white text-secondary rounded-full px-3 py-1 text-xs font-medium border"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center bg-white border rounded-full w-28 py-2 gap-2 mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
            >
              <path
                d="M6.19158 7.5C8.29726 7.5 10.0043 5.82107 10.0043 3.75C10.0043 1.67893 8.29726 0 6.19158 0C4.0859 0 2.37891 1.67893 2.37891 3.75C2.37891 5.82107 4.0859 7.5 6.19158 7.5Z"
                fill="#374957"
              />
              <path
                d="M6.19167 8.74951C3.03459 8.75297 0.476171 11.2693 0.472656 14.3745C0.472656 14.7197 0.757147 14.9995 1.10809 14.9995H11.2752C11.6262 14.9995 11.9106 14.7197 11.9106 14.3745C11.9072 11.2693 9.34874 8.75294 6.19167 8.74951Z"
                fill="#374957"
              />
            </svg>
            <p className="text-secondary text-sm font-semibold pt-[1px]">
              {item?.applicantId?.applicants?.length || 0}{" "}
              <span className="font-normal">applied</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex flex-col border px-4 py-3 rounded-2xl">
              <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M13.7201 6.25H7.61981M13.7201 9.25H7.61981M10.6699 15.25L7.61981 12.25H9.14488C9.95383 12.25 10.7296 11.9339 11.3017 11.3713C11.8737 10.8087 12.195 10.0457 12.195 9.25C12.195 8.45435 11.8737 7.69129 11.3017 7.12868C10.7296 6.56607 9.95383 6.25 9.14488 6.25M19.8204 10C19.8204 11.1819 19.5837 12.3522 19.1238 13.4442C18.664 14.5361 17.99 15.5282 17.1403 16.364C16.2906 17.1997 15.2818 17.8626 14.1717 18.3149C13.0615 18.7672 11.8716 19 10.6699 19C9.4683 19 8.27842 18.7672 7.16824 18.3149C6.05806 17.8626 5.04932 17.1997 4.19963 16.364C3.34993 15.5282 2.67592 14.5361 2.21607 13.4442C1.75621 12.3522 1.51953 11.1819 1.51953 10C1.51953 7.61305 2.48359 5.32387 4.19963 3.63604C5.91566 1.94821 8.24311 1 10.6699 1C13.0968 1 15.4242 1.94821 17.1403 3.63604C18.8563 5.32387 19.8204 7.61305 19.8204 10Z"
                    stroke="#374957"
                    strokeWidth="1.23214"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Budget
              </p>
              <p className="text-secondary font-medium mt-1">
                {/* {moneyFormatter(item?.budget)} / {item?.payType} */}
                {item?.budget.includes(",") || item?.budget.includes("-")
                  ? item?.budget
                  : moneyFormatter(item?.budget)}
              </p>
            </div>
            <div className="flex flex-col border px-4 py-3 rounded-2xl">
              <p className="text-sm text-gray-500 font-medium">Contract Type</p>
              <p className="text-secondary font-medium">
                {contractTypeDetails[item?.contractType]}
              </p>
            </div>
            {item?.duration && (
              <div className="flex flex-col border px-4 py-3 rounded-2xl">
                <p className="text-sm text-gray-500 font-medium">Duration</p>
                <p className="text-secondary font-medium">{item?.duration}</p>
              </div>
            )}
          </div>

          {!postedByCurrentUser && (
            <div className="flex justify-center p-4 mt-8">
              <CustomButton
                onClick={() => setOpenReferalModal(true)}
                cls="w-56 text-sm font-medium py-3"
              >
                Refer to friend
              </CustomButton>
              <CustomButton
                onClick={() => {
                  if (!isLoggedIn) return toast.error("Please login first!!");
                  if (profilePercent < 90) {
                    return toast.error(
                      "Please complete your profile first (90%)"
                    );
                  }

                  if (!isApplied) {
                    setIsOpen(true);
                  } else {
                    toast.error("You have already applied");
                  }
                }}
                cls={`bg-secondary text-white w-56 py-3 rounded-full text-sm font-medium ${
                  isApplied ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isApplied ? "Applied" : "Apply Now"}
              </CustomButton>
            </div>
          )}
        </div>

        {postedByCurrentUser && (
          <>
            {loading && (
              <div className="flex justify-center">
                <Loader col="text-secondary" />
              </div>
            )}
            {!loading && applicantsOfOpp?.length > 0 && (
              <div className="lg:w-1/3 w-full rounded-3xl border h-min">
                <div className="flex items-center justify-between p-4 border-b">
                  <p className="text-gray-600 ">Total Proposals </p>
                  <p className="text-secondary font-bold">
                    {applicantsOfOpp?.length || 0}
                  </p>
                </div>
                <div className="flex flex-col p-2 space-y-2 mt-1 divide-y">
                  {applicantsOfOpp?.map((it, index) => (
                    <ProposalCard
                      key={index}
                      item={it}
                      oppId={item?._id as string}
                    />
                  ))}
                </div>
              </div>
            )}

            {!loading && applicantsOfOpp?.length === 0 && (
              <div className="lg:w-1/3 w-full rounded-3xl border h-min py-4">
                <p className="text-center">No applicants</p>
              </div>
            )}
          </>
        )}
      </div>

      {isOpen && (
        <SendProposalModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          name={item?.user?.name as string}
          oppId={item?._id as string}
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
    </div>
  );
};

export default OpportunityDetail;
