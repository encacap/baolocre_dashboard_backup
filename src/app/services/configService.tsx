import axiosInstance from '../../common/utils/http/axiosInstance';
import { ContactInformationDataType } from '../types/config';

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

export { getContactInformation, updateContactInformation };
