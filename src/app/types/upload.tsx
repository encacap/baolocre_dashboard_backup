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
