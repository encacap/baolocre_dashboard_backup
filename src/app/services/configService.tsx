import axiosInstance from '../../common/utils/http/axiosInstance';
import { ContactInformationDataType } from '../types/config';
import { ImageDataType } from '../types/upload';

const getContactInformation = async (): Promise<ContactInformationDataType> => {
  const response = await axiosInstance.get('configs/contact');
  return response.data.data;
};

const updateContactInformation = async (
  data: ContactInformationDataType,
): Promise<ContactInformationDataType> => {
  const response = await axiosInstance.put('configs/contact', data);
  return response.data.data;
};

const getHomepageHeroImages = async (): Promise<ImageDataType[]> => {
  const response = await axiosInstance.get('configs/homepage-hero-images');
  return response.data.data;
};

const addHomepageHeroImages = async (imageIds: string[]): Promise<ImageDataType[]> => {
  const response = await axiosInstance.post('configs/homepage-hero-images', { imageIds });
  return response.data.data;
};

const deleteHomepageHeroImageById = async (imageId: string): Promise<ImageDataType[]> => {
  const response = await axiosInstance.delete(`configs/homepage-hero-images/${imageId}`);
  return response.data.data;
};

export {
  getContactInformation,
  updateContactInformation,
  getHomepageHeroImages,
  addHomepageHeroImages,
  deleteHomepageHeroImageById,
};
