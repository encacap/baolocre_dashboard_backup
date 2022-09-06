import axiosInstance from '../../common/utils/http/axiosInstance';
import { CategoryItemType } from '../types/category';

const getCategories = async (): Promise<CategoryItemType[]> => {
  const response = await axiosInstance.get('categories');
  return response.data.data;
};

const createCategory = async (category: Partial<CategoryItemType>): Promise<CategoryItemType> => {
  const response = await axiosInstance.post('categories', {
    ...category,
    image: category?.image?.id || null,
  });
  return response.data.data;
};

const deleteCategoryById = async (id: string): Promise<void> => axiosInstance.delete(`categories/${id}`);

export { getCategories, createCategory, deleteCategoryById };
