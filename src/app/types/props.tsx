import { InputProps } from '@chakra-ui/react';

export interface ImageVariantDataType {
  [key: string]: string;
}

export interface ImageDataType {
  id: string;
  requireSignedURLs: boolean;
  filename: string;
  variants: string[];
  user: string;
  folder: string;
}

export interface UploadImageParamType {
  folder: string;
}

export interface InputImageProps extends Omit<InputProps, 'onChange' | 'value'> {
  value?: ImageDataType[];
  onChange?: (images: ImageDataType[]) => void;
}
