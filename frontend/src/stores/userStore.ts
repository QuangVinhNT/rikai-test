import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUserStore {
  id: number;
  username: string;
}

type UserStore = {
  user: IUserStore | null;
  accessToken: string | null;
  setAuth: (user: IUserStore | null, token: string) => void;
  logout: () => void;
};

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user: IUserStore | null, token: string) => set({ user, accessToken: token }),
      logout: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem('accessToken');
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken
      }),
    }
  )
);
