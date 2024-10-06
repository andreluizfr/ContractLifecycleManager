import User from '@/domain/models/User';

export interface IUserStore {
  user: User | null;
  accessToken: string | null;
  removeUser: () => void;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
}