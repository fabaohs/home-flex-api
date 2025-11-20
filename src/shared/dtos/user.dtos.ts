import { User } from '../tables';

export type BaseUserDto = Partial<User>;
export type LoggedUserDto = Pick<User, 'id' | 'name' | 'email'> & {
  enterpriseId: number;
  profile: string;
};
