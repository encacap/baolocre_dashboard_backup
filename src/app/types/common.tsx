import { AxiosError, AxiosResponse } from 'axios';

export interface AuthTokensType {
  accessToken: string;
  refreshToken: string;
}

export interface AxiosErrorMessageType {
  field: string;
  message: string[];
}

export interface AxiosErrorDataType {
  statusCode: number;
  message: string;
  error: AxiosErrorMessageType[];
}

export type AxiosErrorType = AxiosError<AxiosErrorDataType>;

export interface AxiosResponseType<T> extends AxiosResponse {
  statusCode: number;
  message: string;
  data: T;
}

export interface SidebarMenuItemsType {
  key: string;
  icon: React.ReactElement;
  label: string;
  path: string;
}
