import User from '@/domain/models/User'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
import { IUserStore } from './IUserStore';
import { makePersistentStorage } from '@/factories/makePersistentStorage';
import { immer } from 'zustand/middleware/immer';

const persistentStorage = makePersistentStorage();

export const useUserStore =
  create<IUserStore>()(
    persist(
      immer((set) => ({
        user: null,
        accessToken: null,
        removeUser: () => {
          set((state) => { state.user = null })
        },
        updateUser: (user: User) => {
          set((state) => { state.user = user })
        },
        updateAccessToken: (accessToken: string) => {
          set((state) => { state.accessToken = accessToken })
        },
        removeAccessToken: () => {
          set((state) => { state.accessToken = null })
        },
      })),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => persistentStorage)
      },
    ),
  );