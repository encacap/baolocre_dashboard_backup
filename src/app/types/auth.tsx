import { UserDataType } from './user';

export interface AuthResponseDataType {
  user: UserDataType;
  accessToken: string;
  refreshToken: string;
}
