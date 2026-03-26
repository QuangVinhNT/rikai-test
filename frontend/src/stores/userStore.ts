import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUserStore {
  id: number;
  username: string;
  role: 'USER' | 'ADMIN';
}

type UserStore = {
  user: IUserStore | null;
  setAuth: (user: IUserStore | null) => void;
  logout: () => void;
};

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      _hasHydrated: false,
      setAuth: (user: IUserStore | null) => set({ user }),
      logout: () => {
        set({ user: null });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
