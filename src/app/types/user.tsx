import { UserRoleEnum } from '../enums/data';

export interface UserDataType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRoleEnum[];
}
