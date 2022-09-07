import { CategoryTypeEnum } from '../enums/data';
import { ImageDataType } from './props';

export interface CategoryItemType {
  id: string;
  name: string | null;
  slug: string | null;
  description: string | null;
  image: ImageDataType | null;
  type: CategoryTypeEnum | null;
}
