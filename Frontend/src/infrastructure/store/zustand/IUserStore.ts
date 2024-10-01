import User from '@/domain/models/User';

export interface IUserStore {
  user: User | null;
  removeUser: () => void;
  updateUser: (user: User) => void;
}