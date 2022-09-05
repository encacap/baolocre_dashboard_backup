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
  errors: AxiosErrorMessageType[];
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

export interface BreadcrumbType {
  label: string;
  path: string;
  key: string;
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: 'success' | 'info' | 'warning' | 'error';
  message?: string;
  description: string;
  iconProps?: React.HTMLAttributes<HTMLDivElement>;
  messageProps?: React.HTMLAttributes<HTMLDivElement>;
  descriptionProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface FileType extends Partial<File> {
  id?: string;
  response?: string;
  variants?: string[];
}

export interface TableColumnType {
  label?: string;
  key: string;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  width?: string;
  skeleton?: JSX.Element;
}

export interface TableRowDataType {
  key: string;
  [key: string]: unknown;
}
