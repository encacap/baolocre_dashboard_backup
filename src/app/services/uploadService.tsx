import axiosInstance from '../../common/utils/http/axiosInstance';
import { IMAGE_API_PATH } from '../constants/API';
import { FileType } from '../types/common';
import { ImageDataType, UploadImageParamType } from '../types/props';

const getImageFileFromUrl = async (url: string) => {
  const response = await axiosInstance.get(url, {
    responseType: 'arraybuffer',
  });
  const blob = new Blob([response.data], { type: 'image/jpeg' });
  const file = new File([blob], url, { type: 'image/jpeg' });
  return file;
};

const uploadImages = async (
  images: FileType[],
  folder: UploadImageParamType['folder'],
): Promise<ImageDataType[]> => {
  const formData = new FormData();

  images.forEach((image) => {
    if (image.response) {
      formData.append('urls[]', image.response);
    } else {
      formData.append('files[]', image as File);
    }
  });

  formData.append('folder', folder);

  const response = await axiosInstance.post(IMAGE_API_PATH.UPLOAD_IMAGE_MULTIPLE_PATH, formData);
  return response.data.data;
};

export { getImageFileFromUrl, uploadImages };
