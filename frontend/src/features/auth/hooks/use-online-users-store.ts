import { create } from "zustand";

type OnlineUsersState = {
  onlineUserIds: string[];
  setOnlineUserIds: (ids: string[]) => void;
};

export const useOnlineUsersStore = create<OnlineUsersState>((set) => ({
  onlineUserIds: [],
  setOnlineUserIds: (ids) => set({ onlineUserIds: ids }),
}));
