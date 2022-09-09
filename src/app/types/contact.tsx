import { ImageDataType } from './props';

export interface ContactDataType {
  id: string;
  name: string;
  phone: string;
  email: string;
  zalo: string;
  avatar: ImageDataType;
}
