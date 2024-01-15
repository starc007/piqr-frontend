import React from "react";
import { Badge, Button, Image, Layout } from "@components";
import { API_ENDPOINT_DEV, API_ENDPOINT_PROD, JOB_TYPE } from "@utils";
import { TimeSVG, UsersSVG } from "@assets/index";
import { formatDistance } from "date-fns";

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
  const prod = process.env.NODE_ENV === "production";

  const urlToOpen = prod
    ? `${API_ENDPOINT_PROD}/api/v1/job/${params.jobId}`
    : `${API_ENDPOINT_DEV}/api/v1/job/${params.jobId}`;

  return fetch(urlToOpen)
    .then((res) => res.json())
    .then((data) => {
      return {
        props: {
          jobData: data.data,
        },
      };
    });
}

const JobDetail = ({ jobData }: { jobData: OpportunityProps }) => {
  const jobType = JOB_TYPE.find(
    (type) => type.value === jobData?.jobType.toString()
  );

  const isSalary = jobData?.salaryRange?.length > 0;

  return (
    <Layout>
      <div className="md:px-6 px-4 py-6 h-screen border-r overflow-y-auto hide__scrollbar lg:w-2/3 w-full">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={jobData?.company?.logo}
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
          <Button cls="h-10 px-4 font-medium text-sm w-28">Share</Button>
          <Button variant="secondary" cls="h-10 px-4 font-medium text-sm w-28">
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
    </Layout>
  );
};

export default JobDetail;
