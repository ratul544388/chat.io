import type { User } from "@/types";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useAuthUser = () => {
  const { user } = useAuthStore();

  if (!user) {
    throw new Error("useAuthUser must be used within an authenticated route");
  }

  return user
};
