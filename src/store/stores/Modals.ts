import type { StateCreator } from "zustand";
import type { AppState } from "../mainStore";

export interface ModalState {
  addPositionModal: boolean;
  addEducationModal: boolean;
  addHighlightModal: boolean;
  addLinkModal: boolean;
  addWorkModal: boolean;
  skillnAvailableForModal: boolean;
  openAddPositionModal: () => void;
  openAddEducationModal: () => void;
  openAddHighlightModal: () => void;
  openAddWorkModal: () => void;
  openAddLinkModal: () => void;
  closeAddPositionModal: () => void;
  closeAddEducationModal: () => void;
  closeAddHighlightModal: () => void;
  closeAddLinkModal: () => void;
  closeAddWorkModal: () => void;
  openSkillnAvailableForModal: () => void;
  closeSkillnAvailableForModal: () => void;
}

export const initialModalState = {
  addPositionModal: false,
  addEducationModal: false,
  addHighlightModal: false,
  addLinkModal: false,
  addWorkModal: false,
  skillnAvailableForModal: false,
};

export const createModalSlice: StateCreator<AppState, [], [], ModalState> = (
  set
) => ({
  ...initialModalState,
  openAddEducationModal: () => set({ addEducationModal: true }),
  openAddHighlightModal: () => set({ addHighlightModal: true }),
  openAddLinkModal: () => set({ addLinkModal: true }),
  openAddWorkModal: () => set({ addWorkModal: true }),
  openAddPositionModal: () => set({ addPositionModal: true }),
  closeAddEducationModal: () => set({ addEducationModal: false }),
  closeAddHighlightModal: () => set({ addHighlightModal: false }),
  closeAddLinkModal: () => set({ addLinkModal: false }),
  closeAddPositionModal: () => set({ addPositionModal: false }),
  closeAddWorkModal: () => set({ addWorkModal: false }),

  openSkillnAvailableForModal: () => set({ skillnAvailableForModal: true }),
  closeSkillnAvailableForModal: () => set({ skillnAvailableForModal: false }),
});
