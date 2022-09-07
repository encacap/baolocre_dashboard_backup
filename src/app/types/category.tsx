import { CategoryTypeEnum } from '../enums/data';
import { ImageDataType } from './props';

export interface CategoryItemType {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: ImageDataType;
  type: CategoryTypeEnum;
}
