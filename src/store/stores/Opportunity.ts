import { toast } from "react-hot-toast";
import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";
import {
  __createJob,
  __getJobs,
  __getJobById,
  __fetchApplicants,
  __accepetOrReject,
  __getMyPostedJobs,
  __deleteJob,
  __createCompany,
  __applyForJob,
} from "@api";

export interface IOpportunityStore {
  allJobs: OpportunityProps[];
  totalJobPages: number;
  myOpportunities: OpportunityProps[];

  jobApplicants: ApplicationProps[];
  createJob: (data: OpportunityProps, router: any) => Promise<void>;
  getJobs: (type: number, page: number) => Promise<void>;
  applyForJob: (
    data: { jobId: string; whyGoodFit: string },
    closeModal: () => void
  ) => Promise<void>;
  getJobApplicants: (id: string) => Promise<void>;
  getMyOpportunities: () => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;

  //companies
  createACompany: (data: FormData, router: any) => Promise<void>;
}

export const initialOpportunityState = {
  allJobs: [],
  totalJobPages: 0,
  myOpportunities: [],
  jobApplicants: [],
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

  applyForJob: async (data, closeModal) => {
    try {
      const res = await __applyForJob(data);
      if (res.success) {
        toast.success("Applied Successfully!!");
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  },

  getJobApplicants: async (id) => {
    try {
      const res = await __fetchApplicants({
        jobId: id,
      });
      if (res.success) {
        set({
          jobApplicants: res.data!,
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
