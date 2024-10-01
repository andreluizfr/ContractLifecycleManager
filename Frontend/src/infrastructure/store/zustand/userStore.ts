import User from '@/domain/models/User'
import { create } from 'zustand'
import { IUserStore } from './IUserStore'

export const userStore = create<IUserStore>((set) => ({
  user: null as User | null,
  removeUser: () => set({ user: null }),
  updateUser: (user: User) => set({ user: user }),
}))