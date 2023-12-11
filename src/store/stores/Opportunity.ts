import { toast } from "react-hot-toast";
import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";
import {
  __applyForOpportunity,
  __createOpportunity,
  __getOpportunities,
  __getOpportunityById,
  __fetchApplications,
  __accepetOrReject,
  __getMyOpportunities,
  __deleteOpportunity,
} from "@api/api";

export interface IOpportunityStore {
  allOppurtunities: OpportunityProps[];
  myOpportunities: OpportunityProps[];
  selectedOpportunity: OpportunityProps | null;
  applicantsOfOpp: ApplicationProps[];
  createOpportunity: (data: OpportunityProps, router: any) => Promise<void>;
  getAllOpportunities: () => Promise<void>;
  getMyOpportunities: () => Promise<void>;
  getOpportunityById: (id: string) => Promise<void>;
  applyOpportunity: (
    id: string,
    proposal: string,
    closeModal: () => void
  ) => Promise<void>;
  fetchApplications: (id: string) => Promise<void>;
  acceptOrReject: (
    oppId: string,
    applicantId: string,
    status: string,
    closeModal: () => void
  ) => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;
}

export const initialOpportunityState = {
  allOppurtunities: [],
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

  createOpportunity: async (data, router) => {
    try {
      const res = await __createOpportunity(data);
      if (res.success) {
        toast.success("Opportunity Created!!");
        const { allOppurtunities, user } = get();
        const newData: OpportunityProps = {
          ...res.data!,
          user: user as ProfileResponse,
        };
        set({
          allOppurtunities: [newData, ...allOppurtunities],
        });
        router.push("/jobs?type=all");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllOpportunities: async () => {
    try {
      const res = await __getOpportunities();
      if (res.success) {
        set({
          allOppurtunities: res.data!,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getMyOpportunities: async () => {
    try {
      const res = await __getMyOpportunities();
      if (res.success) {
        set({
          myOpportunities: res.data!,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getOpportunityById: async (id) => {
    try {
      const res = await __getOpportunityById({
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
  applyOpportunity: async (id, proposal, closeModal) => {
    try {
      const res = await __applyForOpportunity({
        opportunityId: id,
        proposal,
      });
      if (res.success) {
        const { allOppurtunities, user } = get();
        const getSelectedOpportunity = allOppurtunities.find(
          (item) => item._id === id
        );
        const newApplicant = {
          _id: Date.now().toString(),
          appliedBy: user?._id,
          proposal,
          status: "pending",
          appliedOn: Date.now().toString(),
        };
        if (getSelectedOpportunity?.applicantId) {
          getSelectedOpportunity?.applicantId?.applicants?.push(newApplicant);
        } else {
          getSelectedOpportunity!.applicantId = {
            _id: Date.now().toString(),
            applicants: [newApplicant],
          };
        }
        const index = allOppurtunities.findIndex((item) => item._id === id);
        allOppurtunities[index] = getSelectedOpportunity!;
        set({
          allOppurtunities: [...allOppurtunities],
        });
        toast.success("Applied Successfully");
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchApplications: async (id) => {
    try {
      const res = await __fetchApplications({
        opportunityId: id,
      });
      if (res.success) {
        set({
          applicantsOfOpp: res.data!,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  acceptOrReject: async (oppId, applicantId, status, closeModal) => {
    try {
      const res = await __accepetOrReject({
        opportunityId: oppId,
        applicantId,
        status,
      });
      if (res.success) {
        const { applicantsOfOpp } = get();
        const filteredApplicants = applicantsOfOpp.filter(
          (item) => item._id !== applicantId
        );

        set({
          applicantsOfOpp: [...filteredApplicants],
        });

        closeModal();
        toast.success("Success!!");
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteOpportunity: async (id) => {
    try {
      const res = await __deleteOpportunity({
        id,
      });
      if (res.success) {
        const { allOppurtunities, myOpportunities } = get();
        const filteredOpportunities = allOppurtunities.filter(
          (item) => item._id !== id
        );
        const filteredMyOpportunities = myOpportunities.filter(
          (item) => item._id !== id
        );
        set({
          allOppurtunities: [...filteredOpportunities],
          myOpportunities: [...filteredMyOpportunities],
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
});
