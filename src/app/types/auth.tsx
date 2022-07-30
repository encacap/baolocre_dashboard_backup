import { UserDataType } from './data';

export interface AuthResponseDataType {
  user: UserDataType;
  accessToken: string;
  refreshToken: string;
}
