import { create } from "zustand";

export type Tab = "My Chats" | "Connect People";

interface ActiveTabState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const useActiveTabStore = create<ActiveTabState>((set) => ({
  activeTab: "My Chats",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
