import axiosInstance from '../../common/utils/http/axiosInstance';
import { CategoryItemType } from '../types/category';

const getCategories = async (): Promise<CategoryItemType[]> => {
  const response = await axiosInstance.get('categories');
  return response.data.data;
};

// eslint-disable-next-line import/prefer-default-export
export { getCategories };
