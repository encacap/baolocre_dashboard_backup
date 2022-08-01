import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UNAUTHORIZED } from 'http-status';
import { AUTHENTICATION_PATH } from '../../../app/constants/URL';
import { authService } from '../../../app/services';

const errorHandler = async (
  error: { response: AxiosResponse; config: AxiosRequestConfig },
  instance: AxiosInstance,
) => {
  const { response, config } = error;
  let redirectURL = '';

  if (response) {
    const { status } = response;
    const redirectWhenError = config?.redirectWhenError;
    const autoRefreshToken = config?.autoRefreshToken;

    if (autoRefreshToken !== false) {
      if (status === UNAUTHORIZED) {
        const { refreshToken } = authService.getAuthTokens();
        if (refreshToken) {
          try {
            const tokensResponse = await authService.refreshAccessToken(refreshToken);
            const newTokens = tokensResponse.data.data.accessToken;
            authService.saveAuthTokens(newTokens, refreshToken);
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${newTokens}`,
            };
            config.autoRefreshToken = false;
            return instance?.(config);
          } catch (refreshError) {
            redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
          }
        } else {
          redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
        }
      }
    } else if (redirectWhenError !== false) {
      switch (status) {
        case UNAUTHORIZED: {
          redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
          break;
        }
        default:
          break;
      }
    }
  }

  if (redirectURL) {
    const currentURL = window.location.pathname;
    if (currentURL !== redirectURL) {
      window.location.href = `${redirectURL}?from=${currentURL}`;
    }
  }

  return Promise.reject(error);
};

export default errorHandler;
