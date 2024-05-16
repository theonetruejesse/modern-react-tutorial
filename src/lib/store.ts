import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: true,
  setOpen: () => set(() => ({ isOpen: true })),
  setClose: () => set(() => ({ isOpen: false })),
}));
