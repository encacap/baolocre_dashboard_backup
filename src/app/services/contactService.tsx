import axiosInstance from '../../common/utils/http/axiosInstance';
import { CONTACT_API_PATH } from '../constants/API';
import { ContactDataType } from '../types/contact';

const getContacts = async (): Promise<ContactDataType[]> => {
  const response = await axiosInstance.get(CONTACT_API_PATH.CONTACT_PATH);
  return response.data.data;
};

// eslint-disable-next-line import/prefer-default-export
export { getContacts };
