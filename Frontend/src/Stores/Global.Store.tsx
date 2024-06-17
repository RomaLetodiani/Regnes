import { create } from "zustand";

interface IGlobalStore {
  personalSignInCount: number;
  setPersonalSignInCount: (count: number) => void;
  globalSignInCount: number;
  setGlobalSignInCount: (count: number) => void;
}

const GlobalStore = create<IGlobalStore>((set) => ({
  personalSignInCount: 0,
  setPersonalSignInCount: (count) => set({ personalSignInCount: count }),
  globalSignInCount: 0,
  setGlobalSignInCount: (count) => set({ globalSignInCount: count }),
}));

export default GlobalStore;
