import axiosInstance from '../../common/utils/http/axiosInstance';
import { AUTHENTICATION_API_PATH } from '../constants/API';
import { AuthTokensType, AxiosResponseType } from '../types/common';
import { UserDataType } from '../types/data';

const loginWithEmailAndPassword = (email: string, password: string) =>
  axiosInstance.post<AxiosResponseType<UserDataType>>(
    AUTHENTICATION_API_PATH.LOGIN_PATH,
    {
      email,
      password,
    },
    {
      autoRefreshToken: false,
      redirectWhenError: false,
    },
  );

const saveAuthTokens = (
  accessToken: AuthTokensType['accessToken'],
  refreshToken: AuthTokensType['refreshToken'],
) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const getAuthTokens = () => ({
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
});

const refreshAccessToken = async (refreshToken: string) => ({
  data: {
    accessToken: '',
    refreshToken,
  },
});

export { loginWithEmailAndPassword, saveAuthTokens, getAuthTokens, refreshAccessToken };
