import axiosInstance from '../../common/utils/http/axiosInstance';
import { USER_API_PATH } from '../constants/API';
import { AxiosResponseType } from '../types/common';
import { UserDataType } from '../types/user';

const getMe = () => axiosInstance.get<AxiosResponseType<UserDataType>>(USER_API_PATH.ME_PATH);

// eslint-disable-next-line import/prefer-default-export
export { getMe };
