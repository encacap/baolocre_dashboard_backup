import { CategoryTypeEnum } from '../enums/data';
import { ImageDataType } from './upload';

export interface CategoryItemType {
  id: string;
  name: string;
  description?: string;
  image: ImageDataType;
  type: CategoryTypeEnum;
}
