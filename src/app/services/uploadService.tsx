import axiosInstance from '../../common/utils/http/axiosInstance';

const getImageFileFromUrl = async (url: string) => {
  const response = await axiosInstance.get(url, {
    responseType: 'arraybuffer',
  });
  const blob = new Blob([response.data], { type: 'image/jpeg' });
  const file = new File([blob], url, { type: 'image/jpeg' });
  return file;
};

// eslint-disable-next-line import/prefer-default-export
export { getImageFileFromUrl };
