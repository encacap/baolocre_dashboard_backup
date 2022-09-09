import { ImageDataType } from './props';

export interface ContactDataType {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  zalo: string | null;
  facebook: string | null;
  avatar: ImageDataType | null;
}
