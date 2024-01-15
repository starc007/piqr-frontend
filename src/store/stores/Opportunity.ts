import { toast } from "react-hot-toast";
import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";
import {
  __applyForOpportunity,
  __createJob,
  __getJobs,
  __getJobById,
  __fetchApplications,
  __accepetOrReject,
  __getMyPostedJobs,
  __deleteJob,
  __createCompany,
} from "@api";

export interface IOpportunityStore {
  allJobs: OpportunityProps[];
  totalJobPages: number;
  myOpportunities: OpportunityProps[];
  selectedOpportunity: OpportunityProps | null;
  applicantsOfOpp: ApplicationProps[];
  createJob: (data: OpportunityProps, router: any) => Promise<void>;
  getJobs: (type: number, page: number) => Promise<void>;
  getMyOpportunities: () => Promise<void>;
  getJobById: (id: string) => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;

  //companies
  createACompany: (data: FormData, router: any) => Promise<void>;
}

export const initialOpportunityState = {
  allJobs: [],
  totalJobPages: 0,
  myOpportunities: [],
  selectedOpportunity: null,
  applicantsOfOpp: [],
};

export const createOpportunitySlice: StateCreator<
  AppState,
  [],
  [],
  IOpportunityStore
> = (set, get) => ({
  ...initialOpportunityState,

  createJob: async (data, router) => {
    try {
      const res = await __createJob(data);
      if (res.success) {
        toast.success("Opportunity Created!!");
        const { allJobs, user } = get();
        const newData: OpportunityProps = {
          ...res.data!,
          user: user as ProfileResponse,
        };
        set({
          allJobs: [newData, ...allJobs],
        });
        router.push("/jobs?type=full-time");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getJobs: async (type, page) => {
    try {
      const res = await __getJobs({
        type,
        page,
      });
      if (res.success) {
        set({
          allJobs: res.data?.jobs!,
          totalJobPages: res.data?.totalPages!,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getMyOpportunities: async () => {
    try {
      const res = await __getMyPostedJobs();
      if (res.success) {
        set({
          myOpportunities: res.data!,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getJobById: async (id) => {
    try {
      const res = await __getJobById({
        id: id,
      });
      if (res.success) {
        set({
          selectedOpportunity: res.data!,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteOpportunity: async (id) => {
    try {
      const res = await __deleteJob({
        id,
      });
      if (res.success) {
        const { allJobs, myOpportunities } = get();
        const filteredOpportunities = allJobs.filter((item) => item._id !== id);
        const filteredMyOpportunities = myOpportunities.filter(
          (item) => item._id !== id
        );
        set({
          allJobs: [...filteredOpportunities],
          myOpportunities: [...filteredMyOpportunities],
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  //companies
  createACompany: async (data, router) => {
    try {
      const res = await __createCompany(data);
      if (res.success) {
        toast.success("Page Created!!");
        // router.push("/jobs?type=all"); //TODO: change this
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  },
});
