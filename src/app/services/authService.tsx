import axiosInstance from '../../common/utils/http/axiosInstance';
import { AUTHENTICATION_API_PATH } from '../constants/API';
import { AuthResponseDataType } from '../types/auth';
import { AuthTokensType, AxiosResponseType } from '../types/common';

const loginWithEmailAndPassword = (email: string, password: string) =>
  axiosInstance.post<AxiosResponseType<AuthResponseDataType>>(
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

const refreshAccessToken = async (refreshToken: string) =>
  axiosInstance.post<AxiosResponseType<AuthResponseDataType>>(
    AUTHENTICATION_API_PATH.REFRESH_TOKEN_PATH,
    {
      refreshToken,
    },
    {
      autoRefreshToken: false,
      redirectWhenError: false,
    },
  );

export { loginWithEmailAndPassword, saveAuthTokens, getAuthTokens, refreshAccessToken };
