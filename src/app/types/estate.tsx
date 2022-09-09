import { ContactDataType } from './contact';
import { LocationDataType } from './location';
import { ImageDataType } from './props';

export interface EstateDataType {
  id: string;
  customId: string;
  location: LocationDataType;
  title: string;
  price: string;
  area: string;
  category: string;
  direction: string;
  contact: ContactDataType;
  description: string;
  youtubeVideoId: string;
  images: ImageDataType[];
}
