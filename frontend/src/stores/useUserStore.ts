import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User as UserType } from 'better-auth/types';

export type User = UserType & {
  role: string;
  phone: string;
};

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setLoading: (status) => set({ isLoading: status }),
      logout: () => set({ user: null, isAuthenticated: false }),
      isAdmin: () => get().user?.role === 'admin',
    }),
    {
      name: 'user-storage',
    },
  ),
);
