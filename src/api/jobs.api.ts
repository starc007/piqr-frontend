import { AxiosRequestConfig } from "axios";
import { getFetch, postFetch } from "./api-wrapper";
import * as Types from "./api.types";

export const __createJob = (
  params: OpportunityProps,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<OpportunityProps>> =>
  postFetch("/job/create", params, config);

export const __getJobs = (
  params: {
    type: number;
    page: number;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<{
    jobs: OpportunityProps[];
    totalPages: number;
  }>
> =>
  getFetch(`/job?type=${params.type}&page=${params.page}`, undefined, config);

export const __getMyPostedJobs = (
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<OpportunityProps[]>> =>
  getFetch("/opp/get-all-by-user", undefined, config);

export const __getJobById = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<OpportunityProps>> =>
  getFetch(`/opp/getOpp/${params.id}`, undefined, config);

export const __applyForOpportunity = (
  params: {
    opportunityId: string;
    proposal: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch("/opp/apply", params, config);

export const __fetchApplications = (
  params: {
    opportunityId: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<ApplicationProps[]>> =>
  postFetch("/opp/get-applicants", params, config);

export const __accepetOrReject = (
  params: {
    opportunityId: string;
    applicantId: string;
    status: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch("/opp/accept-or-reject-applicant", params, config);

export const __deleteJob = (
  params: {
    id: string;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch(`/opp/delete/${params.id}`, undefined, config);

// COMPANY
export const __createCompany = (
  params: FormData,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<DefaultResponse>> =>
  postFetch("/job/create/company", params, config);

export const __getCompaniesByName = (
  params: {
    name: string;
  },
  config?: AxiosRequestConfig
): Promise<
  Types.FetchResponse<
    {
      name: string;
      logo: string;
      _id: string;
    }[]
  >
> => getFetch(`/job/companies/${params.name}`, undefined, config);
