import { FileType } from '../../app/types/common';

const getImageURLFromFile = (file: FileType) => {
  if (!file) {
    return '';
  }
  if (file.response) {
    return file.response;
  }
  return URL.createObjectURL(file as File);
};

// eslint-disable-next-line import/prefer-default-export
export { getImageURLFromFile };
