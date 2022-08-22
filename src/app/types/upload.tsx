export interface ImageType {
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
