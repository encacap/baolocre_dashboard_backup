import _ from 'lodash';
import axiosInstance from '../../common/utils/http/axiosInstance';
import { CONTACT_API_PATH } from '../constants/API';
import { ContactDataType } from '../types/contact';

const createContact = async (data: ContactDataType): Promise<ContactDataType> => {
  const response = await axiosInstance.post(
    CONTACT_API_PATH.CONTACT_PATH,
    _.pickBy(
      {
        ...data,
        avatar: data.avatar?.id,
      },
      _.identity,
    ),
  );
  return response.data.data;
};

const getContacts = async (): Promise<ContactDataType[]> => {
  const response = await axiosInstance.get(CONTACT_API_PATH.CONTACT_PATH);
  return response.data.data;
};

const updateContactById = async (id: string, data: ContactDataType): Promise<ContactDataType> => {
  const response = await axiosInstance.patch(`${CONTACT_API_PATH.CONTACT_PATH}/${id}`, {
    ...data,
    avatar: data.avatar?.id,
  });
  return response.data.data;
};

const deleteContactById = async (id: string): Promise<void> =>
  axiosInstance.delete(`${CONTACT_API_PATH.CONTACT_PATH}/${id}`);

export { createContact, getContacts, updateContactById, deleteContactById };
