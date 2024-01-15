import React from "react";
import { Badge, Button, Image, Layout } from "@components";
import { JOB_TYPE } from "@utils";
import { TimeSVG, UsersSVG } from "@assets/index";
import { formatDistance } from "date-fns";
import { useAppBoundStore } from "@store/mainStore";
import SendProposalModal from "@components/app-components/Opportunity/SendProposalModal";
import ReferToFriend from "@components/app-components/Opportunity/ReferToFriend";
import toast from "react-hot-toast";
import { __getJobById } from "@api/jobs.api";

const jobLocation = {
  remote: "Remote",
  office: "Onsite",
  hybrid: "Hybrid",
};

export async function getServerSideProps({
  params,
}: {
  params: {
    jobId: string;
  };
}) {
  const res = await __getJobById({ id: params.jobId });

  return {
    props: {
      jobData: res.data,
    },
  };
}

const ApplicationItem = () => {};

const JobDetail = ({ jobData }: { jobData: OpportunityProps }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [shareModal, setShareModal] = React.useState<boolean>(false);

  const jobType = JOB_TYPE.find(
    (type) => type.value === jobData?.jobType.toString()
  );

  const { isLoggedIn, user } = useAppBoundStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  }));

  const isSalary = jobData?.salaryRange?.length > 0;

  const hasAccessToApplicants = jobData?.accessIds?.includes(user?._id!);
  const isSameUser = jobData.company?._id === user?._id;

  return (
    <Layout>
      <div className="flex h-screen border-r">
        <div
          className={`md:px-6 px-4 py-6  overflow-y-auto hide__scrollbar  ${
            hasAccessToApplicants ? `lg:w-2/3 w-full border-r` : "w-full"
          }`}
        >
          <div className="flex justify-between">
            <div className="flex">
              <Image
                // @ts-ignore
                src={jobData?.company?.logo || jobData?.company.avatar}
                alt="profile"
                className="w-14 h-14 rounded-lg"
              />
              <div className="ml-2">
                <p className="font-semibold text-xl">{jobData?.title}</p>
                <p className="text-gray-500">{jobData?.company?.name}</p>
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
              cls="text-sm px-3 py-1 rounded-full !bg-primary/10 !text-primary !ring-primary/20"
            />

            <Badge
              //@ts-ignore
              text={jobLocation[jobData.workLocation]}
              cls="text-sm px-3 py-1 rounded-full !bg-primary/10 !text-primary !ring-primary/20"
            />
            <Badge
              text={jobData.experience as string}
              cls="text-sm px-3 py-1 rounded-full !bg-primary/10 !text-primary !ring-primary/20"
            />

            {isSalary && (
              <Badge
                text={jobData.salaryRange}
                cls="text-sm px-3 py-1 rounded-full !bg-primary/10 !text-primary !ring-primary/20"
              />
            )}
          </div>

          <div className="flex mt-4 gap-4">
            <div className="flex items-center">
              <TimeSVG className="w-5 mr-1 text-gray-500" />
              <p className="text-gray-700 text-sm">
                {formatDistance(new Date(), jobData.createdAt as string)}
              </p>
            </div>
            <div className="flex items-center">
              <UsersSVG className="w-5 mr-1 text-gray-500" />
              <p className="text-gray-700 text-sm">
                {jobData?.applicantsCount} applicants
              </p>
            </div>
          </div>

          <div className="flex mt-5 gap-4">
            <Button
              onClick={() => setShareModal(true)}
              cls="h-10 px-4 font-medium text-sm w-28"
            >
              Share
            </Button>
            <Button
              variant="secondary"
              cls="h-10 px-4 font-medium text-sm w-28"
              disabled={hasAccessToApplicants || isSameUser}
              onClick={() => {
                if (!isLoggedIn) return toast.error("Please login to apply");
                if (jobData.externalLink) {
                  window.open(jobData.externalLink, "_blank");
                } else setOpenModal(true);
              }}
            >
              Apply
            </Button>
          </div>

          <div className="mt-5">
            <p className="font-semibold text-lg">About the job</p>
            <p
              className="mt-2 text-gray-600 text-sm whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: jobData?.description }}
            />
          </div>
        </div>

        {hasAccessToApplicants && (
          <div className="flex flex-col p-4 lg:w-1/3">
            <p className="font-semibold text-lg">Applicants</p>
          </div>
        )}
      </div>

      {openModal && (
        <SendProposalModal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          name={jobData?.company?.name as string}
          jobId={jobData?._id as string}
        />
      )}

      {shareModal && (
        <ReferToFriend
          text={jobData?.title as string}
          isOpen={shareModal}
          closeModal={() => setShareModal(false)}
          oppId={jobData?._id as string}
        />
      )}
    </Layout>
  );
};

export default JobDetail;
