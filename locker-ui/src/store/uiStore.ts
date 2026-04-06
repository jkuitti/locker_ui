import { create } from "zustand";

type ModalType =
  | "ADD_ROOM"
  | "ADD_LOCKER"
  | "ASSIGN_LOCKER"
  | "RETURN_LOCKER"
  | "EDIT_ROOM"
  | "EDIT_LOCKER"
  | null;

type ModalData = {
  roomId?: number;
  lockerId?: number;
};

type UIState = {
  selectedRoomId: number | null;
  selectedLockerId: number | null;

  isEditMode: boolean;
  showGrid: boolean;

  activeModal: ModalType;
  modalData: ModalData | null;

  setSelectedRoomId: (id: number | null) => void;
  setSelectedLockerId: (id: number | null) => void;

  setEditMode: (value: boolean) => void;
  toggleEditMode: () => void;

  setShowGrid: (value: boolean) => void;
  toggleGrid: () => void;

  openModal: (modal: Exclude<ModalType, null>, data?: ModalData) => void;
  closeModal: () => void;

  resetSelection: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedRoomId: null,
  selectedLockerId: null,

  isEditMode: false,
  showGrid: false,

  activeModal: null,
  modalData: null,

  setSelectedRoomId: (id) =>
    set({
      selectedRoomId: id,
      selectedLockerId: null,
      isEditMode: false,
    }),

  setSelectedLockerId: (id) =>
    set({
      selectedLockerId: id,
    }),

  setEditMode: (value) =>
    set({
      isEditMode: value,
    }),

  toggleEditMode: () =>
    set((state) => ({
      isEditMode: !state.isEditMode,
    })),

  setShowGrid: (value) =>
    set({
      showGrid: value,
    }),

  toggleGrid: () =>
    set((state) => ({
      showGrid: !state.showGrid,
    })),

  openModal: (modal, data) =>
    set({
      activeModal: modal,
      modalData: data ?? null,
    }),

  closeModal: () =>
    set({
      activeModal: null,
      modalData: null,
    }),

  resetSelection: () =>
    set({
      selectedLockerId: null,
    }),
}));
